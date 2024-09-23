/**
 * The write() method has a very important return value. When you call 
 * write() on a stream, it will always accept and buffer the chunk of 
 * data you have passed. It then returns true if the internal buffer is 
 * not yet full. Or, if the buffer is now full or overfull, it returns 
 * false. This return value is advisory, and you can ignore it—Writable 
 * streams will enlarge their internal buffer as much as needed if you 
 * keep calling write(). But remember that the reason to use a streaming 
 * API in the first place is to avoid the cost of keeping lots of data in 
 * memory at once. 
 * 
 * A return value of false from the write() method is a form of 
 * backpressure: a message from the stream that you have written data 
 * more quickly than it can be handled. The proper response to this kind 
 * of backpressure is to stop calling write() until the stream emits a 
 * “drain” event, signaling that there is once again room in the buffer. 
 * Here, for example, is a function that writes to a stream, and then 
 * invokes a callback when it is OK to write more data to the stream:
 */

function write(stream, chunk, callback) {
    // Write the specified chunk to the specified stream
    let hasMoreRoom = stream.write(chunk);

    // Check the return value of the write() method:
    if (hasMoreRoom) { // If it returned true, then
        setImmediate(callback); // invoke callback asynchronously.
    } else { // If it returned false, then
        stream.once("drain", callback); // invoke callback on drain event.
    }
}

/**
 * The fact that it is sometimes OK to call write() multiple times in a 
 * row and sometimes you have to wait for an event between writes makes 
 * for awkward algorithms. This is one of the reasons that using the 
 * pipe() method is so appealing: when you use pipe(), Node handles 
 * backpressure for you automatically.
 * 
 * If you are using await and async in your program, and are treating 
 * Readable streams as asynchronous iterators, it is straightforward to 
 * implement a Promise-based version of the write() utility function 
 * above to properly handle backpressure. In the async grep() function we 
 * just looked at, we did not handle backpressure. The async copy() 
 * function in the following example demonstrates how it can be done 
 * correctly. Note that this function just copies chunks from a source 
 * stream to a destination stream and calling copy(source, destination) 
 * is much like calling source.pipe(destination):
 */

// This function writes the specified chunk to the specified stream and
// returns a Promise that will be fulfilled when it is OK to write again.
// Because it returns a Promise, it can be used with await.
function write(stream, chunk) {
    // Write the specified chunk to the specified stream
    let hasMoreRoom = stream.write(chunk);

    if (hasMoreRoom) { // If buffer is not full, return
        return Promise.resolve(null); // an already resolved Promise object
    } else {
        return new Promise(resolve => { // Otherwise, return a Promise that
            stream.once("drain", resolve); // resolves on the drain event.
        });
    }
}

// Copy data from the source stream to the destination stream
// respecting backpressure from the destination stream.
// This is much like calling source.pipe(destination).
async function copy(source, destination) {
    // Set an error handler on the destination stream in case standard
    // output closes unexpectedly (when piping output to `head`, e.g.)
    destination.on("error", err => process.exit());

    // Use a for/await loop to asynchronously read chunks from the input stream
    for await (let chunk of source) {
        // Write the chunk and wait until there is more room in the buffer.
        await write(destination, chunk);
    }
}

// Copy standard input to standard output
copy(process.stdin, process.stdout);