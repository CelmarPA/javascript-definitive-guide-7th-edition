// Print the name and value of each property of o. Return undefined.
function printprops(o) {
    for(let p in o) {
        console.log(`${p}: ${o[p]}\n`);
    }
}

// Compute the distance between Cartesian  points (x1,y1) and (x2,y2).
function distance(x1, y1, x2, y2) {
    let dx = x2- x1;
    let dy = y2- y1;
    return Math.sqrt(dx*dx + dy*dy);
}

// A recursive function (one that calls itself) that computes factorials
// Recall that x! os the product of x and all positive integers less than it.
function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x - 1);
}


printprops({x: 1});

let total = distance(0,0,2,1) + distance(2,1,3,5);
console.log(total);

let probability = factorial(5)/factorial(13);
console.log(probability);

// f?.(X) is equivalent to:
// (f !== null && f !== undefined) ? f(x) : undefined

// Define and invoke a function to determine if we're in strict mode.
const strict = (function() { return !this; }());
console.log(strict)