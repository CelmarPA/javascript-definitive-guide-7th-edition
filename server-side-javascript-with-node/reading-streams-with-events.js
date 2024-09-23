// FLOWING MODE

/**
 * In flowing mode, when readable data arrives, it is immediately emitted 
 * in the form of a “data” event. To read from a stream in this mode, 
 * simply register an event handler for “data” events, and the stream 
 * will push chunks of data (buffers or strings) to you as soon as they 
 * becomes available. Note that there is no need to call the read() 
 * method in flowing mode: you only need to handle “data” events. Note 
 * that newly created streams do not start off in flowing mode. 
 * Registering a “data” event handler switches a stream into flowing 
 * mode. Conveniently, this means that a stream does not emit “data” 
 * events until you register the first “data” event handler.
 * 
 * If you are using flowing mode to read data from a Readable stream, 
 * process it, then write it to a Writable stream, then you may need to 
 * handle backpressure from the Writable stream. If the write() method 
 * returns false to indicate that the write buffer is full, you can call 
 * pause() on the Readable stream to temporarily stop data events. Then, 
 * when you get a “drain” event from the Writable stream, you can call 
 * resume() on the Readable stream to start the “data” events flowing 
 * gain.
 * 
 * A stream in flowing mode emits an “end” event when the end of the 
 * stream is reached. This event indicates that no more “data” events 
 * will ever be emitted. And, as with all streams, an “error” event is 
 * emitted if an error occurs.
 * 
 * The following code shows how to implement a streaming copyFile() 
 * function that uses the flowing mode API and handles backpressure. This 
 * would have been easier to implement with a pipe() call, but it serves 
 * here as a useful demonstration of the multiple event handlers that are 
 * used to coordinate data flow from one stream to the other.
 */

const fs = require("fs"); 

// A streaming file copy function, using "flowing mode".
// Copies the contents of the named source file to the named destination file.
// On success, invokes the callback with a null argument. On error,
// invokes the callback with an Error object.
function copyFile(sourceFilename, destinationFilename,  callback) {
    let input = fs.createReadStream(sourceFilename);
    let output = fs.createWriteStream(destinationFilename);
    
    input.on("data", (chunk) => { // When we get new data,
        let hasRoom = output.write(chunk); // write it to the output stream.
        if (!hasRoom) { // If the output stream is full
            input.pause(); // then pause the input stream.
        }
    });
    input.on("end", () => { // When we reach the end of input,
        output.end(); // tell the output stream to end.
    });
    input.on("error", err => { // If we get an error on the input,
        callback(err); // call the callback with the error
        process.exit(); // and quit.
    });

    output.on("drain", () => { // When the output is no longer full,
        input.resume(); // resume data events on the input
    });
    output.on("error", err => { // If we get an error on the output,
        callback(err); // call the callback with the error
        process.exit(); // and quit.
    });
    output.on("finish", () => { // When output is fully written
        callback(null); // call the callback with no error.
    });
}

// Here's a simple command-line utility to copy files
let from = process.argv[2], to = process.argv[3];

console.log(`Copying file ${from} to ${to}...`);
copyFile(from, to, err => {
    if (err) {
        console.error(err);
    } else {
        console.log("done.");
    }
});

// PAUSE MODE

/**
 * The other mode for Readable streams is “paused mode.” This is the mode 
 * that streams start in. If you never register a “data” event handler 
 * and never call the pipe() method, then a Readable stream remains in 
 * paused mode. In paused mode, the stream does not push data to you in 
 * the form of “data” events. Instead, you pull data from the stream by 
 * explicitly calling its read() method. This is not a blocking call, and 
 * if there is no data available to read on the stream, it will return 
 * null. Since there is not a synchronous API to wait for data, the 
 * paused mode API is also event-based. A Readable stream in paused mode 
 * emits “readable” events when data becomes available to read on the 
 * stream. In response, your code should call the read() method to read 
 * that data. You must do this in a loop, calling read() repeatedly until 
 * it returns null. It is necessary to completely drain the stream’s 
 * buffer like this in order to trigger a new “readable” event in the 
 * future. If you stop calling read() while there is still readable data, 
 * you will not get another “readable” event and your program is likely 
 * to hang.
 * 
 * Streams in paused mode emit “end” and “error” events just like  
 * flowing mode streams do. If you are writing a program that reads data 
 * from a Readable stream and writes it to a Writable stream, then paused 
 * mode may not be a good choice. In order to properly handle 
 * backpressure, you only want to read when the input stream is readable 
 * and the output stream is not backed up. In paused mode, that means 
 * reading and writing until read() returns null or write() returns  
 * false, and then starting reading or writing again on a readable or 
 * drain event. This is inelegant, and you may find that flowing mode (or 
 * pipes) is easier in this case.
 * 
 * The following code demonstrates how you can compute a SHA256 hash for 
 * the contents of a specified file. It uses a Readable stream in paused 
 * mode to read the contents of a file in chunks, then passes each chunk 
 * to the object that computes the hash.
 */

const fs = require("fs");
const crypto = require("crypto");

// Compute a sha256 hash of the contents of the named file and pass the
// hash (as a string) to the specified error-first callback function.

function sha256(filename, callback) {
    let input = fs.createReadStream(filename); // The data stream.
    let hasher = crypto.createHash("sha256"); // For computing the hash.

    input.on("readable", () => { // When there is data ready to read
        let chunk;
        while(chunk = input.read()) { // Read a chunk, and if non-null,
            hasher.update(chunk); // pass it to the hasher,
        } // and keep looping until not readable
    });
    input.on("end", () => { // At the end of the stream,
        let hash = hasher.digest("hex"); // compute the hash,
        callback(null, hash); // and pass it to the callback.
    });
    input.on("error", callback); // On error, call callback
}

// Here's a simple command-line utility to compute the hash of a file
sha256(process.argv[2], (err, hash) => { // Pass filename from command line.
    if (err) { // If we get an error
        console.error(err.toString()); // print it as an error.
    } else { // Otherwise,
        console.log(hash); // print the hash string.
    }
});