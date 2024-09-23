// JavaScript does not define a TypedArray class. Instead, there are 11
// kinds of typed arrays, each with a different element type and constructor:

/**
 * Constructor           Numeric type
 * 
 * Int8Array()           signed bytes
 * Uint8Array()          unsigned bytes
 * Uint8ClampedArray()   unsigned bytes without rollover
 * Int16Array()          signed 16-bit short integers
 * Uint16Array()         unsigned 16-bit short integers
 * Int32Array()          signed 32-bit integers
 * Uint32Array()         unsigned 32-bit integers
 * BigInt64Array()       signed 64-bit BigInt values (ES2020)
 * BigUint64Array()      unsigned 64-bit BigInt values (ES2020)
 * Float32Array()        32-bit floating-point value
 * Float64Array()        64-bit floating-point value: a regular JavaScript number
 */

let bytes = new Uint8Array(1024); // 1024 bytes
let matrix = new Float64Array(9); // A 3x3 matrix
let point = new Int16Array(3); // A point in 3D space
let rgba = new Uint8ClampedArray(4); // A 4-bytte RGBA pixel value
let sudoku = new Int8Array(81); // A 9x9 sudoku board

// Each of the typed array constructors has static from() and of() 
// factory methods that work like Array.from() and Array.of():
let white = Uint8ClampedArray.of(255, 255, 255, 0); // RGBA opaque white

/**
 * Recall that the Array.from() factory method expects an array-like
 * or iterable object as its first argument. The same is true for the
 * typed array variants, except that the iterable or array-like object
 * must also have numeric elements.
 * Note that both the constructor and the from() factory method allow
 * you to copy existing typed arrays, while possibly changing the type:
*/
let  ints = Uint32Array.from(white); // The same 4 numbers, but as ints

// Floats truncated to ints, longer ints truncated to 8 bits
Uint8Array.of(1.23, 2.99, 45000); // => new Unit8Array([1, 2, 200])

/**
 * Finally, there is one more way to create typed arrays that involves
 * the ArrayBuffer type. An ArrayBuffer is an opaque reference to a
 * chunk of memory. You can create one with the constructor; just pass
 * in the number of bytes of memory you’d like to allocate:
 */
let buffer = new ArrayBuffer(1024 * 1024);
console.log(buffer.byteLength); // 1024*1024; one megabyte of memory

// Given the ArrayBuffer created earlier, you could create typed arrays like these:
let asbytes = new Uint8Array(buffer); // Viewed as bytes
let asints = new Int32Array(buffer); // Viewed as 32-bit signed ints
let lastk = new Uint8Array(buffer, 1023 * 1024); // Las kilobyte as bytes
let ints2 = new Int32Array(buffer, 1024 * 256); // 2nd kilobity as 256 integers

// Using Typed Arrays
// Once you have created a typed array, you can read and write its
// elements with regular square-bracket notation, just as you would with
// any other array-like object:

// Retunr the largest prime smaller the n, using the sieve of Eratosthenes
function sieve(n) {
    let a = new Uint8Array(n + 1); // a[x] will be 1 if x is composite
    let max = Math.floor(Math.sqrt(n)); // Don't do factores higher than this
    let p = 2; // 2 is the first prime
    while(p <= max) { // For  primes less than max
        for(let i = 2 * p; i <= n; i += p) // Mark multiples of p as composite
            a[i] = 1;
        while(a[++p]) /* empty */; // The nex unmaked index is prime
    }
    while(a[n]) n--; // Loop backward to find the last prime
        return n; // And return it
}
console.log(sieve(100)); // This will return the largest prime number less than or equal to 100

// Typed arrays are not true arrays, but they re-implement most array
// methods, so you can use them pretty much just like you’d use regular arrays:
let ints1 = new Int16Array(10); // 10 short integers
ints1.fill(3).map(x => x * x).join(""); // "9999999999"

/**
 * Remember that typed arrays have fixed lengths, so the length 
 * property is read-only, and methods that change the length of the
 * array (such as push(), pop(), unshift(), shift(), and splice()) are
 * not implemented for typed arrays. Methods that alter the contents of
 * an array without changing the length (such as sort(), reverse(), and
 * fill()) are implemented. Methods like map() and slice() that return
 * new arrays return a typed array of the same type as the one they are
 * called on.
 */

// Typed Array Methods and Properties

/**
 * In addition to standard array methods, typed arrays also implement a
 * few methods of their own. The set() method sets multiple elements
 * of a typed array at once by copying the elements of a regular or
 * typed array into a typed array:
 */
