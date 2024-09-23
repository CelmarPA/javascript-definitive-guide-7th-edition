/**
 * The Array method concat() is one of the methods described in the  
 * previous section that uses Symbol.species to determine what 
 * constructor to use for the returned array. But concat() also uses 
 * Symbol.isConcatSpreadable. Recall from §7.8.3 that the concat() method 
 * of an array treats its this value and its array arguments differently 
 * than its nonarray arguments: nonarray arguments are simply appended to 
 * the new array, but the this array and any array arguments are 
 * flattened or “spread” so that the elements of the array are 
 * concatenated rather than the array argument itself.
 * 
 * Before ES6, concat() just used Array.isArray() to determine whether to 
 * treat a value as an array or not. In ES6, the algorithm is  changed 
 * slightly: if the argument (or the this value) to concat() is an object 
 * and has a property with the symbolic name Symbol.isConcatSpreadable, 
 * then the boolean value of that property is used to determine whether 
 * the argument should be “spread.” If no such property exists, then 
 * Array.isArray() is used as in previous versions of the language.
 */

/**
 * There are two cases when you might want to use this Symbol:
 * 
 * - If you create an Array-like object and want it to behave like a real
 * array when passed to concat(), you can simply add the symbolic
 * property to your object:  
 */

let arraylike = {
    length: 1,
    0: 1,
    [Symbol.isConcatSpreadable]: true
};
console.log([].concat(arraylike)); // => [1]: (would be [[1]] if not spread)

/**
 * - Array subclasses are spreadable by default, so if you are defining 
 * an array subclass that you do not want to act like an array when used 
 * with concat(), then you can add a getter like this to your subclass:
 */

class NonSpreadableArray extends Array {
    get [Symbol.isConcatSpreadable]() { return false; }
}

let a = new NonSpreadableArray(1,2,3);
console.log([].concat(a).length); // 1; (would be 3 elements long if a was spread)