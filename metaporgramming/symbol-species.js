/**
 * Prior to ES6, JavaScript did not provide any real way to create robust 
 * subclasses of built-in classes like Array. In ES6, however, you can 
 * extend any built-in class simply by using the class and extends keywords.
 */

// A trivial Array subclass that adds  getters for the first and last elements
class EZArray extends Array {
    get first() { return this[0]; }
    get last() { return this[this.length-1]; }
}

let e = new EZArray(1,2,3);
let f = e.map(x => x * x);
console.log(e.last); // => 3: the last element of EZArray e
console.log(f.last); // => 9: f is also an EZArray with a last property

/**
 * Array defines methods concat(), filter(), map(), slice(), and splice
 * (), which return arrays. When we create an array subclass like EZArray 
 * that inherits these methods, should the inherited method return 
 * instances of Array or instances of EZArray? Good arguments can be made 
 * for either choice, but the ES6 specification says that (by default) 
 * the five array-returning methods will return instances of the subclass.
 */

/**
 * Here's how it works:
 * 
 * - In ES6 and later, the Array() constructor has a property with the 
 * symbolic name Symbol.species. (Note that this Symbol is used as the 
 * name of a property of the constructor function. Most of the other 
 * well-known Symbols described here are used as the name of methods of a 
 * prototype object.)
 * 
 * - When we create a subclass with extends, the resulting subclass 
 * constructor inherits properties from the superclass constructor. (This 
 * is in addition to the normal kind of inheritance, where instances of 
 * the subclass inherit methods of the superclass.) This means that the 
 * constructor for every subclass of Array also has an inherited property 
 * with name Symbol.species. (Or a subclass can define its own property 
 * with this name, if it wants.)
 * 
 * - Methods like map() and slice() that create and return new arrays are 
 * tweaked slightly in ES6 and later. Instead of just creating a regular 
 * Array, they (in effect) invoke new this.constructor[Symbol.species]() 
 * to create the new array.
 */

/**
 * Now here’s the interesting part. Suppose that Array[Symbol.species] 
 * was just a regular data property, defined like this:
 */

Array[Symbol.species] = Array;

/**
 * In that case, then subclass constructors would inherit the Array() 
 * constructor as their “species,” and invoking map() on an array 
 * subclass would return an instance of the superclass rather than an 
 * instance of the subclass. That is not how ES6 actually behaves, 
 * however. The reason is that Array[Symbol.species] is a readonly 
 * accessor property whose getter function simply returns this. Subclass 
 * constructors inherit this getter function, which means that by 
 * default, every subclass constructor is its own “species.”
 * 
 * Sometimes this default behavior is not what you want, however. If you 
 * wanted the array-returning methods of EZArray to return regular Array 
 * objects, you just need to set EZArray[Symbol.species] to Array. But 
 * since the inherited property is a read-only accessor, you can’t just 
 * set it with an assignment operator. You can use defineProperty(), 
 * however:
 */

EZArray[Symbol.species] = Array; // Attempt to set a read-only property fails

// Instead we can use defineProperty():
Object.defineProperty(EZArray, Symbol.species, { value: Array });

/**
 * The simplest option is probably to explicitly define your own Symbol.
 * species getter when creating the subclass in the first place:
 */

class EZArray1 extends Array {
    static get [Symbol.species]() { return Array; }
    get first() { return this[0]; }
    get last() { return this[this.length-1]; }
}

let e1 = new EZArray1(1,2,3);
let f1 = e1.map(x => x - 1);
console.log(e1.last); // => 3
console.log(f1.alst); // => undefined: f1 is a regular array with no last getter

/**
 * Creating useful subclasses of Array was the primary use case that 
 * motivated the introduction of Symbol.species, but it is not the only 
 * place that this well-known Symbol is used. Typed array classes use the 
 * Symbol in the same way that the Array class does. Similarly, the 
 * slice() method of ArrayBuffer looks at the Symbol.species property of 
 * this.constructor instead of simply creating a new ArrayBuffer. And 
 * Promise methods like then() that return new Promise objects create 
 * those objects via this species protocol as well. Finally, if you find 
 * yourself subclassing Map (for example) and defining methods that 
 * return new Map objects, you might want to use Symbol.species yourself 
 * for the benefit of subclasses of your subclass.
 */