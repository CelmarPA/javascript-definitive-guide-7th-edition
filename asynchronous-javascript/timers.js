/**
 * At its most fundamental level, asynchronous programming in JavaScript 
 * is done with callbacks. A callback is a function that you write and 
 * then pass to some other function. That other function then invokes 
 * (“calls back”) your function when some condition is met or some 
 * (asynchronous) event occurs. The invocation of the callback function 
 * you provide notifies you of the condition or event, and sometimes, the 
 * invocation will include function arguments that provide additional 
 * details.
 */

// Timers

/**
 * One of the simplest kinds of asynchrony is when you want to run some 
 * code after a certain amount of time has elapsed, you can do this with the setTimeout() function.
 */

setTimeout(checkForUpdates, 60000);

/**
 * The first argument to setTimeout() is a function and the second is a 
 * time interval measured in milliseconds. In the preceding code, a 
 * hypothetical checkForUpdates() function will be called 60,000 
 * milliseconds (1 minute) after the setTimeout() call. checkForUpdates() 
 * is a callback function that your program might define, and 
 * setTimeout() is the function that you invoke to register your callback 
 * function and specify under what asynchronous conditions it should be 
 * invoked.
 * 
 * setTimeout() calls the specified callback function one time, passing 
 * no arguments, and then forgets about it. If you are writing a function 
 * that really does check for updates, you probably want it to run 
 * repeatedly. You can do this by using setInterval() instead of 
 * setTimeout():
 */

// Call checkForUpdates in one minute and then again every minute after that
let updateIntervalId = setInterval(checkForUpdates, 60000);

// setInterval() returns a value that we can use to stop the repeated
// invocations by calling clearInterval(). (similarly, setTimeOut()
// returns a value that can pass to clearTimemout())
function stopCheckingForUpdates() {
    clearInterval(updateIntervalId);
}