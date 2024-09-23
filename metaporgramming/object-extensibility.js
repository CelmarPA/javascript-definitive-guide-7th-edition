/**
 * The extensible attribute of an object specifies whether new properties 
 * can be added to the object or not. Ordinary JavaScript objects are 
 * extensible by default, but you can change that.
 * 
 * To determine whether an object is extensible, pass it to Object.
 * isExtensible(). To make an object non-extensible, pass it to Object.
 * preventExtensions(). Once you have done this, any attempt to add a new 
 * property to the object will throw a TypeError in strict mode and 
 * simply fail silently without an error in non-strict mode. In addition, 
 * attempting to change the prototype of a non-extensible object will 
 * always throw a TypeError.
 * 
 * Note that there is no way to make an object extensible again once you 
 * have made it non-extensible. Also note that calling Object.
 * preventExtensions() only affects the extensibility of the object 
 * itself. If new properties are added to the prototype of a 
 * nonextensible object, the non-extensible object will inherit those new 
 * properties.
 * 
 * The purpose of the extensible attribute is to be able to “lock down” 
 * objects into a known state and prevent outside tampering. The 
 * extensible attribute of objects is often used in conjunction with the 
 * configurable and writable attributes of properties, and JavaScript 
 * defines functions that make it easy to set these attributes together:
 * 
 * - Object.seal() works like Object.preventExtensions(), but in addition 
 * tomaking the object non-extensible, it also makes all of the own 
 * properties of that object nonconfigurable. This means that new 
 * properties cannot be added to the object, and existing properties 
 * cannot be deleted or configured. Existing properties that are writable 
 * can still be set, however. There is no way to unseal a sealed object. 
 * You can use Object.isSealed() to determine whether an object is sealed.
 * 
 * - Object.freeze() locks objects down even more tightly. In addition to 
 * making the object non-extensible and its properties nonconfigurable, 
 * it also makes all of the object’s own data properties read-only. (If 
 * the object has accessor properties with setter methods, these are not 
 * affected and can still be invoked by assignment to the property.) Use 
 * Object.isFrozen() to determine if an object is frozen.
 * 
 * It is important to understand that Object.seal() and Object.freeze() 
 * affect only the object they are passed: they have no effect on the 
 * prototype of that object. If you want to thoroughly lock down an 
 * object, you probably need to seal or freeze the objects in the 
 * prototype chain as well. Object.preventExtensions(), Object.seal(), 
 * and Object.freeze() all return the object that they are passed, which 
 * means that you can use them in nested function invocations:
 */

// Create a sealed object whit a frozen prototype and a non-enumerable property
let o = Object.seal(Object.create(Object.freeze({x: 1}),
                                    {y: {value: 2, writable: true}}));

/**
 * If you are writing a JavaScript library that passes objects to 
 * callback functions written by the users of your library, you might use 
 * Object.freeze() on those objects to prevent the user’s code from 
 * modifying them. This is easy and convenient to do, but there are 
 * tradeoffs: frozen objects can interfere with common JavaScript testing 
 * strategies, for example.
 */