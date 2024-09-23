/**
 * While explaining the URL-fetching Promise chain with the list in the 
 * last section, we talked about promises 1, 2, and 3. But there is 
 * actually a fourth Promise object involved as well, and this brings us 
 * to our important discussion of what it means for a Promise to be 
 * “resolved.”
 */

/**
 * Remember that fetch() returns a Promise object which, when fulfilled, 
 * passes a Response object to the callback function we register. This 
 * Response object has .text(), .json(), and other methods to request the 
 * body of the HTTP response in various forms. But since the body may not 
 * yet have arrived, these methods must return Promise  objects. In the 
 * example we’ve been studying, “task 2” calls the .json() method and 
 * returns its value. This is the fourth Promise object, and it is the 
 * return value of the callback1() function.
 */

/**
 * Let’s rewrite the URL-fetching code one more time in a verbose and 
 * nonidiomatic way that makes the callbacks and promises explicit:
 */

function c1(responde) { // callback 1
    let p4 = responde.json();
    return p4; // returns promise 4
}

function c2(profile) { // callback 2
    displayUserProfile(profile);
}

let p1 = fetch("/api/user/profile"); // promise 1, task 1
let p2 = p1.then(c1); // promise 2, task 2
let p3 = p2.then(c2); // promise 3, task 3

/**
 * In order for Promise chains to work usefully, the output of task 2 
 * must become the input to task 3. And in the example we’re considering 
 * here, the input to task 3 is the body of the URL that was fetched, 
 * parsed as a JSON object. But, as we’ve just discussed, the return 
 * value of callback c1 is not a JSON object, but Promise p4 for that 
 * JSON object. This seems like a contradiction, but it is not: when p1 
 * is fulfilled, c1 is invoked, and task 2 begins. And when p2 is 
 * fulfilled, c2 is invoked, and task 3 begins. But just because task 2 
 * begins when c1 is invoked, it does not mean that task 2 must end when 
 * c1 returns. Promises are about managing asynchronous tasks, after all, 
 * and if task 2 is asynchronous (which it is, in this case), then that 
 * task will not be complete by the time the callback returns.
 */

/**
 * We are now ready to discuss the final detail that you need to 
 * understand to really master Promises. When you pass a callback c to 
 * the then() method, then() returns a Promise p and arranges to 
 * asynchronously invoke c at some later time. The callback performs some 
 * computation and returns a value v. When the callback returns, p is 
 * resolved with the value v. When a Promise is resolved with a value 
 * that is not itself a Promise, it is immediately fulfilled with that 
 * value. So if c returns a non-Promise, that return value becomes the 
 * value of p, p is fulfilled and we are done. But if the return value v 
 * is itself a Promise, then p is resolved but not yet fulfilled. At this 
 * stage, p cannot settle until the Promise v settles. If v is fulfilled, 
 * then p will be fulfilled to the same value. If v is rejected, then p 
 * will be rejected for the same reason. This is what the “resolved” 
 * state of a Promise means: the Promise has become associated with, or 
 * “locked onto,” another Promise. We don’t know yet whether p will be 
 * fulfilled or rejected, but our callback c no longer has any control 
 * over that. p is “resolved” in the sense that its fate now depends 
 * entirely on what happens to Promise v.
 */