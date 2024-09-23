// Worker Objects

/**
 * To create a new worker, call the Worker() constructor, passing a URL 
 * that specifies the JavaScript code that the worker is to run:
 */

let dataCruncher = new Worker("utils/cruncher.js");

/**
 * If you specify a relative URL, it is resolved relative to the URL of 
 * the document that contains the script that called the Worker() 
 * constructor. If you specify an absolute URL, it must have the same 
 * origin (same protocol, host, and port) as that containing document.
 * 
 * Once you have a Worker object, you can send data to it with 
 * postMessage(). The value you pass to postMessage() will be copied 
 * using the structured clone algorithm (see “The Structured Clone 
 * Algorithm”), and the resulting copy will be delivered to the worker 
 * via a message event:
 */

dataCruncher.postMessage("api/data/to/crunch");

/**
 * Here we’re just passing a single string message, but you can also use 
 * objects, arrays, typed arrays, Maps, Sets, and so on. You can receive 
 * messages from a worker by listening for “message” events on the Worker 
 * object:
 */

dataCruncher.onmessage = function(e) {
    let stats = e.data; // The message is the data property do the event
    console.log(`Average: ${stats.mean}`);
}

/**
 * Like all event targets, Worker objects define the standard 
 * addEventListener() and removeEventListener() methods, and you can use 
 * these in place of the onmessage.
 * 
 * In addition to postMessage(), Worker objects have just one other 
 * method, terminate(), which forces a worker thread to stop running.
 */

// Importing Code into a Worker

/**
 * Workers were defined in web browsers before JavaScript had a module 
 * system, so workers have a unique system for including additional code. 
 * WorkerGlobalScope defines importScripts() as a global function that 
 * all workers have access to:
 */

// Before we start working, load the classes and utilities we'll need
importScripts("utils/Histogram.js","utils/BitSet.js");

// Worker Execution Model

/**
 * Worker threads run their code (and all imported scripts or modules) 
 * synchronously from top to bottom, and then enter an asynchronous phase 
 * in which they respond to events and timers. If a worker registers a 
 * “message” event handler, it will never exit as long as there is a 
 * possibility that message events will still arrive. But if a worker 
 * doesn’t listen for messages, it will run until there are no further 
 * pending tasks (such as fetch() promises and timers) and all 
 * task-related callbacks have been called. Once all registered callbacks 
 * have been called, there is no way a worker can begin a new task, so it 
 * is safe for the thread to exit, which it will do automatically. A 
 * worker can also explicitly shut itself down by calling the global 
 * close() function. Note that there are no properties or methods on the 
 * Worker object that specify whether a worker thread is still running or 
 * not, so workers should not close themselves without somehow 
 * coordinating this with their parent thread.
 */

// ERRORS IN WORKERS

/**
 * If an exception occurs in a worker and is not caught by any catch 
 * clause, then an “error” event is triggered on the global object of the 
 * worker. If this event is handled and the handler calls the 
 * preventDefault() method of the event object, the error propagation 
 * ends. Otherwise, the “error” event is fired on the Worker object. If 
 * preventDefault() is called there, then propagation ends. Otherwise, an 
 * error message is printed in the developer console and the onerror 
 * handler of the Window object is invoked.
 */

// Handle uncaught worker errors with a handler inside the worker
self.onerror =  function(e) {
    console.log(`Error in worker at ${e.filename}:${e.lineno}:${e.message}`);
    e.preventDefault();
};

// Or, handle uncaught worker errors with a handler outside the worker.
Worker.onerror = function(e) {
    console.log(`Error in worker at ${e.filename}:${e.lineno}:${e.message}`);
    e.preventDefault();
};

/**
 * Like windows, workers can register a handler to be invoked when a 
 * Promise is rejected and there is no .catch() function to handle it. 
 * Within a worker you can detect this by defining a self.
 * onunhandledrejection function or by using addEventListener() to 
 * register a global handler for “unhandledrejection” events. The event 
 * object passed to this handler will have a promise property whose value 
 * is the Promise object that rejected and a reason property whose value 
 * is what would have been passed to a .catch() function.
 */

// postMessage(), MessagePorts, and MessageChannels

/**
 * The postMessage() method of the Worker object and the global 
 * postMesage() function defined inside a worker both work by invoking 
 * the postMessage() methods of a pair of MessagePort objects that are 
 * automatically created along with the worker. Clientside  JavaScript 
 * can’t directly access these automatically created MessagePort objects, 
 * but it can create new pairs of connected ports with the
 *  MessageChannel() constructor:
 */

let channel = new MessageChannel; // Create a new channel.
let myPort = channel.port1; // It has two ports
let yourPort = channel.port2; // connected to each other.

myPort.postMessage("Can you hear me?"); // A message posted to one will
yourPort.onmessage = (e) => console.log(e.data); // le received on the other.

/**
 * A MessageChannel is an object with port1 and port2 properties that 
 * refer to a pair of connected MessagePort objects. A MessagePort is an 
 * object with a postMessage() method and an onmessage event handler 
 * property. When postMessage() is called on one port of a connected 
 * pair, a “message” event is fired on the other port in the pair. You 
 * can receive these “message” events by setting the onmessage property 
 * or by using addEventListener() to register a listener for “message” 
 * events.
 * 
 * Messages sent to a port are queued until the onmessage property is 
 * defined or until the start() method is called on the port. This 
 * prevents messages sent by one end of the channel from being missed by 
 * the other end. If you use addEventListener() with a MessagePort, don’t 
 * forget to call start() or you may never see a message delivered.
 * 
 * All the postMessage() calls we’ve seen so far have taken a single 
 * message argument. But the method also accepts an optional second 
 * argument. This second argument is an array of items that are to be 
 * transferred to the other end of the channel instead of having a copy 
 * sent across the channel. Values that can be transferred instead of 
 * copied are MessagePorts and ArrayBuffers. (Some browsers also 
 * implement other transferable types, such as ImageBitmap and 
 * OffscreenCanvas. These are not universally supported. If the first 
 * argument to postMessage() includes a MessagePort (nested anywhere 
 * within the message object), then that MessagePort must also appear in 
 * the second argument. If you do this, then the MessagePort will become 
 * available to the other end of the channel and will immediately become 
 * nonfunctional on your end. Suppose you have created a worker and want 
 * to have two channels for communicating with it: one channel for 
 * ordinary data exchange and one channel for high-priority messages. In 
 * the main thread, you might create a MessageChannel, then call 
 * postMessage() on the worker to pass one of the MessagePorts to it:
 */

let worker = new Worker("worker.js");
let urgentChannel = new MessageChannel();
let urgentPort = urgentChannel.port1;
worker.postMessage({ command: "setUrgentPort", value: urgentChannel.port2 }, [ urgentChannel.port2 ]);

// Now we can receive urgent messages from the worker like this
urgentPort.addEventListener("message", handleUrgentMessage);
urgentPort.start(); // Start receiving messages
// Ans send urgent messages like this
urgentPort.postMessage("test");