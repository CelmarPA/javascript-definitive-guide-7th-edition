let a = [1, 2, 3];
console.log(a.join()); // => "1,2,3"
console.log(a.join(" ")); // => "1 2 3"
console.log(a.join("")); // => "123"
let b = new Array(10); // An array of lenght 10 with no elements
console.log(b.join("-")); // => "---------": a string of 9 hyphens

console.log([1,2,3].toString()); // => "1,2,3"
console.log(["a", "b", "c"].toString()); // "a,b,c"
console.log([1, [2, "c"]].toString()) // => "1,2,c"