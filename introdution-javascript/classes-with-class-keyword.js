// Example 9-3. The Range class rewritten using class
class Range {
    constructor(from, to) {
        // Store the start and end points (state) of this new range object.
        // These are noninherited properties that are unique to this object.
        this.from = from;
        this.to = to;
    }

    // Return true if x is in the range, false otherwise
    // This method works for textual and Date ranges as well as numeric.
    includes(x) { return this.from <= x && x <= this.to; }

    // A generator function that makes instances fo the class iterable.
    // Note that it only works for numeric ranges.
    *[Symbol.iterator]() {
        for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    }

    // Return a string representation of ther range
    toString() { return `(${this.from}...${this.to})`; }

    static parse(s) {
        let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
        if (!matches) {
            throw new TypeError(`Cannot parse Range from
            "${s}".`)
        }
        return new Range(parseInt(matches[1]),
    parseInt(matches[2]));
    }
}

// Here are example uses of this new Range class
let r = new Range(1,3); // Create a Range object
console.log(r.includes(2)); // => true: 2 is in the range
console.log(r.toString()); // => "(1...3)"
console.log([...r]); // => [1, 2, 3]; convert to an array via iterator

// A Span is like a Range, but instead of initializing it with
// a start and an end, we initialize it with a start and a length
class Span extends Range {
    constructor(start, length) {
        if (length >= 0) {
            super(start, start + length);
        } else {
            super(start + length, start);
        }
    }
}

let square = function(x) { return x * x; };
console.log(square(3)); // => 9

let Square = class {constructor(x) { this.area = x * x; }};
console.log(new Square(3).area); // => 9

let r1 = Range.parse('(1...10)'); // Returns a new Range object
r1.parse('(1...10)') // TypeError: r.parse is not a function