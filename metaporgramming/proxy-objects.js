/**
 * The Proxy class, available in ES6 and later, is JavaScript’s most 
 * powerful metaprogramming feature. It allows us to write code that 
 * alters the fundamental behavior of JavaScript objects. The Reflect API 
 * described in §14.6 is a set of functions that gives us direct access 
 * to a set of fundamental operations on JavaScript objects. What the 
 * Proxy class does is allows us a way to implement those fundamental 
 * operations ourselves and create objects that behave in ways that are 
 * not possible for ordinary objects.
 * 
 * When we create a Proxy object, we specify two other objects, the 
 * target object and the handlers object:
 */
let target = {}, handlers = {};
let proxy1 = new Proxy(target, handlers);

/**
 * The resulting Proxy object has no state or behavior of its own. 
 * Whenever you perform an operation on it (read a property, write a 
 * property, define a new property, look up the prototype, invoke it as a 
 * function), it dispatches those operations to the handlers object or to 
 * the target object.
 * 
 * The operations supported by Proxy objects are the same as those 
 * defined by the Reflect API. Suppose that p is a Proxy object and you  
 * write delete p.x. The Reflect.deleteProperty() function has the same 
 * behavior as the delete operator. And when you use the delete operator 
 * to delete a property of a Proxy object, it looks for a deletePropert() 
 * method on the handlers object. If such a method exists, it invokes it. 
 * And if no such method exists, then the Proxy object performs the 
 * property deletion on the target object instead.
 * 
 * Proxies work this way for all of the fundamental operations: if an 
 * appropriate method exists on the handlers object, it invokes that 
 * method to perform the operation. And if that method does not exist on 
 * the handlers object, then the Proxy performs the fundamental operation 
 * on the target object. This means that a Proxy can obtain its behavior 
 * from the target object or from the handlers object. If the handlers 
 * object is empty, then the proxy is essentially a transparent wrapper 
 * around the target object:
 */

let t = { x: 1, y: 2 };
let p1 = new Proxy(t, {});
console.log(p1.x); // => 1
console.log(delete p1.y); // => true: delete property yof the proxy
console.log(t.y); // => undefined: this deletes it in the target too
p1.z = 3; // Defining a new property on the proxy
console.log(t.z); // => 3: defines the property on the targent

/**
 * This kind of transparent wrapper proxy is essentially equivalent to 
 * the underlying target object, which means that there really isn’t a 
 * reason to use it instead of the wrapped object. Transparent wrappers 
 * can be  useful, however, when created as “revocable proxies.” Instead 
 * of creating a Proxy with the Proxy() constructor, you can use the 
 * Proxy.revocable() factory function. This function returns an object 
 * that includes a Proxy object and also a revoke() function. Once you 
 * call the revoke() function, the proxy immediately stops working:
 */

function accessTheDatabase() { /* implementation omitted */ return 42; }
let {proxy, revoke} = Proxy.revocable(accessTheDatabase, {});

proxy() // => 42: The proxy gives access to the underlying target function
revoke(); // But that access can ve turned off whenever we want
// proxy(); // !TypeError: we can no longer call this function

/**
 * Note that in addition to demonstrating revocable proxies, the 
 * preceding code also demonstrates that proxies can work with target 
 * functions as well as target objects. But the main point here is that 
 * revocable proxies are a building block for a kind of code isolation, 
 * and you might use them when dealing with untrusted third-party 
 * libraries, for example. If you have to pass a function to a library 
 * that you don’t control, you can pass a revocable proxy instead and 
 * then revoke the proxy when you are finished with the library. This 
 * prevents the library from keeping a reference to your function and 
 * calling it at unexpected times. This kind of defensive programming is 
 * not typical in JavaScript programs, but the Proxy class at least makes 
 * it possible.
 * 
 * If we pass a non-empty handlers object to the Proxy() constructor, 
 * then we are no longer defining a transparent wrapper object and are 
 * instead implementing custom behavior for our proxy. With the right set 
 * of handlers, the underlying target object essentially becomes 
 * irrelevant.
 * 
 * In the following code, for example, is how we could implement an 
 * object that appears to have an infinite number of read-only properties,
 * where the value of each property is the same as the name of the 
 * property:
 */

