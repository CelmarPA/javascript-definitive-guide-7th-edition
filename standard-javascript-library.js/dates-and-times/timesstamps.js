/**
 * For any Date object, the getTime() method returns this internal
 * value, and the setTime() method sets it. So you can add 30 seconds
 * to a Date with code like this, for example:
 */

let d = new Date;
d.setTime(d.getTime + 30000);

/**
 * These millisecond values are sometimes called timestamps, and it is
 * sometimes useful to work with them directly rather than with Date
 * objects. The static Date.now() method returns the current time as a
 * timestamp and is helpful when you want to measure how long your
 * code takes to run:
 */

let startTime = Date.now();
let reticulateSplines = () => {
    let soma = 0;
    for(let i = 0; i < 1000000; i++) {
        soma += i;
    }
    return soma;
}; 
reticulateSplines();// Do some time-consuming operation
let endTime = Date.now();
console.log(`Spline reticulation took ${endTime - startTime}ms.`)
// HIGH-RESOLUTION TIMESTAMPS
/**
 * The timestamps returned by Date.now() are measured in milliseconds. A 
 * millisecond is actually a relatively long time for a computer, and 
 * sometimes you may want to measure elapsed time with higher precision. 
 * The performance.now() function allows this: it also returns a 
 * millisecond-based timestamp, but the return value is not an integer, 
 * so it includes fractions of a millisecond. The value returned by 
 * performance.now() is not an absolute timestamp like the Date.now() 
 * value is. Instead, it simply indicates how much time has elapsed since 
 * a web page was loaded or since the Node process started.
 * The performance object is part of a larger Performance API that is not 
 * defined by the ECMAScript standard but is implemented by web browsers 
 * and by Node. In order to use the performance object in Node, you must 
 * import it with:
 * 
 *              const { performance } = require("perf_hooks");
 * 
 * Allowing high-precision timing on the web may allow unscrupulous 
 * websites to fingerprint visitors, so browsers (notably Firefox) may 
 * reduce the precision of performance.now() by default. As a web
 * developer, you should be able to re-enable high-precision timing
 * somehow (such as by setting privacy.reduceTimerPrecision to false in 
 * Firefox).
 */