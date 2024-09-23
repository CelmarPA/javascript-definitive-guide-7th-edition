let a = [5,4,3,2,1];
let b = a.filter(x => x < 3); // => [2, 1]; value less than 3
let c = a.filter((x, i) => i % 2 == 0) // => [5, 3, 1]; overy other value
console.log(b);
console.log(c);

let dense = sparse.filter(()  => true);

a1 = a1.filter(x => x !== undefined && x !== null);