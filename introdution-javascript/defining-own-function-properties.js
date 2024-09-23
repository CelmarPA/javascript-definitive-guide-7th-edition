// Initialize the counter property of the function object.
// Fucntion declarations are hoisted so we really can
// do this assigment before the function declaration.
uniqueInteger.counter = 0;

// This function returns a different integer each time it is called.
// It uses a property of itself to remember the next value to be returned.
function uniqueInteger() {
    return uniqueInteger.counter++; // Return and increment counter property
}
console.log(uniqueInteger()); // => 0
console.log(uniqueInteger()); // => 1

// Compute factorial and cache results as properties of the function itself.
function factorial(n) {
    if (Number.isInteger(n) && n > 0) { // Positive integers only
        if (!(n in factorial)) { // If no cached result
            factorial[n] = n * factorial(n - 1); // Compute and cache it
        }
        return factorial[n]; // Return the cached result
    } else {
        return NaN; // If input was bad
    }
}
factorial[1] = 1; // Initialize the cache to hold this base case.
console.log(factorial(6)); // => 720
console.log(factorial[5]); // => 120; the call above caches this value