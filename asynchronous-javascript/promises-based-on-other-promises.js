/**
 * It is easy to write a function that returns a Promise if you have some 
 * other Promise-returning function to start with. Given a Promise, you 
 * can always create (and return) a new one by calling .then(). So if we 
 * use the existing fetch() function as a starting point, we can write 
 * getJSON() like this:
 */

function getJSON(url) {
    return fetch(url).then(response => response.json());
}

/**
 * The code is trivial because the Response object of the fetch() API has 
 * a predefined json() method. The json() method returns a Promise, which 
 * we return from our callback (the callback is an arrow function with a 
 * single-expression body, so the return is implicit), so the Promise 
 * returned by getJSON() resolves to the Promise returned by response.json
 * (). When that Promise fulfills, the Promise returned by getJSON() 
 * fulfills to the same value. Note that there is no error handling in 
 * this getJSON() implementation. Instead of checking response.ok and the 
 * Content-Type header, we instead just allow the json() method to reject 
 * the Promise it returned with a SyntaxError if the response body cannot 
 * be parsed as JSON.
 */

// Let’s write another Promise-returning function, this time using
// getJSON() as the source of the initial Promise:

function getHighScore() {
    return getJSON("/api/user/profile").then(profile => profile.highScore);
}

/**
 * We’re assuming that this function is part of some sort of web-based 
 * game and that the URL “/api/user/profile” returns a JSON-formatted 
 * data structure that includes a highScore property.
 */

// PROMISES FROM SCRATCH

/**
 * For both getJSON() and getHighScore(), we started off by calling an 
 * existing function to get an initial Promise, and created and returned 
 * a new Promise by calling the .then() method of that initial Promise. 
 * But what about writing a Promise-returning function when you can’t use 
 * another Promise-returning function as the starting point? In that 
 * case, you use the Promise() constructor to create a new Promise object 
 * that you have complete control over. Here’s how it works: you invoke 
 * the Promise() constructor and pass a function as its only argument. 
 * The function you pass should be written to expect two parameters, 
 * which, by convention, should be named resolve and  reject. The 
 * constructor synchronously calls your function with function arguments 
 * for the resolve and reject parameters. After calling your function, 
 * the Promise() constructor returns the newly created Promise. That 
 * returned Promise is under the control of the function you passed to 
 * the constructor. That function should perform some asynchronous 
 * operation and then call the resolve function to resolve or fulfill the 
 * returned Promise or call the reject function to reject the returned 
 * Promise. Your function does not have to be asynchronous: it can call 
 * resolve or reject synchronously, but the Promise will still be 
 * resolved, fulfilled, or rejected asynchronously if you do this.
 * 
 * It can be hard to understand the functions passed to a function passed 
 * to a constructor by just reading about it, but hopefully some examples 
 * will make this clear. Here’s how to write the Promise-based wait() 
 * function that we used in various examples earlier in the chapter:
 */

function wait(duration) {
    // Create and return a new Promise
    return new Promise((resolve, reject) => { // These control the Promise
        // If the argument is invalid, reject the Promise
        if (duration < 0) {
            reject(new Error("Time travel not yet implemented"));
        }
        // Otherwise, wait asynchronously and then resolve the Promise.
        // setTimeout will invoke resolve() with no arguments,  with means
        // that the Promise will fulfill with the undefined value.
        setTimeout(resolve, duration);
    });
}

/**
 * Note that the pair of functions that you use to control the fate of a 
 * Promise created with the Promise() constructor are named resolve() and 
 * reject(), not fulfill() and reject(). If you pass a Promise to resolve
 * (), the returned Promise will resolve to that new Promise. Often, 
 * however, you will pass a non-Promise value, which fulfills the 
 * returned Promise with that value.
 */

/**
 * Example 13-1 is another example of using the Promise() constructor. 
 * This one implements our getJSON() function for use in Node, where the 
 * fetch() API is not built in. Remember that we started this chapter 
 * with a discussion of asynchronous callbacks and events. This example 
 * uses both callbacks and event handlers and is a good demonstration, 
 * therefore, of how we can implement Promisebased APIs on top of other 
 * styles of asynchronous programming.
 */

// Example 13-1. An asynchronous getJSON() function
const http = require("http");

function getJSON(url) {
    // Create and return a new Promise
    return new Promise((resolve, reject) => {
        // Start an HTTP GET request for the specified URL
        request = http.get(url, response => { // called when response starts
            // Reject the Promise if the HTTP status is wrong
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP status ${response.statusCode}`));
                response.resume(); // so we don't leak memory
            }
            // And reject if the response headers are wrong
            else if (response.headers["content-type"] !== "application/json") {
                reject(new Error("Invalid content-type"));
                response.resume(); // don't leak memory
            }
            else {
                // Otherwise, register events to read the body of the response
                let body = "";
                response.setEncoding("utf-8");
                response.on("data", chunk => { body += chunk; });
                response.on("end", () => {
                    // When the response body is complete, try to parse it
                    try {
                        let parsed = JSON.parse(body);
                        // If it parsed successfully, fulfill the Promise
                        resolve(parsed);
                    } catch(e) {
                        // If parsing failed, reject the Promise
                        reject(e);
                    }
                });
            }
        });
        // We also reject the Promise if the request fails before we
        // even get a response (such as when the network is down)
        request.on("error", error => {
            reject(error);
        });
    });1
}