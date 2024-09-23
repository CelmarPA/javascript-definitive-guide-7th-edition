// Paths, File Descriptors, and FileHandles

/**
 * In order to use the “fs” module to work with files, you first need to 
 * be able to name the file you want to work with. Files are most often 
 * specified by path, which means the name of the file itself, plus the 
 * hierarchy of directories in which the file appears. If a path is 
 * absolute, it means that directories all the way up to the filesystem 
 * root are specified. Otherwise, the path is relative and is only 
 * meaningful in relation to some other path, usually the current working 
 * directory. Working with paths can be a little tricky because different 
 * operating systems use different characters to separate directory 
 * names, it is easy to accidentally double those separator characters 
 * when concatenating paths, and because ../ parent directory path 
 * segments need special handling. Node’s “path” module and a couple of 
 * other important Node features help:
 */

// Some important paths
process.cwd() // Absolute path of the current working directory.
_filename // Absolute path of the file that holds the current code.
_dirname // Absolute path of the directory that holds __filename.
os.homedir() // The user's home directory.

const path = require("path");

path.sep // Either "/" or "\" depending on your OS

// The path module has simple parsing functions
let p = "src/pkg/test.js"; // An example path
path.basename(p) // => "test.js"
path.extname(p) // => ".js"
path.dirname(p) // => "src/pkg"
path.basename(path.dirname(p)) // => "pkg"
path.dirname(path.dirname(p)) // => "src"

// normalize() cleans up paths:
path.normalize("a/b/c/../d/") // => "a/b/d/": handles ../ segments
path.normalize("a/./b") // => "a/b": strips "./" segments
path.normalize("//a//b//") // => "/a/b/": removes duplicate /

// join() combines path segments, adding separators, then normalizes
path.join("src", "pkg", "t.js") // => "src/pkg/t.js"

// resolve() takes one or more path segments and returns an absolute
// path. It starts with the last argument and works backward, stopping
// when it has built an absolute path or resolving against
path.resolve() // => process.cwd()
path.resolve("t.js") // => path.join(process.cwd(), "t.js")
path.resolve("/tmp", "t.js") // => "/tmp/t.js"
path.resolve("/a", "/b", "t.js") // => "/b/t.js"

// 16.7.2 Reading Files

/**
 * Node allows you to read file content all at once, via a stream, or 
 * with the low-level API.
 * 
 * If your files are small, or if memory usage and performance are not 
 * the highest priority, then it is often easiest to read the entire 
 * content of a file with a single call. You can do this synchronously, 
 * with a callback, or with a Promise. By default, you’ll get the bytes 
 * of the file as a buffer, but if you specify an encoding, you’ll get a 
 * decoded string instead.
 */

const fs = require("fs");
let buffer = fs.readFileSync("test.data"); // Synchronous, returns buffer
let text = fs.readFileSync("data.csv", "utf8"); // Synchronous, returns string

// Read the bytes of the file asynchronously
fs.readFile("test.date", (err, buffer) => {
    if (err) {
        // Handle the error here
    } else {
        // The bytes of the file are in buffer
    }
});

// Promise-based asynchronous read
fs.promises
    .readFile("data.cvs", "utf8")
    .then(processFileText)
    .catch(handleReadError);

// Or use the Promise API with await inside an async function
async function processText(filename, encoding="utf8") {
    let text = await fs.promises.readFile(filename, encoding);
    // ... process the text here...
}

/**
 * If you are able to process the contents of a file sequentially and do 
 * not need to have the entire content of the file in memory at the same 
 * time, then reading a file via a stream may be the most efficient 
 * approach. We’ve covered streams extensively: here is how you might use 
 * a stream and the pipe() method to write the contents of a file to 
 * standard output:
 */

function printFile(filename, encoding="utf8") {
    fs.createReadStream(filename, encoding).pipe(process.stdout);
}

/**
 * Finally, if you need low-level control over exactly what bytes you 
 * read  from a file and when you read them, you can open a file to get a 
 * file descriptor and then use fs.read(), fs.readSync(), or fs.promises.
 * read() to read a specified number of bytes from a specified source 
 * location of the file into a specified buffer at the specified 
 * destination position:
 */

const fs = require("fs");

// Reading a specific portion of a data file
fs.open("data", (err, fd) => {
    if (err) {
        // Report error somehow
        return;
    }
    try {
        // Read bytes 20 through 420 into a newly allocated buffer.
        fs.read(fd, Buffer.alloc(400), 0, 400, 20, (err, n, b) => {
            // err is the error, if any.
            // n is the number of bytes actually read
            // b is the buffer that they bytes were read into.
        });
    }
    finally { // Use a finally clause so we always
        fs.close(fd); // close the open file descriptor
    }
});