// We use a Proxy to create an object that appears to have every
// possible property, with the value of each property equal to its name
let identity = new Proxy({}, {
    // Every property has its own name as its value
    get(o, name, target) { return name; },
    // Every property name is defined
    has(o, name) { return true; },
    // There are to many properties tp enumerate, so we just throw
    ownKeys(o) { throw new RangeError("Infinite number of properties"); },
    // All properties exist and are not writable, configurable or enumerable.
    getOwnPropertyDescriptor(o, name) {
        return {
            value: name,
            enumerable: false,
            writable:false,
            configurable: false
        };
    },
    // All properties are read-only so they can't be set 
    set(o, name, value, target) { return false; },
    // All  properties are non-configurable, so they can't be deleted
    deleteProperty(o, name) { return false; },
    // In effect, this means that the object is not extensible
    isExtensible(o) { return false; },
    // All properties are already defined on this object, so it couldn't
    // inherit anything even if it did have a prototype object.
    getPrototypeOf(o) { return null; },
    // The object is not extensible, so we can't change the prototype
    setPrototypeOf(o) { return false; },
});

console.log(identity.x); // => "x"
console.log(identity.toString); // => "toString"
console.log(identity[0]); // => "0"
identity.x = 1; // Setting properties has no effect
console.log(identity.x); // => "x"
// console.log(Object.keys(identity)); // !RangeError: can't list all the keys
// for(let p of identity) {}; // !RangeError

/**
 * Proxy objects can derive their behavior from the target object and 
 * from the handlers object, and the examples we have seen so far have 
 * used one object or the other. But it is typically more useful to 
 * define proxies that use both objects.
 */

/**
 * The following code, for example, uses Proxy to create a read-only 
 * wrapper for a target object. When code tries to read values from the 
 * object, those reads are forwarded to the target object normally. But 
 * if any code tries to modify the object or its properties, methods of 
 * the handler object throw a TypeError. A proxy like this might be 
 * helpful for writing tests: suppose you’ve written a function that 
 * takes an object argument and want to ensure that your function does 
 * not make anyattempt to modify the input argument. If your test passes 
 * in a read-only wrapper object, then any writes will throw exceptions 
 * that cause the test to fail:
 */

function readOnlyProxy(o) {
    function readonly() { throw new TypeError("Readonly"); }
    return new Proxy(o, {
        set: readonly,
        defineProperty: readonly,
        deleteProperty: readonly,
        setPrototypeOf: readonly,
    });
}

let o = { x: 1, y: 2 }; // Normal writable object
let p = readOnlyProxy(o); // Readonly version of it
console.log(p.x); // => 1: reading properties works
// p.x = 2; // !TypeError: can't change properties
// delete p.y // !TypeError: can't delete properties
// p.z = 3  // !TypeError: can't add properties
// p.__proto__ = {}; // !TypeError: can't change the prototype 

/**
 * Another technique when writing proxies is to define handler methods 
 * that intercept operations on an object but still delegate the 
 * operations to the target object. The functions of the Reflect API have 
 * exactly the same signatures as the handler methods, so they make it 
 * easy to do that kind of delegation.
 * 
 * Here, for example, is a proxy that delegates all operations to the 
 * target object but uses handler methods to log the operations:
 */

