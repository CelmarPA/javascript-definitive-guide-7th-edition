let empty = []; // Um array sem elementos
let primes = [2, 3, 5, 7, 11]; // Um array com 5 elementos numéricos
let misc = [ 1.1, true, "a", ]; // 3 elementos de vários tipos + vírgula a direita

let base = 1024;
let table = [base,  base+1, base+2, base+3];

let b1 = [[1, {x: 1, y: 2}], [2, {x: 3,  y: 4}]];

let count = [1,,3]; // Elementos no índices 0 e 2. Não há elemento no índice 1
let undefs = [,,]; // Um array sem elementos mais de length 2

let a = [1, 2, 3];
let b = [0, ...a, 4]; // b == [0, 1, 2, 3, 4]
console.log(b);

let original = [1,2,3];
let copy = [...original];
console.log(copy);
copy[0]= 0; // Modificando a copia não altera o original
console.log(copy[0]);
console.log(original[0]); // => 1

let digits = [..."0123456789ABCDEF"];
console.log(digits); // => ["0","1","2","3","4","5","6","7","8","9","A", B","C","D","E", "F"]

let letters = [..."hello world"];
letter = [...new Set(letters)] // => ["h","e","l","o"," ","w","r","d"]
console.log(letter);