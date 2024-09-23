/**
 * Since the earliest days of JavaScript, web browsers have defined two 
 * functions—setTimeout() and setInterval()—that allow programs to ask 
 * the browser to invoke a function after a specified amount of time has 
 * elapsed or to invoke the function repeatedly at a specified interval. 
 * These functions have never been standardized as part of the core 
 * language, but they work in all browsers and in Node and are a de facto 
 * part of the JavaScript standard library. The first argument to 
 * setTimeout() is a function, and the second argument is a number that 
 * specifies how many milliseconds should elapse before the function is 
 * invoked. After the specified amount of time (and maybe a little longer 
 * if the system is busy), the function will be invoked with no arguments.
 */

// Here, for example, are three setTimeout() calls that print console 
// messages after one second, two seconds, and three seconds:

setTimeout(() => { console.log("Ready..."); }, 1000);
setTimeout(() => { console.log("set..."); }, 2000);
setTimeout(() => { console.log("go!"); }, 3000);

/**
 * Note that setTimeout() does not wait for the time to elapse before 
 * returning. All three lines of code in this example run almost 
 * instantly, but then nothing happens until 1,000 milliseconds elapse.
 * If you omit the second argument to setTimeout(), it defaults to 0. 
 * That does not mean, however, that the function you specify is invoked 
 * immediately. Instead, the function is registered to be called “as soon 
 * as possible.” If a browser is particularly busy handling user input or 
 * other events, it may take 10 milliseconds or more before the function 
 * is invoked.
 */

/**
 * setTimeout() registers a function to be invoked once. Sometimes, that 
 * function will itself call setTimeout() to schedule another invocation 
 * at a future time. If you want to invoke a function repeatedly, 
 * however, it is often simpler to use setInterval(). setInterval() takes 
 * the same two arguments as setTimeout() but invokes the function 
 * repeatedly every time the specified number of milliseconds 
 * (approximately) have elapsed.
 * Both setTimeout() and setInterval() return a value. If you save this 
 * value in a variable, you can then use it later to cancel the execution 
 * of the function by passing it to clearTimeout() or clearInterval(). 
 * The returned value is typically a number in web browsers and is an 
 * object in Node. The actual type doesn’t matter, and you should treat 
 * it as an opaque value. The only thing you can do with this value is 
 * pass it to clearTimeout() to cancel the execution of a function 
 * registered with setTimeout() (assuming it hasn’t been invoked yet) or 
 * to stop the repeating execution of a function registered with 
 * setInterval().
 */

// Here is an example that demonstrates the use of setTimeout(),
// setInterval(), and clearInterval() to display a simple
// digital clock with the Console API:

// Once a second: clear the console and print the current time
let clock = setInterval(() => {
    console.clear();
    console.log(new Date().toLocaleTimeString());
}, 1000);

// After 10 seconds: stop the repeating code above.
setTimeout(() => { clearInterval(clock); }, 10000);