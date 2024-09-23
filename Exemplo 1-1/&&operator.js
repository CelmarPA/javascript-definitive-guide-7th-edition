let x = 0, y = 0;
console.log(x === 0 && y === 0); // true se e somente se x e y são ambos 0


let o = {x: 1};
let p = null;
console.log(o && o.x); // => 1: o é verdadeiro (truthy), então retorna o valor de o.x
console.log(p && p.x); // => null: p é falso (falsy), então retorna null e não avalia p.x

if (a === b) stop(); // Chama stop() somente se a === b
(a === b) && stop(); // Isso faz a mesma coisa
