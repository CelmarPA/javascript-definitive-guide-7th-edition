/**
 * The Reflect object is not a class; like the Math object, its 
 * properties simply define a collection of related functions. These 
 * functions, added in ES6, define an API for “reflecting upon” objects 
 * and their properties. There is little new functionality here: the 
 * Reflect object defines a convenient set of functions, all in a single 
 * namespace, that mimic the behavior of core language syntax and 
 * duplicate the features of various pre-existing Object functions. 
 * Although the Reflect functions do not provide any new features, they 
 * do group the features together in one convenient API. And, 
 * importantly, the set of Reflect functions maps one-to-one with the set 
 * of Proxy handler methods.
 */

/**
 * The Reflect API consists of the following functions:
 * 
 * Reflect.apply(f, o, args): This function invokes the function f as a 
 * method of o (or invokes it as a function with no this value if o is 
 * null) and passes the values in the args array as arguments. It is 
 * equivalent to f.apply(o, args).
 * 
 * Reflect.construct(c, args, newTarget): This function invokes the 
 * constructor c as if the new keyword had been used and passes the 
 * elements of the array args as arguments. If the optional newTarget 
 * argument is specified, it is used as the value of new.target within 
 * the constructor invocation. If not specified, then the new.target 
 * value will be c.
 * 
 * Reflect.defineProperty(o, name, descriptor): This function defines a 
 * property on the object o, using name (a string or symbol) as the name 
 * of the property. The Descriptor object should define the value (or 
 * getter and/or setter) and attributes of the property. Reflect.
 * defineProperty() is very similar to Object.defineProperty() but 
 * returns true on success and false on failures. 
 * (Object.defineProperty() returns o on success and throws TypeError on 
 * failure.)
 * 
 * Reflect.deleteProperty(o, name): This function deletes the property 
 * with the specified string or symbolic name from the object o, 
 * returning true if successful (or if no such property existed) and 
 * false if the property could not be deleted. Calling this function is 
 * similar to writing delete o[name].
 * 
 * Reflect.get(o, name, receiver): This function returns the value of the 
 * property of o with the specified name (a string or symbol). If the 
 * property is an accessor method with a getter, and if the optional 
 * receiver argument is specified, then the getter function is called as 
 * a method of receiver instead of as a method of o. Calling this 
 * function is similar to evaluating o[name].
 * 
 * Reflect.getOwnPropertyDescriptor(o, name): This function returns a 
 * property descriptor object that describes the attributes of the 
 * property named name of the object o, or returns undefined if no such 
 * property exists. This function is nearly  identical to Object.
 * getOwnPropertyDescriptor(), except that the Reflect API version of the 
 * function requires that the first argument be an object and throws 
 * TypeError if it is not.
 * 
 * Reflect.getPrototypeOf(o): This function returns the prototype of 
 * object o or null if the object has no prototype. It throws a TypeError 
 * if o is a primitive value instead of an object. This function is 
 * almost identical to Object.getPrototypeOf() except that Object.
 * getPrototypeOf() only throws a TypeError for null and undefined 
 * arguments and coerces other primitive values to their wrapper objects.
 * 
 * Reflect.has(o, name): This function returns true if the object o has a 
 * property with the specified name (which must be a string or a symbol). 
 * Calling this function is similar to evaluating name in o.
 * 
 * Reflect.isExtensible(o): This function returns true if the object o is 
 * extensible and false if it is not. It throws a TypeError if o 
 * is not an object. Object.isExtensible() is similar but simply returns 
 * false when passed an argument that is not an object.
 * 
 * Reflect.ownKeys(o): This function returns an array of the names of the 
 * properties of the object o or throws a TypeError if o is not an 
 * object. The names in the returned array will be strings and/or 
 * symbols. Calling this function is similar to calling Object.
 * getOwnPropertyNames() and Object.getOwnPropertySymbols() and combining 
 * their results.
 * 
 * Reflect.preventExtensions(o): This function sets the extensible 
 * attribute of the object o to false and returns true to 
 * indicate success. It throws a TypeError if o is not an object. Object.
 * preventExtensions() has the same effect but returns o instead of true 
 * and does not throw TypeError for nonobject arguments.
 * 
 * Reflect.set(o, name, value, receiver): This function sets the property 
 * with the specified name of the object o to the specified value. It 
 * returns true on success and false on failure (which can happen if the 
 * property is read-only). It throws TypeError if o is not an object. If 
 * the specified property is an accessor property with a setter function, 
 * and if the optional receiver argument is passed, then the setter will 
 * be invoked as a method of receiver instead of being invoked as a 
 * method of o. Calling this function is usually the same as evaluating o
 * [name] = value.
 * 
 * Reflect.setPrototypeOf(o, p): This function sets the prototype of the 
 * object o to p, returning true on success and false on failure (which 
 * can occur if o is not extensible or if the operation would cause a 
 * circular prototype chain). It throws a TypeError if o is not an object 
 * or if p is neither an object nor null. Object.setPrototypeOf() is 
 * similar, but returns o on success and throws TypeError on failure. 
 * Remember that calling either of these functions is likely to make your 
 * code slower by disrupting JavaScript interpreter optimizations.
 */