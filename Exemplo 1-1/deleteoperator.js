let o = { x: 1, y: 2}; // Começa com um objeto
console.log(delete o.x); // Deleta uma de suas propriedades
console.log(typeof o.x); // Propriedade não existe, retorna undefined
console.log(delete o.x); // Deletar uma propriedade não existente; retorna true
console.log(delete 1); // Isso não faz sentido, mas retorna true

// Não pode deletar uma variável; retorna false, or SyntaxError no modo restrito
console.log(delete o); 

// Propriedade não deletável: retorna false, ou TypeError no modo restrito
console.log(delete Object.prototype);


console.log("x" in o); // => false: a propriedade não existe mais


let a = [1,2,3]; // Começa com um array
delete a[2]; // Deleta o último elemento do array
console.log(2 in a); // => false: elemento 2 do array não existe mais
console.log(a.length); // => 3: Note que o tamanhao do array não muda