/**
 * The callback-based read() API is awkward to use if you need to read 
 * more than one chunk of data from a file. If you can use the 
 * synchronous API (or the Promise-based API with await), it becomes easy 
 * to read multiple chunks from a file:
 */

const fs = require("fs");

function readData(filename) {
    let fd = fs.openSync(filename);
    try {
        // Read the file header
        let header = Buffer.alloc(12); // A 12 byte buffer
        fs.readSync(fd, header, 0, 12, 0);

        // Verify the file's magic number
        let magic = header.readInt32LE(0);
        if (magic !== 0XDADAFEED) {
            throw new Error("File is of wrong type");
        }

        // Now get the offset and length of the data from the header
        let offset = header.readInt32LE(4);
        let length = header.readInt32LE(8);

        // And read those bytes from the file
        let data = Buffer.alloc(length);
        fs.readSync(fd, data, 0, length, offset);
        return data;
    } finally {
        // Always close the file, even if an exception is thrown above
        fs.closeSync(fd);
    }
}

// Writing Files

/**
 * Writing files in Node is a lot like reading them, with a few extra 
 * details that you need to know about. One of these details is that the 
 * way you create a new file is simply by writing to a filename that does 
 * not already exist.
 * 
 * As with reading, there are three basic ways to write files in Node. If 
 * you have the entire content of the file in a string or a buffer, you 
 * can write the entire thing in one call with fs.writeFile() 
 * (callbackbased), fs.writeFileSync() (synchronous), or 
 * fs.promises.writeFile() (Promise-based):
 */

fs.writeFileSync(path.resolve(_dirname, "settings.json"), JSON.stringify(settings));

/**
 * If the data you are writing to the file is a string, and you want to 
 * use an encoding other than “utf8,” pass the encoding as an optional 
 * third argument.
 * 
 * The related functions fs.appendFile(), fs.appendFileSync(), and fs.
 * promises.appendFile() are similar, but when the specified file already 
 * exists, they append their data to the end rather than overwriting the 
 * existing file content.
 * 
 * If the data you want to write to a file is not all in one chunk, or if 
 * it is not all in memory at the same time, then using a Writable stream 
 * is a good approach, assuming that you plan to write the data from 
 * beginning to end without skipping around in the file:
 */

const fs = require("fs");
let output = fs.createWriteStream("numbers.txt");
for(let i = 0; i < 100; i++) {
    output.write(`${i}\n`)
}
output.end();

/**
 * Finally, if you want to write data to a file in multiple chunks, and 
 * you want to be able to control the exact position within the file at 
 * which each chunk is written, then you can open the file with 
 * fs.open(), fs.openSync(), or fs.promises.open() and then use the 
 * resulting file descriptor with the fs.write() or fs.writeSync() 
 * functions. These functions come in different forms for strings and 
 * buffers. The string variant takes a file descriptor, a string, and the 
 * file position at which to write that string (with an encoding as an 
 * optional fourth argument). The buffer variant takes a file descriptor, 
 * a buffer, an offset, and a length that specify a chunk of data within 
 * the buffer, and a file position at which to write the bytes of that 
 * chunk. And if you have an array of Buffer objects that you want to 
 * write, you can do this with a single fs.writev() or fs.writevSync(). 
 * Similar low-level functions exist for writing buffers and strings 
 * using fs.promises.open() and the FileHandle object it produces.
 */

/**
 *                          FILE MODE STRINGS
 * 
 * We saw the fs.open() and fs.openSync() methods before when using the 
 * low-level API to read files. In that use case, it was sufficient to 
 * just pass the filename to the open function. When you want to write a 
 * file, however, you must also specify a second string argument that 
 * specifies how you intend to use the file descriptor. Some of the 
 * available flag strings are as follows:
 * 
 * "w": Open the file for writing
 * 
 * "w+": Open for writing and reading
 * 
 * "wx": Open for creating a new file; fails if the named file already 
 * exists
 * 
 * "wx+": Open for creation, and also allow reading; fails if the named 
 * file already exists 
 * 
 * "a": Open the file for appending; existing content won’t be overwritten
 * 
 * "a+": Open for appending, but also allow reading
 * 
 * If you do not pass one of these flag strings to fs.open() or fs 
 * openSync(), they use the default “r” flag, making the file descriptor 
 * read-only. Note that it can also be useful to pass these flags to 
 * other file-writing methods:
 */

// Write to a file in one call, but append to anything that is already there.
// This works like fs.appendFileSync()
fs.writeFileSync("messages.log", "hello",  { flag: "a" });

// Open a write stream, but throw an error if the file already exists.
// We don't want to accidentally overwrite something!
// Note that the option above is "flag" and is "flags" here
fs.createWriteStream("messages.log", { flags: "wx" });

