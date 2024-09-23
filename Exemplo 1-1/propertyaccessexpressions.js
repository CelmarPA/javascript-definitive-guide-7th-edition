let o = {x: 1, y: {z: 3}}; // Um objeto de exemplo
let a = [o, 4, [5, 6]]; // Um array de exemplo que contém o objeto o

console.log(o.x); // => 1: propriedade x da expressão o 
console.log(o.y.z); // => 3: propriedade z da expressão o.y
console.log(o["x"]); // => 1: propriedade x do objeto o
console.log(a[1]); // => 4: elemento no índice 1 da expressão a 
console.log(a[2]["1"]); // => 6: elemento no índice 1 da expressão a[2]
console.log(a[0].x); // => 1: propriedade x da expressão a[0]

