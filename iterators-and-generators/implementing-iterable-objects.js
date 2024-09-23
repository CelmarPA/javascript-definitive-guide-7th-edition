/**
 * Iterable objects are so useful in ES6 that you should consider making 
 * your own datatypes iterable whenever they represent something that 
 * can be iterated.
 * In order to make a class iterable, you must implement a method whose 
 * name is the Symbol Symbol.iterator. That method must return an 
 * iterator object that has a next() method. And the next() method must 
 * return an iteration result object that has a value property and/or a 
 * boolean done property. Example 12-1 implements an iterable Range class 
 * and demonstrates how to create iterable, iterator, and iteration 
 * result objects.
 */

// Example 12-1. An iterable numeric Range class
/**
 * A range object represents a range of numbers {x: from <= x <= to}
 * Range defines a has() method for testing wheher a  given number is a
 * member fo the range. Range is iterable and iterates all integers 
 * within the range.
 */
class Range {
    constructor (from, to) {
        this.from = from;
        this.to = to;
    }

    // Make a Range act like a Set of numbers
    has(x) { return typeof x === "number" && this.from <= x && x <= this.to; }

    // Return string representation of the range using set notation
    toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to} }`; }

    // Make a Range iterable by returning an iterator object.
    // Note that the name of this method is a special symbol, not a string.
    [Symbol.iterator]() {
        // Each iterator instance must iterato the range independently of 
        // others. So we need to state viable to track our location in 
        // the interation. We start at the first integer >= from.
        let next = Math.ceil(this.from); // This is the next value we return
        let last = this.to; // We won't return anything > this
        return { // This is the iterator object
            // This next() method is what make this an iterator object.
            // It must return an iterator result object.
            next() {
                return (next <= last) // If we haven't returned last value yet
                    ? { value: next++ } // return next value and increment it
                    : { done: true }; // otherwise indicate that we're done.
            },

            // As a convenience, we make the iterator itself iterable.
            [Symbol.iterator]() { return this; }
        };
    }
}

for(let x of new Range(1, 10)) console.log(x); // Logs numbers 1 to 10

console.log([...new Range(-2, 2)]); // => [ -2, -1, 0, 1, 2 ]

/**
 * In addition to making your classes iterable, it can be quite useful to 
 * define functions that return iterable values. Consider these 
 * iterable-based alternatives to the map() and filter() methods of 
 * JavaScript arrays:
 */

// Return an iterable object that iterates the result of applying f()
// to each value from the source iterable
function map(iterable, f) {
    let iterator = iterable[Symbol.iterator]();
    return { // This object is both iterator and iterable
        [Symbol.iterator]() { return this; },
        next() {
            let v = iterator.next();
            if (v.done) {
                return v;
            } else {
                return { value: f(v.value) };
            }
        }
    };
}

// Map a range of itegers to their squares and covert to an array
console.log([...map(new Range(1, 4), x => x * x)]); // => [ 1, 4, 9, 16 ]

// Return an iterable object that filters  the specified  iterable,
// iterating only those elements for which the predicate returns true
function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();
    return { // This object is both iterator and iterable
        [Symbol.iterator]() { return this; },
        next() {
            for(;;) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v;
                }
            }
        }
    };
}

// Filter a range so we're left with only even numbers
console.log([...filter(new Range(1, 10), x => x % 2 === 0)]); // => [ 2, 4, 6, 8, 10 ]

/**
 * One key feature of iterable objects and iterators is that they are 
 * inherently lazy: when computation is required to compute the next 
 * value, that computation can be deferred until the value is actually 
 * needed. Suppose, for example, that you have a very long string of text 
 * that you want to tokenize into space-separated words. You could simply 
 * use the split() method of your string, but if you do this, then the 
 * entire string has to be processed before you can use even the first 
 * word. And you end up allocating lots of memory for the returned array 
 * and all of the strings within it. Here is a function that allows you 
 * to lazily iterate the words of a string without keeping them all in 
 * memory at once (in ES2020, this function would be much easier to 
 * implement using the iterator-returning matchAll() method:
 */

function words(s) {
    var r = /\s+|$/g; // Match one or more spaces or end
    r.lastIndex = s.match(/[^ ]/).index; // Start matching at first nonspace
    return { // Return an iterable iterator object
        [Symbol.iterator]() {
            return this;
        },
        next() { // This makes us an iterator
            let start = r.lastIndex; // Resume where the last match ended
            if (start < s.length) { // If we're not done
                let match = r.exec(s); // Match the next word boundary
                if(match) { // If we found one returns the word
                    return { value: s.substring(start, match.index) };
                }
            }
            return { done: true }; // Otherwise, say that we're done
        }
    };
}

console.log([...words(" abc def ghi! ")]); // => ["abc", "def", "ghi!"]
