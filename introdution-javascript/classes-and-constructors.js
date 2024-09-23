// Example 9-2. A Range class using a constructor
// This is a contructor function that initializes new Range objects.
// Note that it does not create or return the object. It just initializes this.
function Range(from, to) {
    // Store the start and end points (state) of this new range object.
    // These are nonhinherited properties that are unique to this object.
    this.from = from;
    this.to = to;
}
// All Range objects inherit from this object.
// Note that the property name must be "prototype" for this to work.
Range.prototype = {
    constructor: Range, // Explicitly set the constructor back-reference
    // Return true if x is in the range, false otherwise
    // This method works for textual and Date ranges as well as numeric.
    includes: function(x) { return this.from <= x && x <= this.to; },

    // A generator function that makes instaces of the class iterable.
    // Note that it only works for numeric ranges.
    [Symbol.iterator]: function*() {
        for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },

    // Return a string representation of the range
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};

// Here are example uses of this new Range class
let r = new Range(1,3); // Create a Range object; note the use of new
console.log(r.includes(2)); // => true: 2 is in the range
console.log(r.toString()); // => "(1...3)"
console.log([...r]); // => [1, 2, 3]; convert to an array via iterator

console.log(r instanceof Range); // => true: r inherits from Range.prototype

function Strange() {}
Strange.prototype = Range.prototype;
console.log(new Strange() instanceof Range); // => true
console.log(Range.prototype);