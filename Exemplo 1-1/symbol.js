let s = Symbol.for("shared");
let t = Symbol.for("shared");
console.log(s === t); // => true
console.log(s.toString()); // => "Symbol(shared)"
console.log(Symbol.keyFor(t));  // => "shared"