let square = {
    area: function() { return this.side * this.side; },
    side: 10
};
console.log(square.area()); // => 100

let square1 = {
    area() { return this.side * this.side },
    side: 10
};
console.log(square1.area()); // => 100

const METHOD_NAME = "m";
const symbol = Symbol();
let weirdMethods = {
    "method With Spaces"(x) { return x + 1; },
    [METHOD_NAME](x) { return x + 2; },
    [symbol](x) { return x + 3; }
};
console.log(weirdMethods["method With Spaces"](1)); // => 2
console.log(weirdMethods[METHOD_NAME](1)); // => 3
console.log(weirdMethods[symbol](1)); // => 4