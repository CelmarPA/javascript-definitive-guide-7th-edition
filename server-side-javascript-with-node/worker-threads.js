/**
 * As explained at the beginning of this chapter, Node’s concurrency 
 * model is single-threaded and event-based. But in version 10 and later, 
 * Node does allow true multithreaded programming, with an API that  
 * closely mirrors the Web Workers API defined by web browsers. 
 * Multithreaded programming has a well-deserved reputation for being 
 * difficult. This is almost entirely because of the need to carefully 
 * synchronize access by threads to shared memory. But JavaScript threads 
 * (in both Node and browsers) do not share memory by default, so the 
 * dangers and difficulties of using threads do not apply to these 
 * “workers” in JavaScript.
 * 
 * Instead of using shared memory, JavaScript’s worker threads 
 * communicate by message passing. The main thread can send a message  to 
 * a worker thread by calling the postMessage() method of the Worker 
 * object that represents that thread. The worker thread can receive 
 * messages from its parent by listening for “message” events. And 
 * workers can send messages to the main thread with their own version of 
 * postMessage(), which the parent can receive with its own “message” 
 * event handler. The example code will make it clear how this works.
 * 
 * There are three reasons why you might want to use worker threads in a 
 * Node application:
 * 
 *  - If your application actually needs to do more computation than one 
 * CPU core can handle, then threads allow you to distribute work across 
 * the multiple cores, which have become commonplace on computers today. 
 * If you’re doing scientific computing or machine learning or graphics 
 * processing in Node, then you may want to use threads simply to throw 
 * more computing power at your problem.
 * 
 *  - Even if your application is not using the full power of one CPU, 
 * you may still want to use threads to maintain the responsiveness of 
 * the main thread. Consider a server that handles large but relatively 
 * infrequent requests. Suppose it  gets only one request a second, but 
 * needs to spend about half a second of (blocking CPU-bound) computation 
 * to process each request. On average, it will be idle 50% of the time. 
 * But when two requests arrive within a few milliseconds of each other, 
 * the server will not even be able to begin a response to the second 
 * request until the computation of the first response is complete. 
 * Instead, if the server uses a worker thread to perform the 
 * computation, the server can begin the response to both requests 
 * immediately and provide a better experience for the server’s clients. 
 * Assuming the server has more than one CPU core, it can also compute 
 * the body of both responses in parallel, but even if there is only a 
 * single core, using workers still improves the responsiveness.
 * 
 *  - In general, workers allow us to turn blocking synchronous 
 * operations into nonblocking asynchronous operations. If you are 
 * writing a program that depends on legacy code that is unavoidably 
 * synchronous, you may be able to use workers to avoid blocking when you 
 * need to call that legacy code.
 */

// Creating Workers and Passing Messages

/**
 * The Node module that defines workers is known as “worker_threads.”
 * In this section we’ll refer to it with the identifier threads. This 
 * module defines a Worker class to represent a worker thread, and you 
 * can create a new thread with the threads.Worker() constructor. The 
 * following code demonstrates using this constructor to create a worker, 
 * and shows how to pass messages from main thread to worker and from 
 * worker to main thread. It also demonstrates a trick that allows you to 
 * put the main thread code and the worker thread code in the same file.
 */

const threads = require("worker_threads");

