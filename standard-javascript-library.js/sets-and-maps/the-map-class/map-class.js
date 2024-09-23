// The Map Class
// A Map object represents a set of values known as keys, where each key
// has another value associated with (or “mapped to”) it.
// Creat a new map with the Map() constructor:

let map1 = new Map(); // Create a new, empty map
let n = new Map([ // A new map initialized whith string keys mapped to numbers
    ["one", 1],
    ["two", 2]
]);

// But you can also use the Map() constructor to copy other maps or to
// copy the property names and values from an existing object:
let copy = new Map(n); // A new map with the same keys and values as map n
let o = { x: 1, y: 2 }; // An object with two properties
let p = new Map(Object.entries(o)); // Same as new map([["x", 1], ["y", 2]])

/**
 * Once you have created a Map object, you can query the value
 * associated with a given key with get() and can add a new key/value
 * pair with set().
 * If you call set() with a key that already exists in the
 * map, you will change the value associated with that key, not add a new
 * key/value mapping. In addition to get() and set(), the Map class
 * also defines methods that are like Set methods: use has() to check
 * whether a map includes the specified key; use delete() to remove a
 * key (and its associated value) from the map; use clear() to remove
 * all key/value pairs from the map; and use the size property to find out
 * how many keys a map contains.
 */
let m = new Map(); // Start with an empty map
console.log(m.size); // => 0: empty maps have no keys
m.set("one", 1); // Map the key "one" to the value 1
m.set("two", 2); // and the key "two" to the value 2.
console.log(m.size); // => 2: the map now has two keys
console.log(m.get("two")); // => 2: return the value associated with key "two"
console.log(m.get("three")); // => undefined: this key is not in the set
m.set("one", true); // Change the value associated with an existing key
console.log(m.size); // => 2: the size doesn't change
console.log(m.has("one")); // => true: the map has a key "one"
console.log(m.has(true)); // => false: the map does not have a key true
console.log(m.delete("one")); // => true: the key existed and deletion succeeded
console.log(m.size); // => 1
console.log(m.delete("three")); // => false: failed to delete a nonexistent key
m.clear(); // Remove all key and values from the map.

// Like the add() method of Set, the set() method of Map can be
// chained, which allows maps to be initialized without using arrays of arrays:
let m1 = new Map().set("one", 1).set("two", 2).set("three", 3);
console.log(m1.size); // => 3
console.log(m1.get("two")) // => 2

/**
 * As with Set, any JavaScript value can be used as a key or a value in a
 * Map. This includes null, undefined, and NaN, as well as reference
 * types like objects and arrays. And as with the Set class, Map compares
 * keys by identity, not by equality, so if you use an object or array as
 * a key, it will be considered different from every other object and
 * array, even those with exactly the same properties or elements:
 */

let map = new Map(); // Start with an empty map.
map.set({}, 1); // Map one empty object to the number 1.
map.set({}, 2); // Map a different empty object to the number 2.
console.log(map.size) // => 2: there are two keys in this map
console.log(map.get({})); // undefined: but this empty object is not a key
map.set(map, undefined); // Map the map itself to the value undefined.
console.log(map.has(map)); // true: map is a key in itself
console.log(map.get(map)); // undefined: same value we'd get if map wasn't a key

/**
 * If you use the spread operator with a Map object, you’ll get an array
 * of arrays like the ones that we passed to the Map() constructor. And
 * when iterating a map with a for/of loop, it is idiomatic to use
 * destructuring assignment to assign the key and value to separate
 * variables:
 */

let m2 = new Map([["x", 1], ["y", 2]]);
console.log([...m2]); // => [["x", 1], ["y", 2]]

for(let[key, value] of m2) {
    // On the first iteration,  key will be "x" and value will be 1
    // On the second iteration, key will be "y" and value will be 2
    console.log(`${key}: ${value}`)
}

/**
 * If you want to iterate just the keys or just the associated values of a
 * map, use the keys() and values() methods: these return iterable
 * objects that iterate keys and values, in insertion order. (The
 * entries() method returns an iterable object that iterates key/value
 * pairs, but this is exactly the same as iterating the map directly.)
 */

console.log([...m2.keys()]); // => ["x", "y"]: just the keys
console.log([...m2.values()]); // => [1, 2]: just the values
console.log([...m2.entries()]); // => [["x", 1], ["y", 2]]: same as [...m2]

// Map objects can also be iterated using the forEach() method that
// was first implemented by the Array class.
m2.forEach((value, key) => { // note value, key not key, value
    // On the first invocation, value will be 1  and key will be "x"
    // On the second invocation, value will be 2 and key will be "y"
    console.log(`Value "${value}" has the key "${key}"`)
})

/**
 * The forEach() method of arrays passes the array element first and the
 * array index second, so, by analogy, the forEach() method of a map
 * passes the map value first and the map key second.
 */