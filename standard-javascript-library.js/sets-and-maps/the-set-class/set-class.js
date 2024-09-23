// The Set Class
// Create a Set object with the Set() constructor:

let set = new Set(); // A new, empty set
let t = new Set([1, set]); // A new set with to members

let u = new Set(t); // A new set that copies the elements of t;
let unique = new Set("Mississippi"); // 4 Elements: "M", "i", "s", "p"

// The size property of a set is like the length property of an array:
console.log(unique.size);

// Sets don't need too be initialized when create. 
// You can add and remove elements at any time with add(), delete(), andclear().
// Sets cannot contain duplicates.
let s = new Set() // Start empty
console.log(s.size); // => 0
s.add(1); // Add a number
console.log(s.size); // => 1
s.add(1); // Add the same number again
console.log(s.size); // => 1; the size does not change
s.add(true); // Add another value; note that ir is fine to mix types
console.log(s.size); // => 2
s.add([1,2,3]); // Add an array value
console.log(s.size); // => 3; the array was added, not its elements
console.log(s.delete(1)); // => true: successfully deleted eleement 1
console.log(s.size); // => 2: the size is back down to 2
console.log(s.delete("test")); // => false: "test" was not a member, deletion failed
console.log(s.delete(true)); // => true: delete succeeded
console.log(s.delete([1,2,3])); // => false: the array in the set is different
console.log(s.size); // => 1: thre is still that one array in the set
s.clear(); // Remove everything from the set
console.log(s.size); // => 0
s.add('a').add('b').add('c');
console.log(s.size);
console.log(s.delete('a'))
s.clear();
console.log(s.size);

// The most important thing to do with sets is to check to see whether a 
// specified value is a member of the set,  with the has() method:
let oneDigitPrimes = new Set([2,3,5,7]);
console.log(oneDigitPrimes.has(2)); // => true: 2 is a one-digit prime number
console.log(oneDigitPrimes.has(3));  // => true: so is 3
console.log(oneDigitPrimes.has(4)); // => false: 4 is not a prime
console.log(oneDigitPrimes.has("5")) // => false: "5" is not even a number

/**
 * The most important thing to understand about sets is that they are
 * optimized for membership testing, and no matter how many members
 * the set has, the has() method will be very fast.
 */

// The Set class is iterable, which means that you can use a for/of loop 
// to enumerate all of the elements of a set:
let sum = 0;
for(let p of oneDigitPrimes) { // Loop through the one-digit primes
    sum += p; // and add them up
}
console.log(sum); // => 17: 2 + 3 + 5 + 7

// Because Set objects are iterable, you can convert them to arrays and
// argument lists with the ... spread operator:
let arrayPrimes = [...oneDigitPrimes]; // => [2,3,5,7]: the set converted to an Array
console.log(arrayPrimes);
console.log(Math.max(...oneDigitPrimes)); // => 7: set elements passed as functions arguments

// In addition to being iterable, the Set class also implements a
// forEach() method that is similar to the array method of the same name:
let product = 1;
oneDigitPrimes.forEach(n => { product *= n; });
console.log(product); // => 210: 2 * 3 * 5 * 7