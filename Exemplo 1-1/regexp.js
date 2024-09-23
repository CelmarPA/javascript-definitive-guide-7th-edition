let text = "testing: 1, 2, 3"; // Amostra de texto
let pattern = /\d+/g // Corresponde a todos as intancias de um ou mais digitos
console.log(pattern.test(text)); // => true: uma correspondência existe
console.log(text.search(pattern)); // => 9: posição da primeira correspondência
console.log(text.match(pattern)); // => [ '1', '2', '3' ]: array de todas as correspondências
console.log(text.replace(pattern, "#")); // => testing: #, #, #
console.log(text.split(/\D+/)); // => ["","1","2","3"]: separa os não digitos