/**
 * You can chop off the end of a file with fs.truncate(), 
 * fs.truncateSync(), or fs.promises.truncate(). These functions take a 
 * path as their first argument and a length as their second, and modify 
 * the file so that it has the specified length. If you  omit the length, 
 * zero is used and the file becomes empty. Despite the name of these 
 * functions, they can also be used to extend a file: if you specify a 
 * length that is longer than the current file size, the file is extended 
 * with zero bytes to the new size. If you have already opened the file 
 * you wish to modify, you can use ftruncate() or ftruncateSync() with 
 * the file descriptor or FileHandle.
 * 
 * The various file-writing functions described here return or invoke 
 * their callback or resolve their Promise when the data has been 
 * “written” in the sense that Node has handed it off to the operating 
 * system. But thisb does not necessarily mean that the data has actually 
 * been written to persistent storage yet: at least some of your data may 
 * still be buffered somewhere in the operating system or in a device 
 * driver waiting to be written to disk. If you call fs.writeSync() to 
 * synchronously write some data to a file, and if there is a power 
 * outage immediately after the function returns, you may still lose 
 * data. If you want to force your data out to disk so you know for sure 
 * that it has been safely saved, use fs.fsync() or fs.fsyncSync(). These 
 * functions only work with file descriptors: there is no path-based 
 * version.
 */

// File Operations

/**
 * The preceding discussion of Node’s stream classes included two 
 * examples of copyFile() functions. These are not practical utilities 
 * that you would actually use because the “fs” module defines its own 
 * fs.copyFile() method (and also fs.copyFileSync() and 
 * fs.promises.copyFile(), of course).
 * 
 * These functions take the name of the original file and the name of the 
 * copy as their first two arguments. These can be specified as strings 
 * or as URL or Buffer objects. An optional third argument is an integer 
 * whose bits specify flags that control details of the copy operation. 
 * And for the callback-based fs.copyFile(), the final argument is a 
 * callback function that will be called with no arguments when the copy 
 * is complete, or that will be called with an error argument if 
 * something fails. Following are some examples:
 */

// Basic synchronous file copy.
fs.copyFileSync("ch15.txt", "ch15.bak");

// The COPYFILE_EXCL argument copies only if the new file does not already
// exist. It prevents copies from overwriting existing files.
fs.copyFile("ch15.txt", "ch16.txt", fs.constants.COPYFILE_EXCL, err => {
    // This callback will be called when done. On error, err will be non-null.
});

// This code demonstrates the Promise-based version of the copyFile function.
// Two flags are combined with the bitwise OR opeartor |. The flags mean 
// that existing files won't be overwritten, and that if the filesystem 
// supports it, the copy will be a copy-on-write clone of the original 
// file, meaning that no additional storage space will be required until 
// either the original or the copy is modified.
fs.promises.copyFile("Important data", `Important data ${new Date().toISOString()}`,

fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE)
    .then(() => {
        console.log("Backup complete");
    })
    .catch(err => {
        console.error("Backup failed", err);
    });

/**
 * The fs.rename() function (along with the usual synchronous and  
 * Promise-based variants) moves and/or renames a file. Call it with the 
 * current path to the file and the desired new path to the file. There 
 * is no flags argument, but the callback-based version takes a callback 
 * as the third argument:
 */

fs.renameSync("ch15.bak", "backups/ch15.bak");

/**
 * Note that there is no flag to prevent renaming from overwriting an 
 * existing file. Also keep in mind that files can only be renamed within 
 * a filesystem. The functions fs.link() and fs.symlink() and their 
 * variants have the same signatures as fs.rename() and behave something 
 * like fs.copyFile() except that they create hard links and symbolic 
 * links, respectively, rather than creating a copy.
 * 
 * Finally, fs.unlink(), fs.unlinkSync(), and fs.promises.unlink() are 
 * Node’s functions for deleting a file. (The unintuitive naming is 
 * inherited from Unix where deleting a file is basically the opposite of 
 * creating a hard link to it.) Call this function with the string, 
 * buffer, or URL path to the file to be deleted, and pass a callback if 
 * you are using the callback-based version:
 */

fs.unlinkSync("backups/ch15.bak");

// File Metadata

/**
 * The fs.stat(), fs.statSync(), and fs.promises.stat() functions allow 
 * you to obtain metadata for a specified file or directory. For example:
 */

const fs = require("fs");
let stats = fs.statSync("book/ch154.md");
stats.isFile() // => true: this is an ordinary file
stats.isDirectory() // => false: it is not a directory
stats.size // file size in bytes
stats.atime // access time: Date when it was last read
stats.mtime // modification time: Date when it was last written
stats.uid // the user id of the file's owner
stats.gid // the group id of the file's owner
stats.mode.toString(8) // the file's permissions, as an octal string

