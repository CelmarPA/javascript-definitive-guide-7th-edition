let a = [1,2,3];
console.log(a.concat(4,5)); // => [1,2,3,4,5]
console.log(a.concat([4,5],[6,7])); // => [1,2,3,4,5,6]; arrays are flattened9
console.log(a.concat(4,[5,[6,7]])); // => [1,2,3,4,5,[6,7]]; bur not nested arrays
console.log(a);