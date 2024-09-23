/**
 * To execute a number of asynchronous operations in parallel. The
 * function Promise.all() can do this. Promise.all() takes an array of 
 * Promise objects as its input and returns a Promise. The returned 
 * Promise will be rejected if any of the input Promises are rejected.  
 * Otherwise, it will be fulfilled with an array of the fulfillment 
 * values of each of the input Promises. So, for example, if you want to 
 * fetch the text content of multiple URLs, you could use code like this:
 */

// We start with an array of URLs
const urls = [ /* zero or more URLs here */ ];
// And convert it to an array of  Promises objects
promises = urls.map(url => fetch(url).then(r => r.text()));
// Now get a Promise to run all those Promises in parallel
Promise.all(promises)
    .then(bodies => { /* do something with the array of strings */ })
    .catch(e => console.error(e));

/**
 * Promise.all() is slightly more flexible than described before. The 
 * input array can contain both Promise objects and non-Promise values. 
 * If an element of the array is not a Promise, it is treated as if it is 
 * the value of an already fulfilled Promise and is simply copied 
 * unchanged into the output array.
 */

/**
 * Promise.allSettled() never rejects the returned Promise, and it does 
 * not fulfill that Promise until all of the input Promises have settled. 
 * The Promise resolves to an array of objects, with one object for each 
 * input Promise. Each of these returned objects has a status property 
 * set to “fulfilled” or “rejected.” If the status is “fulfilled”, then 
 * the object will also have a value property that gives the fulfillment 
 * value. And if the status is “rejected”, then the object will also have 
 * a reason property that gives the error or rejection value of the 
 * corresponding Promise:
 */

Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3]).then(results => {
    results[0] // => { status: "fulfilled", value: 1 }
    results[1] // => { status: "rejected", reason: 2 }
    results[2] // => { status: "fulfilled", value: 3 }
});

/**
 * Occasionally, you may want to run a number of Promises at once but may 
 * only care about the value of the first one to fulfill. In that case, 
 * you can use Promise.race() instead of Promise.all(). It returns a 
 * Promise that is fulfilled or rejected when the first of the Promises 
 * in the input array is fulfilled or rejected. (Or, if there are any 
 * non-Promise values in the input array, it simply returns the first of 
 * those.)
 */