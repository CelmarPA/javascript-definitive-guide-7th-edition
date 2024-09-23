console.log([].length); // => 0: o array não tem elemetos
console.log(["a", "b", "c"].length); // => 3: o maior índice é 2, lenght é 3

let a = [1,2,3,4,5]; // Inicia com um array de 5 elementos
console.log(a);
a.length = 3; // a é agora [1,2,3]
console.log(a);
a.length = 0; // Deleta todos os elementos. a é [].
console.log(a);
a.length = 5; // Length é 5,  mas não tem elementos, como new Array(5)
console.log(a);