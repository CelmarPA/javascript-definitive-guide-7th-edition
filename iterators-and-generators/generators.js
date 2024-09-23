/**
 * A generator is a kind of iterator defined with powerful new ES6 
 * syntax; it’s particularly useful when the values to be iterated are 
 * not the elements of a data structure, but the result of a computation.
 * 
 * To create a generator, you must first define a generator function. A
 * generator function is syntactically like a regular JavaScript function 
 * but is defined with the keyword function* rather than function. 
 * (Technically, this is not a new keyword, just a * after the keyword 
 * function and before the function name.) When you invoke a generator 
 * function, it does not actually execute the function body, but instead 
 * returns a generator object. This generator object is an iterator. 
 * Calling its next() method causes the body of the generator function to 
 * run from the start (or whatever its current position is) until it 
 * reaches a yield statement. yield is new in ES6 and is something like a 
 * return statement. The value of the yield statement becomes the value 
 * returned by the next() call on the iterator.
 */

// An example makes this clearer:

// A generator function that yields the set of one digit (base-10) primes.
function* oneDigitPrimes() { // Invoking this function does not run the code
    yield 2; // but just returns a generator object. 
    yield 3; // Calling  the next() method of that generator runs
    yield 5; // the code until a yield statement provides
    yield 7; // the return value for the next() method.
}

// When we invoke the generator function, we get a generator
let primes = oneDigitPrimes();

// A generator is an iterator object that iterates the yielded values
console.log(primes.next().value); // => 2
console.log(primes.next().value); // => 3
console.log(primes.next().value); // => 5
console.log(primes.next().value); // => 7
console.log(primes.next().done); // => true

// Generators have a Symbol.iterator method to make them iterable
primes[Symbol.iterator](); // => primes

// We can use generators like other iterable types
console.log([...oneDigitPrimes()]); // => [ 2, 3, 5, 7 ]
let sum = 0;
for(let prime of oneDigitPrimes()) sum += prime;
console.log(sum); // => 17

/**
 * In this example, we used a function* statement to define a generator. 
 * Like regular functions, however, we can also define generators in 
 * expression form. Once again, we just put an asterisk after the 
 * function keyword:
 */

const seq = function*(from, to) {
    for(let i =  from; i <= to; i++) yield i;
};
console.log([...seq(3, 5)]); // => [3, 4, 5]

/**
 * In classes and object literals, we can use shorthand notation to omit 
 * the function keyword entirely when we define methods. To define a 
 * generator in this context, we simply use an asterisk before the method 
 * name where the function keyword would have been, had we used it:
 */

let o = {
    x: 1, y: 2, z :3,
    // A generator that yields each of the keys of this object
    *g() {
        for(let key of Object.keys(this)) {
            yield key;
        }
    }
};
console.log([...o.g()]); // => ["x", "y", "z", "g"]

/**
 * Note that there is no way to write a generator function using arrow 
 * function syntax. Generators often make it particularly easy to define 
 * iterable classes. We can replace the [Symbol.iterator]() method show 
 * in Example 12-1 with a much shorter * [Symbol.iterator&rbrack;() 
 * generator function that looks like this:
 */

/* *[Symbol.iterator]() {
     for(let x = Math.ceil(this.from); x <= this.to; x++) {
         yield x;
     }
 } */

 export { oneDigitPrimes };