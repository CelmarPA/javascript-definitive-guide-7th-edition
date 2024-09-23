console.log([1, [2, 3]].flat()); // => [1, 2, 3]
console.log([1, [2, [3]]].flat()); // => [1, 2, [3]]

let a = [1, [2, [3, [4]]]];
console.log(a.flat(1)); // => [1, 2, [3, [4]]]
console.log(a.flat(2)); // => [1, 2, 3, [4]]
console.log(a.flat(3)); // => [1, 2, 3, 4]
console.log(a.flat(4)); // => [1, 2, 3, 4]

let phrases = ["hello world", "the definitive guide"];
let words = phrases.flatMap(phrase => phrase.split(" "));
console.log(words);

// Map non-negative numbers to their square roots
let b = [-2, -1, 1, 2].flatMap(x => x < 0 ? [] : Math.sqrt(x)); // => [1, 2**0.5]
console.log(b);