/*
let a = { b: null };
console.log(a.b?.c.d); // => undefined

let a = { b: {} };
console.log(a.b?.c?.d); // => undefined
*/

let a; // Oops, esquecemos de inicializar essa variável
let index = 0;
try {
    a[index++]; // Throws TypeError
} catch(e) {
    index // => 1: o incremento ocorre antes de lançar TypeError
}
a?.[index++] // => undefined: porque a é undefined
index // => 1: não incrementa porque ?.[] short-circuits
a[index++] // => TypeError: não pode indexar undefined 
