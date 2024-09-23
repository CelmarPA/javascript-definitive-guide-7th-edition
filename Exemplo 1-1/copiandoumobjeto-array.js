let a = ["a", "b", "c"]; // Um array que queremos copiar
let b = []; // Um array distinto para receber a copia
for(let i = 0; i < a.length; i++) { // Para cada índice de a[]
    b[i] = a[i]; // Copia um elemento de a em b 
}
let c = Array.from(b); // Em ES6, copia-se arrays com Array.from()
console.log(a);
console.log(b);
console.log(c);

function equalArrays(a, b) {
    if  (a === b ) return true; // Arrays identicos são iguais
    if (a.length !== b.length) return false; // Tamanhos diferentes não iguais
    for (let i = 0; i < a.length; i++) { // Loop por todos os elementos
        if (a[i] !== b[i]) return false; // Se qualquer diferente returna falso
    }
    return true; // Caso contrário returna verdadeiro
}

console.log(equalArrays(a, b));