/**
 * In addition to the zip() generator defined in the preceding example, 
 * it might be useful to have a similar generator function that yields 
 * the  elements of multiple iterable objects sequentially rather than 
 * interleaving them. We could write that generator like this:
 */

// A generator function that yields the set of one digit (base-10) primes.
function* oneDigitPrimes() { // Invoking this function does not run the code
    yield 2; // but just returns a generator object. 
    yield 3; // Calling  the next() method of that generator runs
    yield 5; // the code until a yield statement provides
    yield 7; // the return value for the next() method.
}

function* sequence(...iterables) {
    for(let iterable of iterables) {
        for(let item of iterable) {
            yield item;
        }
    }
}

console.log([...sequence("abc",  oneDigitPrimes())]); // => ["a","b","c",2,3,5,7]

/**
 * The array forEach() method is often an elegant way to loop over the 
 * elements of an array, so you might be tempted to write the sequence() 
 * function like this:
 */

function* sequence(...iterables) {
    iterables.forEach(iterable => yield* iterable ); // Error
}

/**
 * This does not work, however. yield and yield* can only be used within 
 * generator functions, but the nested arrow function in this code is a 
 * regular function, not a function* generator function, so yield is not 
 * allowed.
 */

/**
 * yield* can be used with any kind of iterable object, including 
 * iterables implemented with generators. This means that yield* allows 
 * us to define recursive generators, and you might use this feature to 
 * allow simple non-recursive iteration over a recursively defined tree 
 * structure, for example.
 */