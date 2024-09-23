let timestamp = Date.now(); // A hora atual como um timestamp (um número).
let now = new Date(); // A hora atual como um objeto data.
let ms = now.getTime();; // Converte para um timestamp de milisegundos.
let iso = now.toISOString(); // Converte para uma string no formato padrão.

console.log(timestamp);
console.log(now);
console.log(ms);
console.log(iso);