let a = new Array(5); // Sem elemenetos, mas a.length é 5.
a = []; // Cria  um array sem elementos e com length = 0.
a[1000] = 0; // Atribui um elementos mais define length para 1001
console.log(a.length);

let a1 = [,]; // Esse array não tem elementos e tem lenght = 1
let a2 = [undefined]; // Esse array tem um elemente undefined
console.log( 0 in a1); // => false: a1 não tem elemento com índice 0
console.log(0 in a2); // => true: a2 tem um elemente undefined no índice 0