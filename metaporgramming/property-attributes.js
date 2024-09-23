/**
 * The properties of a JavaScript object have names and values, of 
 * course, but each property also has three associated attributes that 
 * specify how that property behaves and what you can do with it:
 * 
 * - The writable attribute specifies whether or not the value of a property can change.
 * 
 * - The enumerable attribute specifies whether the property is 
 * enumerated by the for/in loop and the Object.keys() method.
 * 
 * - The configurable attribute specifies whether a property can be 
 * deleted and also whether the property’s attributes can be changed.
 * 
 * Properties defined in object literals or by ordinary assignment to an 
 * object are writable, enumerable, and configurable. But many of the 
 * properties defined by the JavaScript standard library are not.
 * 
 * This section explains the API for querying and setting property
 * attributes. This API is particularly important to library authors 
 * because:
 * 
 * - It allows them to add methods to prototype objects and make them 
 * non-enumerable, like built-in methods.
 * 
 * - It allows them to “lock down” their objects, defining properties 
 * that cannot be changed or deleted.
 * 
 * Recall that while “data properties” have a value, “accessor 
 * properties” have a getter and/or a setter method instead. For the 
 * purposes of this section, we are going to consider the getter and 
 * setter methods of an accessor property to be property attributes. 
 * Following this logic, we’ll even say that the value of a data property 
 * is an attribute as well. Thus, we can say that a property has a name 
 * and four attributes. The four attributes of a data property are value, 
 * writable, enumerable, and configurable. Accessor properties don’t have 
 * a value attribute or a writable attribute: their writability is 
 * determined by the presence or absence of a setter. So the four 
 * attributes of an accessor property are get, set, enumerable, and 
 * configurable.
 * 
 * The JavaScript methods for querying and setting the attributes of a 
 * property use an object called a property descriptor to represent the 
 * set of four attributes. A property descriptor object has properties 
 * with the same names as the attributes of the property it describes. 
 * Thus, the property descriptor object of a data property has properties 
 * named value, writable, enumerable, and configurable. And the 
 * descriptor for an accessor property has get and set properties instead 
 * of value and writable. The writable, enumerable, and configurable 
 * properties are boolean values, and the get and set properties are 
 * function values.
 * 
 * To obtain the property descriptor for a named property of a specified  
 * object, call Object.getOwnPropertyDescriptor():
 */

// Returns {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor({x:1}, "x");

// Here is an object with a read-only accessor property
const random = {
    get octet() { return Math.floor(Math.random() * 256); },
};

// Returns { get: /* func */, set: undefined, enumerable: true, configurable: true }
Object.getOwnPropertyDescriptor(random, "octet");

// Returns undefined for inherited properties and properties that don't exist.
Object.getOwnPropertyDescriptor({}, "x"); // => undefined; no such prop
Object.getOwnPropertyDescriptor({}, "toString"); // => undefined; inherited

/**
 * As its name implies, Object.getOwnPropertyDescriptor() works only for 
 * own properties. To query the attributes of inherited properties, you 
 * must explicitly traverse the prototype chain.
 */

/**
 * To set the attributes of a property or to create a new property with 
 * the specified attributes, call Object.defineProperty(), passing the 
 * object to be modified, the name of the property to be created or 
 * altered, and the property descriptor object:
 */

let o1 = {}; // Start with no properties at all
// Add a non-enumerable data property x with value 1.
Object.defineProperty(o1, "x", {
    value: 1,
    writable: true,
    enumerable: false,
    configurable:true
});

// Check that the property is there but is non-enumerable
console.log(o1.x); // => 1
console.log(Object.keys(o1)); // => []

// Now modify the property x so that it is read-only
Object.defineProperty(o1, "x", { writable: false });

// Try to change the value of the property
o1.x = 2; // Fails silently or throws TypeError in strict mode
console.log(o1.x); // => 1

// The property is still configurable, so we can change its value like this:
Object.defineProperty(o1, "x", { value: 2 });
console.log(o1.x); // => 2

// Now change s from a data property to an acessor property
Object.defineProperty(o1, "x", { get: function() { return 0; }});
console.log(o1.x); // => 0

/**
 * The property descriptor you pass to Object.defineProperty() does not 
 * have to include all four attributes. If you’re creating a new 
 * property, then omitted attributes are taken to be false or undefined. 
 * If you’re modifying an existing property, then the attributes you omit 
 * are simply left unchanged. Note that this method alters an existing 
 * own property or creates a new own property, but it will not alter an 
 * inherited property.
 */

/**
 * If you want to create or modify more than one property at a time, use 
 * Object.defineProperties(). The first argument is the object
 * that is to be modified. The second argument is an object that maps the
 * names of the properties to be created or modified to the property
 * descriptors for those properties. For example:
 */