// The worker_threads module exports the boolean isMainThread property.
// This property is true when Node is running the main thread and it is
// false when Node is running a worker. We can use this fact to implement
// the main and worker threads in the same file.
if (threads.isMainThread) {
    // If we're running in the main thread, then all we do is export
    // a function. Instead of performing a computationally intensive
    // task on the main thread, this function passes the task to a worker
    // and returns a Promise that will resolve when theworker is done.
    module.exports = function reticulateSplines(splines) {
        return new Promise((resolve, reject) => {
            // Create a worker that loads and runs this same file of code.
            // Note the use of the special __filename variable.
            let reticulator = new threads.Worker(__filename);

            // Pass a copy of the splines array to the worker
            reticulator.postMessage(splines);

            // And then resolve or reject the Promise when we get
            // a message or error from the worker.
            reticulator.on("message", resolve);
            reticulator.on("error", reject);
        });
    };
} else {
    // If we get here, it means we're in the worker, so we register a
    // handler to get messages from the main thread. This worker is 
    // designed to only receive a single message, so we register the 
    // event handler with once() instead of on(). This allows the worker 
    // to exit naturally when its work is complete.
    threads.parentPort.once("message", splines => {
        // When we get the splines from the parent thread, loop
        // through them and reticulate all of them.
        for(let spline of splines) {
            // For the sake of example, assume that spline objects usually
            // have a reticulate() method that does a lot of computation.
            spline.reticulate ? spline.reticulate() : spline.reticulated = true;
        }
        // When all the splines have (finally!) been reticulated
        // pass a copy back to the main thread.
        threads.parentPort.postMessage(splines);
    });
}

/**
 * The first argument to the Worker() constructor is the path to a file 
 * of JavaScript code that is to run in the thread. In the preceding 
 * code, we used the predefined __filename identifier to create a worker 
 * that loads and runs the same file as the main thread. In general, 
 * though, you will be passing a file path. Note that if you specify a 
 * relative path, it is relative to process.cwd(), not relative to the 
 * currently running module. If you want a path relative to the current 
 * module, use something like path.resolve(__dirname, 'workers/
 * reticulator.js').
 * 
 * The Worker() constructor can also accept an object as its second 
 * argument, and the properties of this object provide optional 
 * configuration for the worker. We’ll cover a number of these options 
 * later, but for now note that if you pass {eval: true} as the second 
 * argument, then the first argument to Worker() is interpreted as a 
 * string of JavaScript code to be evaluated instead of a filename:
 */

new threads.Worker(`
    const threads = require("worker_threads");
    threads.parentPort.postMessage(threads.isMainThread);
`, {eval: true}).on("message", console.log); // This will print "false"

/**
 * Node makes a copy of the object passed to postMessage() rather than 
 * sharing it directly with the worker thread. This prevents the worker 
 * thread and the main thread from sharing memory. You might expect that 
 * this copying would be done with JSON.stringify() and JSON.parse() 
 * But in fact, Node borrows a more robust technique known as the 
 * structured clone algorithm from web browsers.
 * 
 * The structured clone algorithm enables serialization of most 
 * JavaScript types, including Map, Set, Date, and RegExp objects and 
 * typed arrays, but it cannot, in general, copy types defined by the 
 * Node host environment, such as sockets and streams. Note, however, 
 * that Buffer objects are partially supported: if you pass a Buffer to 
 * postMessage() it will be received as a Uint8Array, and can be 
 * converted back into a Buffer with Buffer.from().
 */

// Communication Channels and MessagePorts

/**
 * When a new worker thread is created, a communication channel is 
 * created along with it that allows messages to be passed back and forth 
 * between the worker and the parent thread. As we’ve seen, the worker 
 * thread uses threads.parentPort to send and receive messages to and 
 * from the parent thread, and the parent thread uses the Worker object 
 * to send and receive messages to and from the worker thread.
 * 
 * Suppose a worker needs to handle two different kinds of messages sent 
 * by two different modules in the main thread. These two different 
 * modules could both share the default channel and send messages with 
 * worker.postMessage(), but it would be cleaner if each module has its 
 * own private channel for sending messages to the worker. Or consider 
 * the case where the main thread creates two independent workers. A 
 * custom communication channel can allow the two workers to communicate 
 * directly with each other instead of having to send all their messages 
 * via the parent. 
 * 
 * Create a new message channel with the MessageChannel() constructor. A 
 * MessageChannel object has two properties, named port1 and port2. These 
 * properties refer to a pair of MessagePort objects. Calling 
 * postMessage() on one of the ports will cause a “message” event to be 
 * generated on the other with a structured clone of the Message object:
 */