/*
* Return a Proxy object that wraps o, delegating all operations to
* that object after logging each operation. objname is a string that
* will appear in the log messages to identify the object. If o has own
* properties whose values are objects or functions, then if you query
* the value of those properties, you'll get a loggingProxy back, so that
* logging behavior of this proxy is "contagious".
*/
function loggingProxy(o, objname) {
    // Define handlers for our logging Proxy object.
    // Each handlers logs a message and then delegates to the target object.
    const handlers = {
        // This handler is a special case because for own properties
        // whose value is an object or function, it returns a proxy rather
        // than returning the value itself.
        get(target, property, receiver) {
            // Log the fet operation
            console.log(`Handler get(${objname},${property.toString()})`);

            // Use the Reflect API to get the property value
            let value = Reflect.get(target, property, receiver);

            // If the property is an own property of the target and 
            // the value is an object or function then return a Proxy for it.
            if (Reflect.ownKeys(target).includes(property) &&
                (typeof value === "object" || typeof value === "function")) {
                    return loggingProxy(value, `${objname}.${property.toString()}`);
                }

                // Otherwise return the value unmodified
                return value;
        },

        // There is nothing special about the following three methods:
        // they log the operation and delegate to the target object.
        // They are a special case simply so we can avoid logging the
        // receiver object which can cause infinite recursion.
        set(target, prop, value, receiver) {
            console.log(`Handler set(${objname},${prop.toString()},${value})`);
            return Reflect.set(target, prop, value, receiver);
        },
        apply(target, receiver, args) {
            console.log(`Handler ${objname}(${args})`);
            return Reflect.apply(target, receiver, args);
        },
        construct(target, args, receiver) {
            console.log(`Handler ${objname}(${args})`);
            return Reflect.construct(target, args, receiver);
            
        }
    };

    // We can automatically generate the rest of the handlers.
    // Metaprogramming FTW!
    Reflect.ownKeys(Reflect).forEach(handlerName => {
        if (!(handlerName in handlers)) {
            handlers[handlerName] = function(target, ...args) {
                // Log the operation
                console.log(`Handler ${handlerName}(${objname},${args})`);
                // Delegate the operation
                return Reflect[handlerName](target, ...args);
            };
        }
    });
    // Return a proxy for the object using these logging handlers
    return new Proxy(o, handlers);
}

/**
 * The loggingProxy() function defined earlier creates proxies that log 
 * all of the ways they are used. If you are trying to understand how an 
 * undocumented function uses the objects you pass it, using a logging 
 * proxy can help.
 * 
 * Consider the following examples, which result in some genuine insights 
 * about array iteration:
 */

//  Define an array of data and object with a function property
let data = [10,20];
let methods = { square: x => x * x };

// Create logging proxies for the array and the object
let proxyData = loggingProxy(data, "data");
let proxyMethods = loggingProxy(methods, "methods");

// Suppose we want to understand how the Array.map() method works
console.log(data.map(methods.square)); // => [100, 400]

// First, let's try it with a logging Proxy array
console.log(proxyData.map(methods.square)); // => [100, 400]
// It produces this output:
// Handler get(data,map)
// Handler get(data,length)
// Handler get(data,constructor)
// Handler has(data,0)
// Handler get(data,0)
// Handler has(data,1)
// Handler get(data,1)

// Now lets try with a proxy methods object
console.log(data.map(proxyMethods.square)); // [100, 400]
// Log output:
// Handler get(methods,square)
// Handler methods.square(10,0,10,20)
// Handler methods.square(20,1,10,20)

// Finally, let's use a logging proxy to learn about the iteration protocol
for(let x of proxyData) console.log("Datum", x);
// Log output:
// Handler get(data,Symbol(Symbol.iterator))
// Handler get(data,length)
// Handler get(data,0)
// Datum 10
// Handler get(data,length)
// Handler get(data,1)
// Datum 20
// Handler get(data,length)

/**
 * From the first chunk of logging output, we learn that the Array.map() 
 * method explicitly checks for the existence of each array element 
 * (causing the has() handler to be invoked) before actually reading the 
 * element value (which triggers the get() handler). This is presumably 
 * so that it can distinguish nonexistent array elements from elements 
 * that exist but are undefined.
 * 
 * The second chunk of logging output might remind us that the function 
 * we pass to Array.map() is invoked with three arguments: the element’s 
 * value, the element’s index, and the array itself. (There is a problem 
 * in our logging output: the Array.toString() method does not include 
 * square brackets in its output, and the log messages would be clearer 
 * if they were included in the argument list (10,0,[10,20]).)
 * 
 * The third chunk of logging output shows us that the for/of loop works 
 * by looking for a method with symbolic name [Symbol.iterator]. It also 
 * demonstrates that the Array class’s implementation of this iterator 
 * method is careful to check the array length at every iteration and 
 * does not assume that the array length remains constant during the 
 * iteration.
 */