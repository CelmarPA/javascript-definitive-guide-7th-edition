// Import the entire stats object. with all its functions
const stats = require('./node-exports.js');

let data = [1, 3, 5, 7, 9];
// We've got more funtions that we need, but they're neatly
// organized into a convenient "stats" namespace.
let average = stats.mean(data);

// Alternatively,  we can use idiomatic destructuring assigment to import
// exactly the functions we want directly into the local namespace:
const { stddev } = require('./node-exports.js');

// This is nice and succinct,  though we lose a bit of context
// without the 'stats' prefix as a namespace for the stddev() function.
let sd = stddev(data);

console.log(average); 
console.log(sd.toFixed(3));