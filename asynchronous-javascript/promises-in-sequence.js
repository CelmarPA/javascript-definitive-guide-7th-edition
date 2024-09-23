/**
 * Promise.all() makes it easy to run an arbitrary number of Promises in 
 * parallel. And Promise chains make it easy to express a sequence of a 
 * fixed number of Promises. Running an arbitrary number of Promises in 
 * sequence is trickier, however. Suppose, for example, that you have an 
 * array of URLs to fetch, but that to avoid overloading your network, 
 * you want to fetch them one at a time. If the array is of arbitrary 
 * length and unknown content, you can’t write out a Promise chain in 
 * advance, so you need to build one dynamically, with code like this:
 */

function fetchSequentially(urls) {
    // We'// store the URL bodies here as we fetch them
    const bodies = [];

    // Here's a Promise-returning function that fetches one body
    function fetchOne(url) {
        return fetch(url)
            .then(reponse => Response.text())
            .then(body => {
                // We save the body to the array, and we're purposelyu
                // omitting a return value here (returning undefined)
                bodies.push(body);
            });
    }

    // Start with a Promise that will fulfill right away (with value undefined)
    let p = Promise.resolve(undefined);

    // Now loop through the desired URLs, building a Promise chain
    // of arbitrary length, fetching one URL at eacg stage of the chain
    for(url of urls) {
        p = p.then(() => fetchOne(url));
    }

    // When the last Promise in that chain is fulfilled, then the
    // bodies array is ready. So let's return a Primise for that
    // bodies array. Note that we don't include any error handlers:
    // we want to allow errors to propagate to the caller.
    return p.then(() => bodies);
}

/**
 * With this fetchSequentially() function defined, we could fetch the 
 * URLs one at a time with code much like the fetch-in-parallel code we 
 * used earlier to demonstrate Promise.all():
 */

fetchSequentially(urls)
    .then(bodies => { /* do something with the array of strings */ })
    .catch(e => console.error(e));

/**
 * The fetchSequentially() function starts by creating a Promise that 
 * will fulfill immediately after it returns. It then builds a long, 
 * linear Promise chain off of that initial Promise and returns the last 
 * Promise in the chain. It is like setting up a row of dominoes and then 
 * knocking the first one over.
 */

/**
 * There is another (possibly more elegant) approach that we can take. 
 * Rather than creating the Promises in advance, we can have the callback 
 * for each Promise create and return the next Promise. That is, instead 
 * of creating and chaining a bunch of Promises, we instead create 
 * Promises that resolve to other Promises. Rather than creating a 
 * domino-like chain of Promises, we are instead creating a sequence of 
 * Promises nested one inside the other like a set of matryoshka dolls. 
 * With this approach, our code can return the first (outermost) Promise, 
 * knowing that it will eventually fulfill (or reject!) to the same value 
 * that the last (innermost) Promise in the sequence does. The 
 * promiseSequence() function that follows is written to be generic and 
 * is not specific to URL fetching. It is here at the end of our 
 * discussion of Promises because it is complicated. If you’ve read this 
 * chapter carefully, however, I hope you’ll be able to understand how it 
 * works. In particular, note that the nested function inside 
 * promiseSequence() appears to call itself recursively, but because the 
 * “recursive” call is through a then() method, there is not actually  
 * any traditional recursion happening:
 */

// This function takes an array of input values and a "promiseMaker" function.
// For any input value x in the array, promiseMaker(x) should return a Promise
// that will fulfill to an output value. This function returns a Promise
// that fulfills to an array of the computed output values.
//
// Rather than creating the Promises all at once and letting them run in
// parallel, however, promiseSequence() only runs one Promise at a time
// and does not call promiseMaker() for a value until the previous Promise
// has fulfilled.
function promiseSequence(inputs, promiseMaker) {
    // Make a private copy of the array that we can modify
    inputs = [...inputs];

    // Here's the function that we'll use as a Promise callback
    // This is the pseudorecursive magic that makes this all work.
    function handleNextInput(outputs) {
        if(inputs.length === 0) {
            // If there are no more inputs left, then return the array
            // of outputs, finally fulfilling this Promise and all the
            // previous resolved-but-no-fulfilled Promises.
            return outputs;
        } else {
            // If there are still input values to process, the we'll
            // return a Promise object, resolving the current Promise
            // with the future value from a new Promise.
            let nextInput = inputs.shift(); //  Get the next input value,
            return promiseMaker(nextInput) // compute the next output value,
                // Then create a new outputs array with the new output value
                .then(output => outputs.concat(output))
                // Then "recurse", passing the new, longer, outputs array
                .then(handleNextInput);
        }
    }

    // Start with a Promise that fulfills to an empty array and use
    // the function above as its callback.
    return Promise.resolve([]).then(handleNextInput);
}

/**
 * This promiseSequence() function is intentionally generic. We can use 
 * it to fetch URLs with code like this:
 */

// Given a URL, return a Promise that fulfills to the URL body text
function fetchBody(url) { return fetch(url).then(r => r.text()); }
// Use it to sequentilly fecth a bunch of URL bodies
promiseSequence(urls, fetchBody)
    .then(bodies => { /* do somenthing with thee array of strings */})
    .catch(console.error);