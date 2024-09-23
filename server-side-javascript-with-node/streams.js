/**
 * When implementing an algorithm to process data, it is almost always 
 * easiest to read all the data into memory, do the processing, and then 
 * write the data out. For example, you could write a Node function to 
 * copy a file like this.
 */

const fs = require("fs");

// An asynchronous but nonstreaming (and therefore inefficient) function.
function copyFile(sourceFilename, destinationFilename,  callback) {
    fs.readFile(sourceFilename, (err, buffer) => {
        if (err) {
            callback(err);
        } else {
            fs.writeFile(destinationFilename, buffer, callback);
        }
    });
}

/**
 * This copyFile() function uses asynchronous functions and callbacks, so 
 * it does not block and is suitable for use in concurrent programs like 
 * servers. But notice that it must allocate enough memory to hold the 
 * entire contents of the file in memory at once. This may be fine in 
 * some use cases, but it starts to fail if the files to be copied are 
 * very large, or if your program is highly concurrent and there may be 
 * many files being copied at the same time. Another shortcoming of this 
 * copyFile() implementation is that it cannot start writing the new file 
 * until it has finished reading the old file.
 * 
 * The solution to these problems is to use streaming algorithms where 
 * data “flows” into your program, is processed, and then flows out of 
 * your program. The idea is that your algorithm processes the data in 
 * small chunks and the full dataset is never held in memory at once. 
 * When streaming solutions are possible, they are more memory efficient  
 * and can also be faster. Node’s networking APIs are stream-based and 
 * Node’s filesystem module defines streaming APIs for reading and  
 * writing files, so you are likely to use a streaming API in many of the 
 * Node programs that you write.
 * 
 * Node supports four basic stream types:
 * 
 * - Readable: Readable streams are sources of data. The stream returned 
 * by fs.createReadStream(), for example, is a stream from which the 
 * content of a specified file can be read. process.stdin is another 
 * Readable stream that returns data from standard input.
 * 
 * - Writable: Writable streams are sinks or destinations for data. The 
 * return value of fs.createWriteStream(), for example, is a Writable 
 * stream: it allows data to be written to it in chunks, and outputs all 
 * of that data to a specified file.
 * 
 * - Duplex: Duplex streams combine a Readable stream and a Writable 
 * stream into one object. The Socket objects returned by net.connect() 
 * and other Node networking APIs, for example, are Duplex streams. If 
 * you write to a socket, your data is sent across the network to 
 * whatever computer the socket is connected to. And if you read from a 
 * socket, you access the data written by that other computer.
 * 
 * - Transform: Transform streams are also readable and writable, but 
 * they differ from Duplex streams in an important way: data written to a 
 * Transform stream becomes readable—usually in some transformed 
 * form—from the same stream. The zlib.createGzip() function, for 
 * example, returns a Transform stream that compresses (with the gzip 
 * algorithm) the data written to it. In a similar way, the crypto.
 * createCipheriv() function returns a Transform stream that encrypts or 
 * decrypts data that is written to it.
 */

// Pipes

/**
 * Sometimes, you need to read data from a stream simply to turn around 
 * and write that same data to another stream. Imagine, for example, that 
 * you are writing a simple HTTP server that serves a directory of static 
 * files. In this case, you will need to read data from a file input 
 * stream and write it out to a network socket. But instead of writing 
 * your own code to handle the reading and writing, you can instead ]
 * simply connect the two sockets together as a “pipe” and let Node 
 * handle the complexities for you. Simply pass the Writable stream to 
 * the pipe() method of the Readable stream:
 */

// const fs = require("fs");
function pipeFileToSocket(filename, socket) {
    fs.createReadStream(filename).pipe(socket);
}

/**
 * The following utility function pipes one stream to another and invokes 
 * a callback when done or when an error occurs:
 */

function pipe(readable, writable, callback) {
    // First, set up error handling
    function handeError(err) {
        readable.close();
        writable.close();
        callback(err);
    }

    // Next define the pipe and handle the normal termination case
    readable
        .on("error", handeError)
        .pipe(writable)
        .on("error", handeError)
        .on("finish", callback);
}

/**
 * Transform streams are particularly useful with pipes, and create 
 * pipelines that involve more than two streams. Here’s an example 
 * function that compresses a file:
 */

// const fs = require("fs");
const zlib = require("zlib");

function gzip(filename, callback) {
    // Create the streams
    let source = fs.createReadStream(filename);
    let destination = fs.createWriteStream(filename + ".gz");
    let gzipper = zlib.createGzip();

    // Set up the pipeline
    source
        .on("error", callback) // call callback on read error
        .pipe(gzipper)
        .pipe(destination)
        .on("error", callback) // call callback on write error
        .on("finish", callback); // call callback when writing is complete
}

/**
 * Using the pipe() method to copy data from a Readable stream to a
 * Writable stream is easy, but in practice, you often need to process 
 * the data somehow as it streams through your program. One way to do 
 * this is to implement your own Transform stream to do that processing, 
 * and this approach allows you to avoid manually reading and writing the 
 * streams. Here, for example, is a function that works like the Unix 
 * grep utility: it reads lines of text from an input stream, but writes 
 * only the lines that match a specified regular expression:
 */

const stream = require("stream");

class GrepStream extends stream.Transform {
    constructor(pattern) {
        super({decodeStrings: false}); // Don't convert strings back to buffers
        this.pattern = pattern; // The regular expression we want to match
        this.incompleteLine = ""; // Any remnant of the last chunk of data
    }

    // This method is invoked when there is a string ready to be
    // transformed. It should pass transformed data to the specified
    // callback function. We expect string input so this stream should
    // only be connected to readable streams that have had
    // setEncoding() called on them.
    _transform(chunk, enconding, callback) {
        if (typeof chunk !== "string") {
            callback(new Error("Expected a string but got a buffer"));
            return;
        }
        // Add the chunk to any previously incomplete line and break
        // everything into lines
        let lines = (this.incompleteLine + chunk).split("\n");

        // The last element of the array is the new incomplete line
        this.incompleteLine = lines.pop();

        // Find all matching lines
        let output = lines // Start with all complete lines,
            .filter(l => this.pattern.test(l)) // filter them for matches,
            .join("\n"); // and join them back up.
        
        // If anything matched, add a final newline
        if (output) {
            output += "\n";
        }

        // Always call the callback even if there is no output
        callback(null, output);
    }

    // This is called right before the stream is closed.
    // It is our chance to write out any last data.
    _flush(callback) {
        // If we still have an incomplete line, and it matches
        // pass it to the callback
        if (this.pattern.test(this.incompleteLine)) {
            callback(null, this.incompleteLine + "\n");
        }
    }
}

// Now we can write a program like 'grep' with this class.
let pattern = new RegExp(process.argv[2]); // Get RegExp from command line
process.stdin // Start with standard input,
    .setEncoding("utf8") // read it as Unicode strings,
    .pipe(new GrepStream(pattern)) // pipe it to our GrepStream
    .pipe(process.stdout) // and pipe that to standard out.
    .on("error", () => process.exit()); // Exit gracefully if stdout closes.