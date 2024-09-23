let x = .3 - .2; // Trinta centavos menos vinte centavos
let y = .2 - .1; // Vinte centavos menos dez centavos

console.log(x === y); // => false: Os dois valores não são os mesmos!
console.log(x === .1); // => false: .3 - .2 não é igual a .1
console.log(y === .1); // => true: .2 - .1 é igual a .1