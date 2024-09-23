function f1(y) { return this.x + y; } // This function needs to be bound
let o = { x: 1 }; // An object we'll bind to
let g = f1.bind(o); // Calling g(x) invokes f() on o
console.log(g(2)); // => 3
let p = { x: 10, g }; // Invoke g() as a method of this object
console.log(p.g(2)); // => 3: g is still bound to o, not p

let sum = (x,y) => x + y; // Return the sum of 2 args
let succ = sum.bind(null, 1); // Bind the first argument to 1
console.log(succ(2)); // => 3: x is bound to 1, and we pass 2 for the y argument

function f(y,z) { return this.x + y + z; }
let h = f.bind({x: 1}, 2); // Bind this and y
console.log(h(3)); // => 6: this.x is bount to 1, y is bound to 2 and z is 3