/**
 * The returned Stats object contains other, more obscure properties and 
 * methods, but this code demonstrates those that you are most likely to 
 * use.
 * 
 * fs.lstat() and its variants work just like fs.stat(), except that if 
 * the specified file is a symbolic link, Node will return metadata for 
 * the link itself rather than following the link.
 * 
 * If you have opened a file to produce a file descriptor or a FileHandle 
 * object, then you can use fs.fstat() or its variants to get metadata 
 * information for the opened file without having to specify the filename 
 * again.
 * 
 * In addition to querying metadata with fs.stat() and all of its 
 * variants, there are also functions for changing metadata.
 * 
 * fs.chmod(), fs.lchmod(), and fs.fchmod() (along with synchronous and 
 * Promise-based versions) set the “mode” or permissions of a file or 
 * directory. Mode values are integers in which each bit has a specific 
 * meaning and are easiest to think about in octal notation. For example, 
 * to make a file read-only to its owner and inaccessible to everyone 
 * else, use 0o400:
 */

fs.chmodSync("ch15.md", 0o400); // Don't delete it accidentally!

/**
 * fs.chown(), fs.lchown(), and fs.fchown() (along with
 * synchronous and Promise-based versions) set the owner and group (as 
 * IDs) for a file or directory. (These matter because they interact with 
 * the file permissions set by fs.chmod().)
 * 
 * Finally, you can set the access time and modification time of a file 
 * or directory with fs.utimes() and fs.futimes() and their variants.
 */

// Working with Directories

/**
 * To create a new directory in Node, use fs.mkdir(), fs.mkdirSync(), or 
 * fs.promises.mkdir(). The first argument is the path of the directory 
 * to be created. The optional second argument can be an integer that 
 * specifies the mode (permissions bits) for the new directory. Or you 
 * can pass an object with optional mode and recursive properties. If 
 * recursive is true, then this function will create any directories in 
 * the path that do not already exist:
 */

// Ensure that dist/ and dist/lib/ both exist.
fs.mkdirSync("dist/lib", { recursive: true });

/**
 * fs.mkdtemp() and its variants take a path prefix you provide, append 
 * some random characters to it (this is important for security), create 
 * a directory with that name, and return (or pass to a callback) the 
 * directory path to you.
 * 
 * To delete a directory, use fs.rmdir() or one of its variants. Note  
 * that directories must be empty before they can be deleted:
 */

// Create a random temporary directory and get its path, then
// delete it when we are done
let tempDirPath;
try {
    tempDirPath = fs.mkdtempSync(path.join(os.tmpdir(), "d"));
    // Do something with the directory here
} finally {
    // Delete the temporary directory when we're done with it
    fs.rmdirSync(tempDirPath)
}

/**
 * The “fs” module provides two distinct APIs for listing the contents of 
 * a directory. First, fs.readdir(), fs.readdirSync(), and fs.promises.
 * readdir() read the entire directory all at once and give you an array 
 * of strings or an array of Dirent objects that specify the names and 
 * types (file or directory) of each item. Filenames returned by these 
 * functions are just the local name of the file, not the entire path. 
 * Here are examples:
 */

let tempFiles = fs.readdirSync("/tmp"); // returns an array of strings

// Use the Promise-based API to get a Dirent array, and then
// print the paths of subdirectories
fs.promises.readdir("/tmp", {withFileType: true})
    .then(entries => {
        entries.filter(entry => entry.isDirectory())
            .map(entry => entry.name)
            .forEach(name => console.log(path.join("/tmp", name)));
    })
    .catch(console.error);

/**
 * If you anticipate needing to list directories that might have 
 * thousands of entries, you might prefer the streaming approach of
 * fs.opendir() and its variants. These functions return a Dir object 
 * representing the specified directory. You can use the read() or 
 * readSync() methods of the Dir object to read one Dirent at a time. 
 * If you pass a callback function to read(), it will call the callback.
 * 
 * And if you omit the callback argument, it will return a Promise. When 
 * there are no more directory entries, you’ll get null instead of a 
 * Dirent object.
 * 
 * The easiest way to use Dir objects is as async iterators with a for/
 * await loop. Here, for example, is a function that uses the streaming 
 * API to list directory entries, calls stat() on each entry, and prints 
 * file and directory names and sizes:
 */

const fs = require("fs");
const path = require("path");

async function listDirectory(dirpath) {
    let dir = await fs.promises.opendir(dirpath);
    for await (let entry of dir) {
        let name = entry.name;
        if (entry.isDirectory) {
            name += "/"; // Add a trailing slash to subdirectories
        }
        let stats = await fs.promises.stat(path.join(dirpath, name));
        let size = stats.size;
        console.log(String(size).padStart(10), name);
    }
}