let p1 = Object.defineProperties({}, {
    x: { value: 1, writable: true, enumerable: true, configurable: true },
    y: { value: 1, writable: true, enumerable: true, configurable: true },
    r: {
        get() { return Math.sqrt(this.x * this.x + this.y * this.y); },
        enumerable: true,
        configurable: true
    }
}); 
console.log(p1.r); // => Math.SQRT2

/**
 * This code starts with an empty object, then adds two data properties 
 * and one read-only accessor property to it. It relies on the fact that 
 * Object.defineProperties() returns the modified object (as does Object.
 * defineProperty()).
 */

/**
 * The Object.create() method has the first argument as the prototype 
 * object for the newly created object. This method also accepts a second 
 * optional argument, which is the same as the second argument to Object.
 * defineProperties(). If you pass a set of property descriptors to 
 * Object.create(), then they are used to add properties to the newly 
 * created object.
 */

/**
 * Object.defineProperty() and Object.defineProperties() throw TypeError 
 * if the attempt to create or modify a property is not allowed. This 
 * happens if you attempt to add a new property to a non-extensible 
 * object. The other reasons that these methods might throw TypeError 
 * have to do with the attributes themselves. The writable attribute 
 * governs attempts to change the value attribute. And the configurable 
 * attribute governs attempts to change the other attributes (and also 
 * specifies whether a property can be deleted). The rules are not 
 * completely straightforward, however. It is possible to change the 
 * value of a nonwritable property if that property is configurable, for 
 * example. Also, it is possible to change a property from writable to 
 * nonwritable even if that property is nonconfigurable. Here are the 
 * complete rules. Calls to Object.defineProperty() or Object.
 * defineProperties() that attempt to violate them throw a TypeError:
 * 
 * - If an object is not extensible, you can edit its existing own 
 * properties, but you cannot add new properties to it.
 * 
 * - If a property is not configurable, you cannot change its 
 * configurable or enumerable attributes.
 * 
 * - If an accessor property is not configurable, you cannot change its 
 * getter or setter method, and you cannot change it to a data property.
 * 
 * - If a data property is not configurable, you cannot change it to an 
 * accessor property.
 * 
 * - If a data property is not configurable, you cannot change its 
 * writable attribute from false to true, but you can change it from true 
 * to false.
 * 
 * - If a data property is not configurable and not writable, you cannot 
 * change its value. You can change the value of a property that is 
 * configurable but nonwritable, however (because that would be the same 
 * as making it writable, then changing the value, then converting it 
 * back to nonwritable).
 * 
 * Object.assign() function copies property values from one or more 
 * source objects into a target object. Object.assign() only copies 
 * enumerable properties, and property values, not property attributes. 
 * This is normally what we want, but it does mean, for example, that if 
 * one of the source objects has an accessor property, it is the value 
 * returned by the getter function that is  copied to the target object, 
 * not the getter function itself. Example 14-1 demonstrates how we can 
 * use Object.getOwnPropertyDescriptor() and Object.defineProperty() to 
 * create a variant of Object.assign() that copies entire property 
 * descriptors rather than just copying property values.
 */

// Example 14-1. Copying properties and their attributes from one object to another
/*
* Define a new Object.assignDescriptors() function that works like
* Object.assign() except that it copies property descriptors from
* source objects into the target object instead of just copying
* property values. This function copies all own properties, both
* enumerable and non-enumerable. And because it copies descriptors,
* it copies getter functions from source objects and overwrites setter
* functions in the target object rather than invoking those getters and
* setters.

* Object.assignDescriptors() propagates any TypeErrors thrown by
* Object.defineProperty(). This can occur if the target object is sealed
* or frozen or if any of the source properties try to change an existing
* non-configurable property on the target object. 
*
* Note that the assignDescriptors property is added to Object with
* Object.defineProperty() so that the new function can be created as
* a non-enumerable property like Object.assign().
*/
Object.defineProperty(Object, "assignDescriptors", {
    // Match the attributes of Object.assign()
    writable: true,
    enumerable: false,
    configurable: true,
    // The function that is the value of the assignDescriptors property.
    value: function(target, ...sources) {
        for(let source of sources) {
            for(let name of Object.getOwnPropertyNames(source)) {
                let desc = Object.getOwnPropertyDescriptor(source, name);
                Object.defineProperty(target, name, desc);
            }

            for(let symbol of Object.getOwnPropertySymbols(source)) {
                let desc = Object.getOwnPropertyDescriptor(source, symbol);
                Object.defineProperty(target, symbol, desc);
            }
        }
        return target;
    }
});

let o = {c: 1, get count() {return this.c++;}}; // Define object with getter
let p = Object.assign({}, o); // Copy the property values
let q = Object.assignDescriptors({}, o); // Copy the property descriptors
console.log(p.count); // => 1: this is now just a data property so
console.log(p.count); // => 1: ...the counter does not increment.
console.log(q.count); // => 2: Incremented once when we copied it the first time,
console.log(q.count); // => 3: ...but we copie the getter method so it increments.