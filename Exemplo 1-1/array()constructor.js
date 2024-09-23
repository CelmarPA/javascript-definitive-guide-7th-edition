let a = new Array();
console.log(a);

let b = new Array(10);
console.log(b.length);

let c = new Array(5, 4, 3, 2, 1, "testing, testing");
console.log(c);

let d = Array.of(); // => []; retorna um array vazio
console.log(d);

let e = Array.of(10); // => [10]; pode criar arrays com um único argumento numérico
console.log(e);

let f = Array.of(1,2,3); // => [1, 2, 3]
console.log(f);

let original = [1, 2, 3, 4, 5];
let copy = Array.from(original);
console.log(copy);