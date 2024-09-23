/**
 * If JSON.stringify() is asked to serialize a value that is not
 * natively supported by the JSON format, it looks to see if that value
 * has a toJSON() method, and if so, it calls that method and then
 * stringifies the return value in place of the original value. Date
 * objects implement toJSON(): it returns the same string that
 * toISOString() method does. This means that if you serialize an
 * object that includes a Date, the date will automatically be converted 
 * to a string for you. When you parse the serialized string, the
 * re-created  data structure will not be exactly the same as the one you 
 * started with because it will have a string where the original object 
 * had a Date.
 */

/**
 * If you need to re-create Date objects (or modify the parsed object in
 * any other way), you can pass a “reviver” function as the second
 * argument to JSON.parse(). If specified, this “reviver” function is
 * invoked once for each primitive value (but not the objects or arrays 
 * that contain those primitive values) parsed from the input string. The
 * function is invoked with two arguments. The first is a property name—
 * either an object property name or an array index converted to a string.
 * The second argument is the primitive value of that object property or
 * array element. Furthermore, the function is invoked as a method of the
 * object or array that contains the primitive value, so you can refer to 
 * that containing object with the this keyword.
 * The return value of the reviver function becomes the new value of the
 * named property. If it returns its second argument, the property will
 * remain unchanged. If it returns undefined, then the named property
 * will be deleted from the object or array before JSON.parse()
 * returns to the user.
 */

// As an example, here is a call to JSON.parse() that uses a reviver
// function to filter some properties and to re-create Date objects:

let data = JSON.parse(text, function(key, value) {
    // Remove any values whose property name begins with an underscore
    if (key[0] === "_") return undefined;

    // If the value is a string in ISO 8601 date format convert it to a Date.
    if (typeof value === "string" && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value)) {
        return new Date(value);
    }

    // Otherwise, return the value unchanged
    return value;
});

/**
 * If you pass a function, it is a replacer function—effectively the 
 * inverse of the optional reviver function you can pass to JSON.parse(). 
 * If specified, the replacer function is invoked for each value to be
 * stringified. The first argument to the replacer function is the object
 * property name or array index of the value within that object, and the
 * second argument is the value itself. The replacer function is invoked 
 * as a method of the object or array that contains the value to be ]
 * stringified. The return value of the replacer function is stringified
 * in place of the original value. If the replacer returns undefined or 
 * returns nothing at all, then that value (and its array element or 
 * object property) is omitted from the stringification.
 */

// Specify what fields to serialize, and what order to serialize them in
let text = JSON.stringify(address, ["city","state","country"]);

// Specify a replacer function that omits RegExp-value properties
let json = JSON.stringify(o, (k, v) => v instanceof RegExp ? undefined : v);

/**
 * The two JSON.stringify() calls here use the second argument in
 * a benign way, producing serialized output that can be deserialized
 * without requiring a special reviver function. In general, though, if 
 * you define a toJSON() method for a type, or if you use a replacer
 * function that actually replaces nonserializable values with 
 * serializableones, then you will typically need to use a custom reviver 
 * function with  JSON.parse() to get your original data structure back. 
 * If you do this, you should understand that you are defining a custom 
 * data format and sacrificing portability and compatibility with a large 
 * ecosystem of JSON-compatible tools and languages.
 */