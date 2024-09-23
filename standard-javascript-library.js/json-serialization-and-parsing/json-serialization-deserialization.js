/**
 * When a program needs to save data or needs to transmit data across a
 * network connection to another program, it must to convert its inmemory
 * data structures into a string of bytes or characters than can be
 * saved or transmitted and then later be parsed to restore the original
 * inmemory data structures. This process of converting data structures 
 * into streams of bytes or characters is known as serialization (or 
 * marshaling or even pickling).
 * 
 * The easiest way to serialize data in JavaScript uses a serialization
 * format known as JSON. This acronym stands for “JavaScript Object 
 * Notation” and, as the name implies, the format uses JavaScript object
 * and array literal syntax to convert data structures consisting of 
 * objects and arrays into strings.
 * 
 * JSON supports primitive numbers and strings and also the values true, 
 * false, and null, as well as arrays and objects built up from those 
 * primitive values. JSON does not support other JavaScript types like 
 * Map, Set, RegExp, Date, or typed arrays. Nevertheless, it has proved 
 * to be a remarkably versatile data format and is in common use even 
 * with non-JavaScript-based programs.
 */

/**
 * JavaScript supports JSON serialization and deserialization with the two
 * functions JSON.stringify() and JSON.parse(), which were
 * covered briefly in §6.8. Given an object or array (nested arbitrarily
 * deeply) that does not contain any nonserializable values like RegExp
 * objects or typed arrays, you can serialize the object simply by passing
 * it to JSON.stringify(). As the name implies, the return value of
 * this function is a string. And given a string returned by
 * JSON.stringify(), you can re-create the original data structure
 * by passing the string to JSON.parse():
 */

let o = {s: "", n: 0, a: [true, false, null]};
let s = JSON.stringify(o); // s == '{"s":"","n":0,"a":[true,false,null]}'
let copy = JSON.parse(s); // copy == {s: "", n: 0, a:[true, false, null]}
console.log(s);
console.log(copy);
console.log(o === copy);
console.log(JSON.stringify(o) === JSON.stringify(copy));

/**
 * If we leave out the part where serialized data is saved to a file or 
 * sent over the network, we can use this pair of functions as a somewhat
 * inefficient way of creating a deep copy of an object:
 */

// Make a deep copy of any serializable object or array
function deepcopy(o) {
    return JSON.parse(JSON.stringify(o));
}

/**
 * Typically, you pass only a single argument to JSON.stringify()
 * and JSON.parse(). Both functions accept an optional second
 * argument that allows us to extend the JSON format, JSON.stringify() 
 * also takes an optional third argument.
 * If you would like your JSONformatted string to be human-readable (if 
 * t is being used as a configuration file, for example), then you should 
 * pass null as the second argument and pass a number or string as the 
 * third argument. This third argument tells JSON.stringify() that it 
 * should format the data on multiple indented lines. If the third 
 * argument is a number, then it will use that number of spaces for each 
 * indentation level. If the third argument is a string of whitespace 
 * (such as '\t'), it will use that string for each level of indent.
 */

let ob = {s: "test", n: 0};
JSON.stringify(ob, null, 2); // '{\n "s": "test",\n "n":0\n}'

// JSON.parse() ignores whitespace, so passing a third argument to
// JSON.stringify() has no impact on our ability to convert the
// string back into a data structure.