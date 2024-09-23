/**
 * The Proxy handler API allows us to define objects with major 
 * inconsistencies, however, and in this case, the Proxy class itself 
 * will prevent us from creating Proxy objects that are inconsistent in a 
 * bad way. At the start of this section, we described proxies as objects 
 * with no behavior of their own because they simply forward all 
 * operations to the handlers object and the target object. But this is 
 * not entirely true: after forwarding an operation, the Proxy class 
 * performs some sanity checks on the result to ensure important 
 * JavaScript invariants are not being violated. If it detects a 
 * violation, the proxy will throw a TypeError instead of letting the 
 * operation proceed. 
 * 
 * As an example, if you create a proxy for a non-extensible object, the 
 * proxy will throw a TypeError if the isExtensible() handler ever 
 * returns true:
 */

let target = Object.preventExtensions({});
let proxy = new Proxy(target, { isExtensible() { return true; }});
Reflect.isExtensible(proxy); // !TypeError: invariant violation

/**
 * Relatedly, proxy objects for non-extensible targets may not have a 
 * getPrototypeOf() handler that returns anything other than the real 
 * prototype object of the target. Also, if the target object has 
 * nonwritable, nonconfigurable properties, then the Proxy class will 
 * throw a TypeError if the get() handler returns anything other than the 
 * actual value:
 */

let target1 = Object.freeze({x: 1});
let proxy1 = new Proxy(target, { get() {return 99; }});
proxy.x; // !TypeError: value returned by get() doesn't match target

/**
 * Proxy enforces a number of additional invariants, almost all of them 
 * having to do with non-extensible target objects and nonconfigurable 
 * properties on the target object.
 */