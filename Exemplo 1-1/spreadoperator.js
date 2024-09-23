let position = { x: 0, y: 0 };
let dimensions = { width: 100, height: 75 };
let rect = { ...position, ...dimensions };
console.log(rect.x + rect.y + rect.width + rect.height); // => 1750

let o = { x: 1 };
let p = { x: 0, ...o};
console.log(p.x); // => 1: o valor do objeto o sobrescreve o valor inicial
let q = { ...o, x: 2};
console.log(q.x); // => 2: o valor 2 sobrescreve o valor anterior de o.

let o1 =  Object.create({x: 1}); // o herda a propriedade x
let p1 = { ...o1 };
console.log(p1.x); // => undefined