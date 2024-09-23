/**
 * When we introduced Promises, we noted that they were useful for 
 * single-shot asynchronous computations but were not suitable for use 
 * with sources of repetitive asynchronous events, such as setInterval(), 
 * the “click” event in a web browser, or the “data” event on a Node 
 * stream. Because single Promises do not work for sequences of 
 * asynchronous events, we also cannot use regular async functions and 
 * the await statements for these things.
 */

// The for/await Loop

/**
 * Node 12 makes its readable streams asynchronously iterable. This means 
 * you can read successive chunks of data from a stream with a for/await 
 * loop like this one:
 */

const fs = require("fs");

async function parseFile(filename) {
    let stream = fs.createReadStream(filename, { enconding: "utf-8"});
    for await (let chunk of stream) {
        parseChunk(chunk); // Assume parseChunk() is defined elsewhere
    }
}

/**
 * Like a regular await expression, the for/await loop is Promisebased. 
 * Roughly speaking, the asynchronous iterator produces a Promise and the 
 * for/await loop waits for that Promise to fulfill, assigns the 
 * fulfillment value to the loop variable, and runs the body of the loop. 
 * And then it starts over, getting another Promise from the iterator and 
 * waiting for that new Promise to fulfill.
 */

// Suppose you have an array of URLs:
const urls = [url1, url2, url3];

// You can call fetch() on each URL to get an array of Promises:
const promises = urls.map(url => fetch(url));

/**
 * We saw earlier in the chapter that we could now use Promise.all() to 
 * wait for all the Promises in the array to be fulfilled. But suppose we 
 * want the results of the first fetch as soon as they become available 
 * and don’t want to wait for all the URLs to be fetched. (Of course, the 
 * first fetch might take longer than any of the others, so this is not 
 * necessarily faster than using Promise.all().) Arrays are iterable, so 
 * we can iterate through the array of promises with a regular for/of 
 * loop:
 */

for(const promise of promises) {
    response =  await promise;
    handle(response);
}

/**
 * This example code uses a regular for/of loop with a regular iterator. 
 * But because this iterator returns Promises, we can also use the new 
 * for/await for slightly simpler code:
 */

for await (const response of promises) {
    handle(response);
}

/**
 * In this case, the for/await loop just builds the await call into the loop and makes our code slightly more compact, but the two examples do exactly the same thing. Importantly, both examples will only work if they are within functions declared async; a for/await loop is no different than a regular await expression in that way.
 */

// Asynchronous Iterators

/**
 * Let’s review some terminology from Chapter 12. An iterable object is 
 * one that can be used with a for/of loop. It defines a method with the 
 * symbolic name Symbol.iterator. This method returns an iterator object. 
 * The iterator object has a next() method, which can be calledrepeatedly 
 * to obtain the values of the iterable object. The next() method of the 
 * iterator object returns iteration result objects. The iteration result 
 * object has a value property and/or a done property.
 * 
 * Asynchronous iterators are quite similar to regular iterators, but 
 * there are two important differences. First, an asynchronously iterable 
 * object implements a method with the symbolic name Symbol.asyncIterator 
 * instead of Symbol.iterator. (As we saw earlier, for/await is 
 * compatible with regular iterable objects but it prefers asynchronously 
 * iterable objects, and tries the Symbol.asyncIterator method before it 
 * tries the Symbol.iterator method.) Second, the next() method of an 
 * asynchronous iterator returns a Promise that resolves to an iterator 
 * result object instead of returning an iterator result object directly.
 */

// Asynchronous Generators

/**
 * As we saw in Chapter 12, the easiest way to implement an iterator is 
 * often to use a generator. The same is true for asynchronous iterators, 
 * which we can implement with generator functions that we declare async. 
 * An async generator has the features of async functions and the 
 * features of generators: you can use await as you would in a regular 
 * async function, and you can use yield as you would in a regular 
 * generator. But values that you yield are automatically wrapped in 
 * Promises. Even the syntax for async generators is a combination: async 
 * function and function * combine into async function *. Here is an 
 * example that shows how you might use an async generator and a for/
 * await loop to repetitively run code at fixed intervals using loop 
 * syntax instead of a setInterval() callback function:
 */

// A Promise-vased wrapper around setTimeout() that we can use await with.
// Returns a Promise that fulfills in the specified number of milliseconds
function elapsedTime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// An async generator function that increments a counter and yields it
// a specified (or infinite) number of times at a specified interval.
async function* clock(interval, max=Infinity) {
    for(let count = 1; count <= max; count++) { // regular for loop
        await elapsedTime(interval); // wait for time to pass
        yield count; // yield the counter
    }
}

// A test function that uses the async generator with for/await
async function test() { // Async so we can use for/await
    for await (let tick of clock(300, 100)) { // Loop 100 times every 300ms
        console.log(tick);
    }
}