let bytes1 =  new Uint8Array(1024); // A 1k buffer
let pattern = new Uint8Array([0,1,2,3]); // An array of 4 bytes
bytes1.set(pattern); // Copy them to the start of another byte array
bytes1.set(pattern, 4); // Copy them again at a different offset
bytes1.set([0,1,2,3], 8); // Or just copy values direct from a regular array
bytes1.slice(0, 12); // => new Uint8Array([0,1,2,3,0,1,2,3,0,1,2,3])

/**
 * The set() method takes an array or typed array as its first argument
 * and an element offset as its optional second argument, which defaults
 * to 0 if left unspecified.
 */

// Typed arrays also have a subarray method that returns a portion 
// of the array on which it is called:
let ints3 = new Int16Array([0,1,2,3,4,5,6,7,8,9]); // 10 short integers
let last3 = ints3.subarray(ints3.length-3, ints3.length);
console.log(last3[0]); // => 7: this is the same as ints[7]

/**
 * subarray() takes the same arguments as the slice() method and seems
 * to work the same way. But there is an important difference. slice()
 * returns the specified elements in a new, independent typed array
 * that does not share memory with the original array. subarray() does
 * not copy any memory; it just returns a new view of the same
 * underlying values:
 */
ints3[9] = -1; // Change a value in the original array and...
console.log(last3[2]); // => -1: it also changes in the subarray

/**
 * The fact that the subarray() method returns a new view of an
 * existing array brings us back to the topic of ArrayBuffers. Every
 * typed array has three properties that relate to the underlying
 * buffer:
 */
console.log(last3.buffer); // The ArrayBuffer object for a typed array
console.log(last3.buffer === ints3.buffer); // => true: both are views of the same buffer
console.log(last3.byteOffset); // => 14: this view starts at byte 14 of the buffer
console.log(last3.byteLength); // => 6: this view is 6 bytes (3 16-bit ints) long
console.log(last3.buffer.byteLength); // => 20: but the underlying buffer has 20 bytes

/**
 * The buffer property is the ArrayBuffer of the array. byteOffset is ]
 * the starting position of the array’s data within the underlying
 * buffer. And byteLength is the length of the array’s data in bytes
 * For any typed array, a, this invariant should always be true:
 */
// a.length * a.BYTES_PER_ELEMENT === a.byteLength // True


/**
 * ArrayBuffers are just opaque chunks of bytes. You can access those
 * bytes with typed arrays, but an ArrayBuffer is not itself a typed
 * array. Be careful, however: you can use numeric array indexing with
 * ArrayBuffers just as you can with any JavaScript object. Doing so
 * does not give you access to the bytes in the buffer, but it can
 * cause confusing bugs:
 */
let bytes2 = new Uint8Array(8); 
bytes2[0] = 1; // Set the first byte to 1
console.log(bytes2.buffer[0]); // undefined: buffer doesn't have index 0
bytes2.buffer[1] = 255; // Try incorrectly to set a byte in the buffer
console.log(bytes2.buffer[1]); // => 255: this just set a regular JS property
console.log(bytes[1]); // => 0: the line above did not set the byte

/**
 * We saw previously that you can create an ArrayBuffer with the 
 * ArrayBuffer() constructor and then create typed arrays that use 
 * that buffer. Another approach is to create an initial typed array 
 * then use the buffer of that array to create other views:
 */
let bytes3 =  new Uint8Array(1024); // 1024bytes
let ints4 = new Uint32Array(bytes3.buffer); // or 256 integers
let floats = new Float64Array(bytes3.buffer); // or 128 doubles

// DataView and Endianess

/**
 * Typed arrays allow you to view the same sequence of bytes in chunks
 * of 8, 16, 32, or 64 bits. This exposes the “endianness”: the order in
 * which bytes are arranged into longer words. For efficiency, typed
 * arrays use the native endianness of the underlying hardware. On
 * littleendian systems, the bytes of a number are arranged in an
 * ArrayBuffer from least significant to most significant. On
 * big-endian platforms, the bytes are arranged from most significant
 * to least significant. You can determine the endianness of the
 * underlying platform with code like this:
 */

// If the integer 0x00000001 is arranged in memory as 01 00 00 00, then
// we're on a little-endian platform. On a big-endian platform, we'd 
// get bytes 00 00 00 01 insted.
let littleEndian = new Int8Array(new Int32Array([1]).buffer)[0] === 1;
console.log(littleEndian);

// Assume we have a typed array of bytes of binary data to process.
// First, we create a DataView object so we can flexibly read adn write
// valuies from those bytes
let view = new DataView(bytes.buffer,
                        bytes.byteOffset,
                        bytes.byteLength);

let int = view.getInt32(0); // Read big-endian signed int from byte 0
int = view.getInt32(4, false); // Next int is also big.endian
int = view.getUint32(8, true); // Next int is little-endian and unsigned
view.setUint32(8, int, true); // Write in back in big-endian format