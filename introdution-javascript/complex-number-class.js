// Example 9-4. Complex.js: a complex number class
/**
 * Instances of this Complex class represent complex numbers.
 * Recall that a complex number is the sum of a real number an
 * imaginary number and that the imaginary number i is the square root of -1.
 */
class Complex {
    // Once class field declarations are standardized, we could declare
    // private fields to hold the real and imaginary parts of a complex number
    // here, with code like this:
    // 
    // #r = 0;
    // #i = 0;

    // This constructor function defines the instace fields r and i on every
    // instace it creates. These fields hold the real and imaginary parts of 
    //the complex number: they are the state of the object.
    constructor(real, imaginary) {
        this.r = real; // This field holds the real part of the number.
        this.i = imaginary; // This field holds the imaginary part.
    }

    // Here are two instance methods for addition and multiplication
    // of complex numbers. If c and d are instances of this class, we
    // might write c.plus(d) or d.times(c)
    plus(that) {
        return new Complex(this.r + that.r, this.i + that.i);
    }
    times(that) {
        return new Complex(this.r * that.r - this.i * that.i,
                           this.r * that.i + this.i * that.r);
    }

    // And hhere are static variants of the complex arthemetic methods.
    // We could write Complex.sum(c,d) and Complex.product(c,d)
    static sum(c, d) { return c.plus(d); }
    static product(c, d) { return c.times(d); }

    // There are some instance methods that are defined as getters
    // so they're used like fields. The real and imaginary getters would 
    // be useful if we were using private fields this.#r and this.#i
    get real() { return this.r; }
    get imaginary() { return this.i; }
    get magnitude() { return Math.hypot(this.r, this.i); }

    // Classes should almost always have a toString() method
    toString() { return `{${this.r}, ${this.i}}`; }

    // It is oftern useful to define a method for testing wheter
    // two instances of your class represent the same value
    equals(that) {
        return that instanceof Complex &&
            this.r === that.r &&
            this.i === that.i;
    }

    // Once static fields are supported inside class bodies, we could
    // define a useful Complex.ZERO constant like this:
    // static ZERO = new Complex(0,0);
}

// Here are some class field that hold useful predefined complex numbers.
Complex.ZERO = new Complex(0,0);
Complex.One = new Complex(1,0);
Complex.I = new Complex(0,1);

let c = new Complex(2 ,3); // Create a new object with the constructor
let d = new Complex(c.i, c.r); // Use instance fields of c 
console.log(c.plus(d).toString()); // => "{5,5}"; use instance methods
console.log(c.magnitude); // => Math.hypot(2,3); use a getter function
console.log(Complex.product(c, d)); // new Complex(0, 13); a static method
console.log(Complex.ZERO.toString()); // => "{0,0}"; a static property

// Return a complex number that is the complex conjugate of this one.
Complex.prototype.conj = function() { return new 
Complex(this.r, -this.i); };

//  If the new String method startsWith() is not already defined...
if (!String.prototype.startsWith) {
    // ...then define it like this using the older indexOf() method.
    String.prototype.startsWith = function(s) {
        return this.indexOf(s) ===0;
    };
}

// Invoke the function f this many times, passing the iteration number
// For example, to proint "hello" 3 times:
// let n = 3;
// n.times(i => { console.log(`hello ${i}`); });
Number.prototype.times = function(f, context) {
    let n = this.valueOf();
    for(let i = 0; i < n; i++) f.call(context, i);
};