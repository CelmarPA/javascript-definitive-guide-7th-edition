// Example 9-2. A Range class using a constructor
// This is a constructor function that initializes new Range objects.
// Note that it does not create or return the object. It just initializes this.
function Range(from, to) {
// Store the start and end points (state) of this new range object.
// These are noninherited properties that are unique to this object.
    this.from = from;
    this.to = to;
}
// All Range objects inherit from this object.
// Note that the property name must be "prototype" for this to work.
Range.prototype = {
// Return true if x is in the range, false otherwise
// This method works for textual and Date ranges as well as numeric.
    includes: function(x) { return this.from <= x && x <=
this.to; },
// A generator function that makes instances of the class   iterable.
// Note that it only works for numeric ranges.
    [Symbol.iterator]: function*() {
        for(let x = Math.ceil(this.from); x <= this.to; x++)
yield x;
},
// Return a string representation of the range
    toString: function() { return "(" + this.from + "..." +
this.to + ")"; }
};
// Here are example uses of this new Range class
let r = new Range(1,3); // Create a Range object; note the use of new
r.includes(2) // => true: 2 is in the range
r.toString() // => "(1...3)"
console.log([...r]); // => [1, 2, 3]; convert to an array via iterator

// Example 9-5. Span.js: a simple subclass of Range
// This is the constructor function for our subclass
function Span(start, span) {
    if (span >= 0) {
        this.from = start;
        this.to = start + span;
    } else {
        this.to = start;
        this.from = start + span;
    }
}

// Ensure that the Span prototype inherits from the Range prototype
Span.prototype = Object.create(Range.prototype);

// We don't want to inherit Range.prototype.constructor, so we
// define our own contructor property.
Span.prototype.contructor = Span;

// By defining its own toString() method, Span overrides the
// toString() method that it would otherwise inherit from Range.
Span.prototype.toString = function() {
    return `(${this.from}... +${this.to - this.from})`;
};
