let numbers = [5, 2, 10, -1, 9, 100, 1];
let min = Math.min(...numbers); // => -1
let max = Math.max(...numbers); // => 100
console.log("min:", min);
console.log("max:", max);

// This function takes a function and returns a wrapped version
function timed(f) {
    return function(...args) { // Collect args into a rest parameter array
        console.log(`Entering function ${f.name}`);
        let startTime = Date.now();
        try {
            // Pass all of our arguments to the wrapped function
            return f(...args); // Spread the args back out again
        }
        finally {
            // Before we return the wrapped return value, print elapsed time.
            console.log(`Exiting ${f.name} after ${Date.now() - startTime}ms`);
        }
    };
}

// Compute the sum of the numbers between 1 and n by brute force
function benchmark(n) {
    let sum = 0;
    for(let i = 0; i <= n; i++) sum += i;
    return sum;
}

// Now invoke the timed version of that rest function
console.log(timed(benchmark)(1000000)); // => 500000500000; this is the sum of the numbers

function vectorAdd(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
}
console.log(vectorAdd([1,2], [3,4])); // => [4,6]

function vectorAdds([x1,y1],[x2,y2]) { // Unpack 2 arguments into 4 parameters
    return [x1 + x2, y1 + y2];
}
console.log(vectorAdds([1,2], [3,4])); // => [4,6]

// Multiply the vector {x,y} by a scalar value
function vectorMultiply({x, y}, scalar) {
    return { x: x * scalar, y: y * scalar };
}
console.log(vectorMultiply({x: 1, y: 2}, 2)); // => {x: 2, y: 4}

function vectorAdd2(
    {x: x1, y: y1}, // Unpack 1st object into x1 and y1 params
    {x: x2, y: y2} // Unpack 2nd object into x2 ans y2 params
)
{
    return {x: x1 + x2, y: y1 + y2 };
}
console.log(vectorAdd2({x: 1, y: 2}, {x:3, y: 4})); // => {x: 4, y: 6}

// Multiply the vector {x,y} or {x,y,z} by a scalar value
function vectorMultiplies({x, y, z=0}, scalar)  {
    return { x: x* scalar, y: y * scalar, z: z* scalar };
}
console.log(vectorMultiplies({x: 1, y: 2}, 2)); // => {x: 2, y: 4, z: 0}
console.log(vectorMultiplies({x: 1, y: 2, z: 3}, 2)); // => {x: 2, y: 4, z: 6}

function arraycopy({from, to=from, n=from.length, fromIndex=0, toIndex=0}) {
    let valuesToCopy = from.slice(fromIndex, fromIndex + n);
    to.splice(toIndex, 0, ...valuesToCopy);
    return to;
}
let a = [1,2,3,4,5], b = [9,8,7,6,5];
console.log(arraycopy({from:a, n:3, to: b,  toIndex: 4})); // => [9,8,7,6,1,2,3,5]

// This function expects an array arguments. The first two elements of that
// array are unpacked into the x and y parameters. Any remaining elements
// are stored in the coords array. And any arguments after the first array
// are packed int the rest array.
function f([x, y, ...coords], ...rest) {
    return [x+y, ...rest, ...coords]; // Note: spread operator here
}
console.log(f([1, 2, 3, 4], 5, 6)); // => [3, 5, 6, 3, 4]

// Multiply the vector {x,y} or {x,y,z} by a scalar value, retain other props
function vectorMultiplyN({x,y,z=0, ...props}, scalar) {
    return {x: x*scalar, y: y*scalar, z: z*scalar, ...props};
}
console.log(vectorMultiplyN({x: 1, y: 2, w: -1}, 2)); // => {x: 2, y: 4, z: 0, w: -1}