// A generator function that yields the set of one digit (base-10) primes.
function* oneDigitPrimes() { // Invoking this function does not run the code
    yield 2; // but just returns a generator object. 
    yield 3; // Calling  the next() method of that generator runs
    yield 5; // the code until a yield statement provides
    yield 7; // the return value for the next() method.
}

/**
 * Generators are more interesting if they actually generate the values 
 * they yield by doing some kind of computation. Here, for example, is a 
 * generator function that yields Fibonacci numbers:
 */

function* fibonacciSequence() {
    let x = 0, y = 1;
    for(;;) {
        yield y;
        [x, y] = [y, x + y] // Note: destructuring assignment
    }
}

const generator = fibonacciSequence();
console.log(generator.next().value); // Outputs: 1
console.log(generator.next().value); // Outputs: 1
console.log(generator.next().value); // Outputs: 2
console.log(generator.next().value); // Outputs: 3
console.log(generator.next().value); // Outputs: 5
// and so on...

/**
 * Note that the fibonacciSequence() generator function here has an 
 * infinite loop and yields values forever without returning. If 
 * thisgenerator is used with the ... spread operator, it will loop until 
 * memory is exhausted and the program crashes. With care, it is possible 
 * to use it in a for/of loop, however:
 */

// Return the nth Fibonacci number
function fibonacci(n) {
    for(let f of fibonacciSequence()) {
        if (n-- <= 0) return f;
    }
}
console.log(fibonacci(20)); // => 10946

// This kind of infinite generator becomes more useful with a take()
// generator like this:

// Yield the first n elements of the specified iterable object
function* take(n, iterable) {
    let it = iterable[Symbol.iterator](); // Get iterator for iterable object
    while(n-- > 0) {
        let next = it.next(); // Get the next item from the iterator.
        if (next.done) return; // if there are no more values, return early
        else yield next.value; // otherwise, yield the value
    }
}

// An array of the first 5 Fibonacci numbers
console.log([...take(5, fibonacciSequence())]); // => [1, 1, 2, 3, 5]

// Here is another useful generator function that interleaves the elements
// of multiple iterable objects:

// Given an array of iterables,  yield their elements in interleaved order.
function* zip(...iterables) {
    // Get an iterator for each iterable
    let iterators = iterables.map(i => i[Symbol.iterator]());
    let index = 0;
    while(iterators.length > 0) { // While there are the last iterators
        if (index >= iterators.length) { // If we reached the last iterator
            index = 0; // go back to the first one
        }
        let item = iterators[index].next(); // Get next item from next iterator.
        if (item.done) { // Id that iterator is done
            iterators.splice(index, 1); // then remove it from the array.
        }
        else { // Otherwise,
            yield item.value; // yield the iterated value
            index++; // and move on to the next iterator. 
        }
    }
}

// Interleave three iterable objects
console.log([...zip(oneDigitPrimes(),"ab",[0])]); // => [2,"a",0,3,"b",5,7]