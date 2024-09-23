let a = []; // Inicia com um array vazio.
a[0] = "zero"; // E adiciona elementos ao array
a[1] = "one";

let b = []; // Inicia com um array vazio.
b.push("zero"); // Adiciona um valor no final. b = ["zero"]
b.push("one", "two"); // Adiciona mais 2 valores. b = ["zero", "one", "two"]
console.log(b);

let c = [1,2,3];
delete a[2]; // a agora não tem elemento no índice 2
console.log(2 in a); // => false: índice 2 não é definido
console.log(a.length); // 3: delete não afeta o length do array