/**
 * The Symbol type was added to JavaScript in ES6, and one of the primary 
 * reasons for doing so was to safely add extensions to the language 
 * without breaking compatibility with code already deployed on the web. 
 * We saw an example of this in Chapter 12, where we learned that you can 
 * make a class iterable by implementing a method whose “name” is the 
 * Symbol Symbol.iterator. 
 * 
 * Symbol.iterator is the best-known example of the “well-known Symbols.” 
 * These are a set of Symbol values stored as properties of the Symbol() 
 * factory function that are used to allow JavaScript code to control 
 * certain low-level behaviors of objects and classes.
 */

// Symbol.iterator and Symbol.asyncIterator
/**
 * The Symbol.iterator and Symbol.asyncIterator Symbols allow objects or 
 * classes to make themselves iterable or asynchronously iterable.
 */

// Symbol.hasInstance
/**
 * we said that the righthand side must be a constructor function and 
 * that the  expression o instanceof f was evaluated by looking for the 
 * value f.prototype within the prototype chain of o. That is still true, 
 * but in ES6 and beyond, Symbol.hasInstance provides an alternative. In 
 * ES6, if the righthand side of instanceof is any object with a [Symbol.
 * hasInstance] method, then that method is invoked with the lefthand 
 * side value as its argument, and the return value of the method, 
 * converted to a boolean, becomes the value of the instanceof operator. 
 * And, of course, if the value on the righthand side does not have a 
 * [Symbol.hasInstance] method but is a function, then the instanceof 
 * operator behaves in its ordinary way.
 * 
 * Symbol.hasInstance means that we can use the instanceof operator to do 
 * generic type checking with suitably defined pseudotype objects. For 
 * example:
 */

// Define an object as a "type" we can use with instanceof
let unit8 = {
    [Symbol.hasInstance](x) {
        return Number.isInteger(x) && x >= 0 && x <= 255;
    }
};

console.log(128 instanceof unit8); // => true
console.log(256 instanceof unit8); // => false: too big
console.log(Math.PI instanceof unit8); // => false: not an integer

/**
 * Note that this example is clever but confusing because it uses a 
 * nonclass object where a class would normally be expected. It would be 
 * just as easy—and clearer to readers of your code—to write a isUint8() 
 * function instead of relying on this Symbol.hasInstance behavior.
 */

// Symbol.toStringTag
/**
 * If you invoke the toString() method of a basic JavaScript object, you get the string “[object Object]”:
 */
console.log({}.toString()); // => "[object Object]"

/**
 * If you invoke this same Object.prototype.toString() function as a method of instances of built-in types, you get some interesting results:
 */

console.log(Object.prototype.toString.call([])); // => "[object Array]"
console.log(Object.prototype.toString.call(/./)); // => "[object RegExp]"
console.log(Object.prototype.toString.call(() => {})); // => "[object Function]"
console.log(Object.prototype.toString.call("")); // => "[object String]"
console.log(Object.prototype.toString.call(0)); // => "[object Number]"
console.log(Object.prototype.toString.call(false)); // => "[object Boolean]"

/**
 * It turns out that you can use this Object.prototype.toString().call() 
 * technique with any JavaScript value to obtain the “class attribute” of 
 * an object that contains type information that is not otherwise 
 * available. The following classof() function is arguably more useful 
 * than the typeof operator, which makes no distinction between types of 
 * objects:
 */

function classof(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

console.log(classof(null)); // => "Null"
console.log(classof(undefined)); // => "Undefined"
console.log(classof(1)); // => "Number"
console.log(classof(10n**100n)); // => "BigInt"
console.log(classof("")); // => "String"
console.log(classof(false)); //  => "Boolean"
console.log(classof(Symbol())); // => "Symbol"
console.log(classof({})); // => "Object"
console.log(classof([])); // => "Array"
console.log(classof(/./)); // => "RegExp"
console.log(classof(() => {})); // => "Function"
console.log(classof(new Map())); // => "Map"
console.log(classof(new Set())); // => "Set"
console.log(classof(new Date())); // => "Date"

/**
 * Prior to ES6, this special behavior of the Object.prototype.toString() 
 * method was available only to instances of built-in types, and if you 
 * called this classof() function on an instance of a class you had 
 * defined yourself, it would simply return “Object”. In ES6, however, 
 * Object.prototype.toString() looks for a property with the symbolic 
 * name Symbol.toStringTag on its argument, and if such a property 
 * exists, it uses the property value in its output. This means that if 
 * you define a class of your own, you can easily make it work with 
 * functions like classof():
 */

class Range {
    get [Symbol.toStringTag]() { return "Range"; }
    // the rest of this calss is omitted here
}
let r =  new Range(1, 10);
console.log(Object.prototype.toString.call(r)); // => "[object Range]"
console.log(classof(r)); // => "Range"