// A trivial  Array subclass that adds getters for the first and last elements.
class EZArray extends Array {
    get first() { return this[0]; }
    get last() { return this[this.length - 1];}
}

let a = new EZArray();
console.log(a instanceof EZArray); // => true: a is subclass instance
console.log(a instanceof Array); // => true: a is also a superclass instance.
console.log(a.push(1,2,3,4)); // a.length == 4; we can use inherited methods
console.log(a.pop()); // => 4: another inherited method
console.log(a.first); // => 1: first getter defined by subclass
console.log(a.last); // => 3: last getter defubed by subclass
console.log(a[1]); // => 2: regular array acess syntax still works.
console.log(Array.isArray(a)); // => true: subclass instance really is an array
console.log(EZArray.isArray(a)); // => true: subclass inherits static methots, too!

// EZArray inherits instance methods because EZArray.prototype
// inheritsfrom Array.prototype
console.log(Array.prototype.isPrototypeOf(EZArray.prototype)); // => true

// And EZArray inherits static methods and properties because
// EZArray inherits from Array. This is a special feature of the
// extends keyword and is not possible before ES6.
console.log(Array.isPrototypeOf(EZArray)) // => true