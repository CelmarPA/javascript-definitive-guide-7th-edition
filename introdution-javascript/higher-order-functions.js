// This higher-order function returns a new function that passes its
// argument to f and returns the logical negation of f's return value;
function not(f) {
    return function(...args) { // Return a new function
        let result = f.apply(this, args); // that calls f
        return !result; // adn negates its result.
    }
}

const even = x => x % 2 === 0; // A function to determine if a number is even
const odd = not(even); // A new fuction that does the opposite
console.log([1,1,3,5,5].every(odd)); // => true: every element of the array is odd

// Return a function that expects an array argument and applies f to
// each element, returning the array of return values.
// Contrast this with the map() function from earlier.

// Function map:
const map = function(a, ...args) { return a.map(...args); };

function mapper(f) {
    return a => map(a, f);
}
const increment = x => x+1;
const incrementAll = mapper(increment);
console.log(incrementAll([1,2,3])); // => [2,3,4]

// Return a new function that computes f(g(...)).
// The returned function h passes all of its arguments to g, then passes
// the return value of g to f, the returns the return value of f.
// Both f and g are invoked with the same this value as h was invoked with.
function compose(f, g) {
    return function(...args) {
        // We use call for f because we're passing a single value and
        // apply for g because we're passing an array of values.
        return f.call(this, g.apply(this, args));
    };
}

const sum = (x,y) => x+y;
const square = x => x*x;
console.log(compose(square, sum)(2,3)) // => 25; the square of the sum