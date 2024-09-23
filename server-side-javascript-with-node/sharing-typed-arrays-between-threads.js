/**
 * In addition to transferring typed arrays between threads, it is 
 * actually possible to share a typed array between threads. Simply 
 * create a SharedArrayBuffer of the desired size and then use that 
 * buffer to create a typed array. When a typed array that is backed by a 
 * SharedArrayBuffer is passed via postMessage(), the underlying memory 
 * will be shared between the threads. You should not include the shared 
 * buffer in the second argument to postMessage() in this case.
 * 
 * You really should not do this, however, because JavaScript was never 
 * designed with thread safety in mind and multithreaded programming is  
 * very difficult to get right. Even the simple ++ operator is not 
 * thread-safe because it needs to read a value, increment it, and write 
 * it back. If two threads are incrementing a value at the same time, it 
 * will often only be incremented once, as the following code 
 * demonstrates:
 */
/*
const threads = require("worker_threads");

if (threads.isMainThread) {
    // In the main thread, we create a shared typed array with
    // one element. Both threads will be able to read and write
    // sharedArray[0] at the same time.
    let sharedBuffer = new SharedArrayBuffer(4);
    let sharedArray = new Int32Array(sharedBuffer);

    // Now create a worker thread, passing the shared array to it with
    // as its initial workerData value so we don't have to bother with
    // sending and receiving a message
    let worker = new threads.Worker(__filename, { workerData: sharedArray });

    // Wait for the worker to start running and then increment the
    // shared integer 10 million times.
    worker.on("online", () => {
        for(let i = 0; i < 10_000_000; i++) sharedArray[0]++;

        // Once we're done with our increments, we start listening for
        // message events so we know when the worker is done.
        worker.on("message", () => {
            // Although the shared integer has been incremented
            // 20 million times, its value will generally be much less.
            // On my computer the final value is typically under 12 million.
            console.log(sharedArray[0]);
        });
    });
} else {
    // In the worker thread, we get the shared array from workerData
    // and then increment it 10 million times.
    let sharedArray = threads.workerData;
    for(let i = 0; i <10_000_000; i++) sharedArray[0]++;
    // When we're done incrementing, let the main thread know
    threads.parentPort.postMessage("done");
} */

/**
 * One scenario in which it might be reasonable to use a 
 * SharedArrayBuffer is when the two threads operate on entirely separate 
 * sections of the shared memory. You might enforce this by creating two 
 * typed arrays that serve as views of nonoverlapping regions of the 
 * shared buffer, and then have your two threads use those two separate 
 * typed arrays. A parallel merge sort could be done like this: one 
 * threadsorts the bottom half of an array and the other thread sorts the 
 * top half, for example. Or some kinds of image-processing algorithms 
 * are also suitable for this approach: multiple threads working on 
 * disjoint regions of the image.
 * 
 * If you really must allow multiple threads to access the same region of 
 * a shared array, you can take one step toward thread safety with the 
 * functions defined by the Atomics object. Atomics was added to 
 * JavaScript when SharedArrayBuffer was to define atomic operations on 
 * the elements of a shared array. For example, the Atomics.add() 
 * function reads the specified element of a shared array, adds a 
 * specified value to it, and writes the sum back into the array. It does 
 * this atomically as if it was a single operation, and ensures that no 
 * other thread can read or write the value while the operation is taking 
 * place. Atomics.add() allows us to rewrite the parallel increment code 
 * we just looked at and get the correct result of 20 million increments 
 * of a shared array element:
 */

const threads = require("worker_threads");

if (threads.isMainThread) {
    let sharedBuffer = new SharedArrayBuffer(4);
    let sharedArray = new Int32Array(sharedBuffer);
    let worker = new threads.Worker(__filename, {workerData: sharedArray });

    worker.on("online", () => {
        for(let i = 0; i < 10_000_000; i++) {
            Atomics.add(sharedArray, 0, 1); // Threadsafe atomic increment
        }
        
        worker.on("message", (message) => {
            // When both threads are done, use a threadsafe function
            // to read the shared array and confirm that it has the
            // expected value of 20,000,000.
            console.log(Atomics.load(sharedArray, 0));
        });
    });
} else {
    let sharedArray = threads.workerData;
    for(let i = 0;  i < 10_000_000; i++) {
        Atomics.add(sharedArray, 0, 1); // Threadsafe atomic increment
    }
    threads.parentPort.postMessage("done");
}

/**
 * This new version of the code correctly prints the number 20,000,000. 
 * But it is about nine times slower than the incorrect code it replaces. 
 * It would be much simpler and much faster to just do all 20 million 
 * increments in one thread. Also note that atomic operations may be 
 * able  to ensure thread safety for image-processing algorithms for 
 * which each array element is a value entirely independent of all other 
 * values. But in most real-world programs, multiple array elements are 
 * often related to one another and some kind of higher-level thread 
 * synchronization is required. The low-level Atomics.wait() and Atomics.
 * notify() function can help with this.
 */