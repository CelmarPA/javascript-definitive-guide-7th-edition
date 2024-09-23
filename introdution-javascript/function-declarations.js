// Print the name and value of each property of o. Return undefined.
function printprops(o) {
    for(let p in o) {
        console.log(`${p}: ${o[p]}\n`);
    }
}
let ob = {x: 1, y: 2, z: 3};
printprops(ob);

// Compute the distance between Cartesian  points (x1,y1) and (x2,y2).
function distance(x1, y1, x2, y2) {
    let dx = x2- x1;
    let dy = y2- y1;
    return Math.sqrt(dx*dx + dy*dy).toFixed(3);
}
console.log(distance(1,1,2,2));

// A recursive function (one that calls itself) that computes factorials
// Recall that x! os the product of x and all positive integers less than it.
function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x - 1);
}
console.log(factorial(5))