// const threads = require("worker_threads");
let channel = new threads.MessageChannel();
channel.port2.on("message", console.log); // Log any messages we receive
channel.port1.postMessage("hello"); // Will cause "hello" to be printed

/**
 * You can also call close() on either port to break the connection 
 * between the two ports and to signal that no more messages will be 
 * exchanged. When close() is called on either port, a “close” event is 
 * delivered to both ports.
 * 
 * Note that the code example above creates a pair of MessagePort objects 
 * and then uses those objects to transmit a message within the main 
 * thread. In order to use custom communication channels with workers, 
 * we must transfer one of the two ports from the thread in which it is 
 * created to the thread in which it will be used.
 */

// Transferring MessagePorts and Typed Arrays

/**
 * The postMessage() function uses the structured clone algorithm, and as 
 * we’ve noted, it cannot copy objects like Sockets and Streams. It can 
 * handle MessagePort objects, but only as a special case using a special 
 * technique. The postMessage() method (of a Worker object, of threads.
 * parentPort, or of any MessagePort object) takes an  optional second 
 * argument. This argument (called transferList) is an array of objects 
 * that are to be transferred between threads rather than being copied.
 * 
 * A MessagePort object cannot be copied by the structured clone 
 * algorithm, but it can be transferred. If the first argument to 
 * postMessage() has included one or more MessagePorts (nested 
 * arbitrarily deeply within the Message object), then those MessagePort 
 * objects must also appear as members of the array passed as the second 
 * argument. Doing this tells Node that it does not need to make a copy 
 * of the MessagePort, and can instead just give the existing object to 
 * the other thread. The key thing to understand, however, about 
 * transferring values between threads is that once a value is 
 * transferred, it can no longer be used in the thread that called 
 * postMessage().
 * 
 * Here is how you might create a new MessageChannel and transfer one 
 * of its MessagePorts to a worker:
 */

// Create a custom communication channel
// const threads = require("worker_threads");
let channel0 = new threads.MessageChannel();

// Use the worker's default channel to transfer one end of the new
// channel to the worker. Assume that when the worker receives this
// message it immediately begins to listen for messages on the new channel.
worker.postMessage({ command: "changeChannel", data: channel0. port1 }, [ channel0.port1 ]);

// Now send a message to the worker using our end of the custom channel
channel0.port2.postMessage("Can your hear me now?");

// And listen for responses from the worker as well
channel0.port2.on("message", handleMessagesFromWorker);

/**
 * MessagePort objects are not the only ones that can be transferred. If 
 * you call postMessage() with a typed array as the message (or with a 
 * message that contains one or more typed arrays nested arbitrarily deep 
 * within the message), that typed array (or those typed arrays) will 
 * simply be copied by the structured clone algorithm. But typed arrays 
 * can be large; for example, if you are using a worker thread to do 
 * image processing on millions of pixels. So for efficiency, 
 * postMessage() also gives us the option to transfer typed arrays rather 
 * than copying them. (Threads share memory by default. Worker threads in 
 * JavaScript generally avoid shared memory, but when we allow this kind 
 * of controlled transfer, it can be done very efficiently.) What makes 
 * this safe is that when a typed array is transferred to another thread, 
 * it becomes unusable in the thread that transferred it. In the 
 * imageprocessing scenario, the main thread could transfer the pixels of 
 * an image to the worker thread, and then the worker thread could 
 * transfer the processed pixels back to the main thread when it was 
 * done. The memory would not need to be copied, but it would never be 
 * accessible by two threads at once.
 * 
 * To transfer a typed array instead of copying it, include the 
 * ArrayBuffer that backs the array in the second argument to 
 * postMessage():
 */

let pixels = new Uint32Array(1024*1024); // 4 megabytes of memory

// Assume we read some data into this typed array, and then transfer the
// pixels to a worker without copying. Note that we don't put the array
// itself in the transfer list, but the array's Buffer object instead.
worker.postMessage(pixels, [ pixels.buffer ]);