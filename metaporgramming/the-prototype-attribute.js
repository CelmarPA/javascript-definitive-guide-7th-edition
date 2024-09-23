/**
 * An object’s prototype attribute specifies the object from which it 
 * inherits properties. This is such an important attribute that we 
 * usually simply say “the prototype of o" rather than “the prototype 
 * attribute of o.” Remember also that when prototype appears in code 
 * font, it refers to an ordinary object property, not to the prototype 
 * attribute.
 * The prototype attribute is set when an object is created. Objects 
 * created from object literals use Object.prototype as their  prototype. 
 *  Objects created with new use the value of the prototype  property of 
 * their constructor function as their prototype. And objects created 
 * with Object.create() use the first argument to that function (which 
 * may be null) as their prototype.
 * 
 * You can query the prototype of any object by passing that object to 
 * Object.getPrototypeOf():
 */

Object.getPrototypeOf({}); // Object.prototype
Object.getPrototypeOf([]); // Array.prototype
Object.getPrototypeOf(() => {}); // Function.prototype

/**
 * To determine whether one object is the prototype of (or is part of the 
 * prototype chain of) another object, use the isPrototypeOf() method:
 */

let p = {x: 1}; // Define a prototype object.
let o = Object.create(p); // Create an object with that prototype
console.log(p.isPrototypeOf(o)); // => true: o inherits from p
console.log(Object.prototype.isPrototypeOf(p)); // => true: p inherits from Object.prototype
console.log(Object.prototype.isPrototypeOf(o)); // true: o does too

/**
 * Note that isPrototypeOf() performs a function similar to the 
 * instanceof operator.
 * 
 * The prototype attribute of an object is set when the object is created 
 * and normally remains fixed. You can, however, change the prototype of 
 * an object with Object.setPrototypeOf():
 */

let ob = {x: 1};
let op = {y: 2};
Object.setPrototypeOf(ob, op); // Set the prototype of o to p 
console.log(ob.y); // => 2
let a = [1, 2, 3];
Object.setPrototypeOf(a, op); // Set the prototype of array a to p
console.log(a.join) // undefined: a no longer has a join method

/**
 * There is generally no need to ever use Object.setPrototypeOf(). 
 * JavaScript implementations may make aggressive optimizations based on 
 * the assumption that the prototype of an object is fixed and 
 * unchanging. This means that if you ever call Object.setPrototypeOf(), 
 * any code that uses the altered objects may run much slower than it 
 * would normally.
 */

/**
 * Some early browser implementations of JavaScript exposed the prototype 
 * attribute of an object through the __proto__ property (written with 
 * two underscores at the start and end). This has long since been 
 * deprecated, but enough existing code on the web depends on __proto__ 
 * that the ECMAScript standard mandates it for all JavaScript 
 * implementations that run in web browsers. (Node supports it, too, 
 * though the standard does not require it for Node.) In modern 
 * JavaScript, __proto__ is readable and writeable, and you can (though 
 * you shouldn’t) use it as an alternative to Object.getPrototypeOf() and 
 * Object.setPrototypeOf(). One interesting use of __proto__, however, is 
 * to define the prototype of an object literal:
 */

let p1 = {z: 3};
let o1 = {
    x: 1,
    y: 2,
    __proto__: p1
};
console.log(o1.z); // => 3: o inherits from p