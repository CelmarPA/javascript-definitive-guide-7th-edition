let o = { x: 1 }; // Inicia com um objeto
o.x = 2; // Altera-o mudando o valor de um propriedade
o.y = 3; // Altera-o novamente adicionando um nova propriedade

let a = [1,2,3]; // Array também são mutáveis
a[0] = 3; // Muda o valor de uma elemento do array
a[3] = 4; // Adiciona um novo elemento no array

let o = {x: 1}, p = {x: 1}; // Dois objetos com a mesma propriedade
console.log(o === p); // => false: objetos distinto nunca são iguais

let a = [], b = []; // Dois arrays vazios distintos
console.log(a === b);  // => false: arrays distintos nunca são iguais

let a = []; // A variável a refere a um array vazio.
let b = a; //Agora b se refere ao mesmo array.
b[0] = 1; // Muda o array referido pela variável b.
console.log(a[0]); // => 1: A mudança também é visível através da variável a.
console.log(a === b); // => true: a e b se referem ao mesmo objeto, então eles são iguais.
