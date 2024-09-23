// Using promises

/**
 * With the advent of Promises in the core JavaScript language, web 
 * browsers have begun to implement Promise-based APIs. In the previous 
 * section, we implemented a getText() function that made an asynchronous 
 * HTTP request and passed the body of the HTTP response to a specified 
 * callback function as a string. Imagine a variant of this function, 
 * getJSON(), which parses the body of the HTTP response as JSON and 
 * returns a Promise instead of accepting a callback argument. We will 
 * implement a getJSON() function later in this chapter, but for now, 
 * let’s look at how we would use this Promisereturning utility function:
 */

getJSON(url).then(jsonData => {
    // This is a callback function that will be asynchronously
    // invoked with the parse JSON value when it becomes available.
});

/**
 * getJSON() starts an asynchronous HTTP request for the URL you specify 
 * and then, while that request is pending, it returns a Promise object. 
 * The Promise object defines a then() instance method. Instead of 
 * passing our callback function directly to getJSON(), we instead pass 
 * it to the then() method. When the HTTP response arrives, the body of 
 * that response is parsed as JSON, and the resulting parsed value is 
 * passed to the function that we passed to then().
 * 
 * You can think of the then() method as a callback registration method 
 * like the addEventListener() method used for registering event handlers 
 * in client-side JavaScript. If you call the then() method of a Promise 
 * object multiple times, each of the functions you specify will be 
 * called when the promised computation is complete.
 * 
 * Unlike many event listeners, though, a Promise represents a single 
 * computation, and each function registered with then() will be invoked 
 * only once. It is worth noting that the function you pass to then() is 
 * invoked asynchronously, even if the asynchronous computation is 
 * already complete when you call then().
 * 
 * At a simple syntactical level, the then() method is the distinctive 
 * feature of Promises, and it is idiomatic to append .then() directly to 
 * the function invocation that returns the Promise, without the 
 * intermediate step of assigning the Promise object to a variable.
 * 
 * It is also idiomatic to name functions that return Promises and 
 * functions that use the results of Promises with verbs, and these 
 * idioms lead to code that is particularly easy to read:
 */

// Suppose you have a function like this to display a user profile
function displayUserProfile(profile) { /* implementation
omitted */ }

// Here's how you might use that function with a Promise.
// Notice how this line of code reads almost like an English sentence:
getJSON("/api/user/profile").then(displayUserProfile);

// HANDLING ERRORS WITH PROMISES

/**
 * Asynchronous operations, particularly those that involve networking, 
 * can typically fail in a number of ways, and robust code has to be 
 * written to handle the errors that will inevitably occur.
 * For Promises, we can do this by passing a second function to the 
 * then() method:
 */

getJSON("/api/user/profile").then(displayUserProfile, handleProfileError);

/**
 * A Promise represents the future result of an asynchronous computation 
 * that occurs after the Promise object is created. Because the 
 * computation is performed after the Promise object is returned to us, 
 * there is no way that the computation can traditionally return a value 
 * or throw an exception that we can catch. The functions that we pass to 
 * then() provide alternatives. When a synchronous computation completes 
 * normally, it simply returns its result to its caller. When a 
 * Promise-based asynchronous computation completes normally, it passes 
 * its result to the function that is the first argument to then().
 * 
 * When something goes wrong in a synchronous computation, it throws an 
 * exception that propagates up the call stack until there is a catch 
 * clause to handle it. When an asynchronous computation runs, its caller 
 * is no longer on the stack, so if something goes wrong, it is simply 
 * not possible to throw an exception back to the caller.
 * 
 * Instead, Promise-based asynchronous computations pass the exception 
 * (typically as an Error object of some kind, though this is not 
 * required) to the second function passed to then(). So, in the code 
 * above, if getJSON() runs normally, it passes its result to 
 * displayUserProfile(). If there is an error (the user is not logged in, 
 * the server is down, the user’s internet connection dropped, the 
 * request timed out, etc.), then getJSON() passes an Error object to 
 * handleProfileError().
 * The more idiomatic way to handle errors in this code looks like this:
 */

getJSON("/api/user/profile").then(displayUserProfile).catch(handleProfileError);

/**
 * With this code, a normal result from getJSON() is still passed to 
 * displayUserProfile(), but any error in getJSON() or in 
 * displayUserProfile() (including any exceptions thrown by 
 * displayUserProfile) get passed to handleProfileError(). The catch() 
 * method is just a shorthand for calling then() with a null first 
 * argument and the specified error handler function as the second 
 * argument.
 */

// PROMISE TERMINOLOGY
/**
 * Before we discuss Promises further, it is worth pausing to define some 
 * terms. When we are not programming and we talk about human promises, 
 * we say that a promise is “kept” or “broken.” When discussing 
 * JavaScript Promises, the equivalent terms are “fulfilled” and 
 * “rejected.” Imagine that you have called the then() method of a 
 * Promise and have passed two callback functions to it. We say that the 
 * promise has been fulfilled if and when the first callback is called. 
 * And we say that the Promise has been rejected if and when the second 
 * callback is called. If a Promise is neither fulfilled nor rejected, 
 * then it is pending. And once a promise is fulfilled or rejected, we 
 * say that it is settled. Note that a Promise can never be both 
 * fulfilled and rejected. Once a Promise settles, it will never change 
 * from fulfilled to rejected or vice versa. 
 * 
 * Remember how we defined Promises at the start of this section: “a 
 * Promise is an object that represents the result of an asynchronous 
 * operation.” It is important to remember that Promises are not just 
 * abstract ways registering callbacks to run when some async code 
 * finishes—they represent the results of that async code. If the async 
 * code runs normally (and the Promise is fulfilled), then that result is 
 * essentially the return value of the code. And if the async code does 
 * not complete normally (and the Promise is rejected), then the result 
 * is an Error object or some other value that the code might have thrown 
 * if it was not asynchronous. Any Promise that has settled has a value 
 * associated with it, and that value will not change. If the Promise is 
 * fulfilled, then the value is a return value that gets passed to any 
 * callback functions registered as the first argument of then(). If the 
 * Promise is rejected, then the value is an error of some sort that is 
 * passed to any callback functions registered with catch() or as the 
 * second argument of then().
 * The reason that I want to be precise about Promise terminology is that 
 * Promises can also be resolved. It is easy to confuse this resolved 
 * state with the fulfilled state or with settled state, but it is not 
 * precisely the same as either. Understanding the resolved state is one 
 * of the keys to a deep understanding of Promises.
 */