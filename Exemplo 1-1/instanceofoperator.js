let d = new Date(); // Cria um novo objeto com o construtor Date()
console.log(d instanceof Date); // => true: d foi criado com Date()
console.log(d instanceof Object); // => true: todos os objetos são instâncias de Object
console.log(d instanceof Number); // => false: d não é um objeto Number

let a = [1,2,3]; // Cria um array com sintaxe de array literal
console.log(a instanceof Array); // => true: a é um array
console.log(a instanceof Object); // => true: todos os arrays são objetos
console.log(a instanceof RegExp); // => false: arrays não são expressões regulares
