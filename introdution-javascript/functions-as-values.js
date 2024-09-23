function square(x) { return x*x; }

let s = square; // Now s refers to the same function that square does
console.log(square(4)); // => 16
console.log(s(4)); // => 16

let o = {square: function(x) { return x*x; }}; // An object literal
let y = o.square(16); // y == 256
console.log(y);
let a = [x => x*x, 20]; // An array literal
console.log(a[0](a[1])); // => 40