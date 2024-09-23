// Append the names of the enumerable properties of object o to the
// array a, and return a. If a is omitted, create and return a new array.
function getPropertyNames(o, a) {
    if (a === undefined) a = []; // If undefined, use a new array or a = a || [];
    for(let property in o) a.push(property);
    return a;
}

// getPropertyNames() can be invoked with one  or two arguments:
let o = {x: 1}, p = {y: 2, z: 3}; // Two objects for testing
let a = getPropertyNames(o); // a == ["x"]; get o's properties in a new array
console.log(a);
getPropertyNames(p, a); // a == ["x","y","z"]; add p's properties to it
console.log(a);

// Append the names of the enumerable properties of object o to the
// array a, and return a. If a is omitted, create and return a new array.
function getPropertyNamesN(o, a = []) {
    for(let property in o) a.push(property);
    return a;
}

let b = getPropertyNamesN(o);
console.log(b);
getPropertyNamesN(p, b);
console.log(b);

// This function returns an object representing a rectangle's dimensions.
// If only width is supplied, make it twice as high as it is wide.
const rectangle = (width, height=width*2) => ({width, height});
let r = rectangle(1); // => { width: 1, height: 2 }
console.log(r)

// Rest parameter ...rest
function max(first=-Infinity, ...rest) {
    let maxValue = first; // Start by assuming the first arg is biggest
    // The loop through the rest of the arguments, looking for bigger
    for(let n of rest) {
        if (n > maxValue) {
            maxValue = n;
        }
    }
    // Return the biggest
    return maxValue;
}

let m = max(1, 10, 100, 2, 3, 1000, 4, 5, 6); // => 1000
console.log(m);

function maximo(x) {
    let maxValue = -Infinity;
    // Loop through the arguments, looking for, and remembering, the biggest.
    for(let i = 0; i < arguments.length; i++) {
        if (arguments[i] > maxValue) maxValue = arguments[i];
    }
    // Return the biggest
    return maxValue;
}

let ma = maximo(1, 10, 100, 2, 3, 1000, 4, 5, 6); // => 1000
console.log(ma);