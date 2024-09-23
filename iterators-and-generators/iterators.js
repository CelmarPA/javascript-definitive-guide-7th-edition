/**
 * Iterable objects and their associated iterators are a feature of ES6 
 * that we’ve seen several times throughout this book. Arrays (including 
 * TypedArrays) are iterable, as are strings and Set and Map objects. 
 * This means that the contents of these data structures can be 
 * iterated—looped over—with the for/of loop:
 */

let sum = 0;
for(let i of [1,2,3]) { // Loop  once for each of these values
    sum += i;
}
console.log(sum); // => 6

/**
 * Iterators can also be used with the ... operator to expand or “spread” 
 * an iterable object into an array initializer or function invocation:
 */

let chars = [..."abcd"]; // => chars == ["a", "b", "c", "d"]
let data = [1, 2, 3, 4, 5];
console.log(Math.max(...data)); // => 5

// Iterators can be used with destructuring assignment:

let purpleHaze = Uint8Array.of(255 , 0, 255, 128);
let [r, g, b, a] = purpleHaze; // a == 128

// When you iterate a Map object, the returned values are [key,
// value] pairs, which work well with destructuring assignment in a
// for/of loop:

let m = new Map([["one", 1], ["two", 2]]);
for(let [k,v] of m) console.log(k, v); // Logs "one 1" and "two 2"

// If you want to iterate just the keys or just the values rather than the
// pairs, you can use the keys() and values() methods:

[...m]; // => [["one", 1], ["two", 2]]: default iteration
[...m.entries()]; // => [["one", 1], ["two", 2]]: entries() method is the same
[...m.keys()]; // => ["one", "two"]: keys() method iterates just map keys
[...m.values()]; // => [1, 2]: values() method iterates just map values

/**
 * Finally, a number of built-in functions and constructors that are 
 * commonly used with Array objects are actually written (in ES6 and 
 * later) to accept arbitrary iterators instead. The Set() constructor is
 * one such API:
 */

// String are iterable, so  the two sets are the same:
new Set("abc"); // new Set(["a", "b", "c"])