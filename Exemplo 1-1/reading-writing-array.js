let a = ["world"]; // Inicia um array com um elemento
let value = a[0]; // Lê o elemento 0
console.log(value);
a[1] = 3.14; // Escreve o elemento 1
let i = 2;
a[i] = 3; // Escreve o elemento 2
a[i + 1] = "hello"; // Escreve o elemento 3
console.log(a);
a[a[i]] = a[0]; // Lê os elementos 0 e 2, escreve o elemento 3
console.log(a.length);

let o = {}; // Cria um objeto simples
o[1] = "one"; // Index it with an integer
console.log(o["1"]); // "one"; propriedade numérica e string são a mesma

a[-1.23] = true; // Isto cria uma propriedade com nome "-1.23"
a["1000"] = 0; // Este é o 1001st elemento do array
a[1.000] = 1; // Índice 1 do array. O mesmo que a[1] = 1;
console.log(a.length)

let b = [true, false]; // Este array tem elementos com índices 0 e 1
console.log(b[2]); // => undefined; não há elemento neste índice
console.log(b[-1]); // => undefined; não propriedade com esse nome