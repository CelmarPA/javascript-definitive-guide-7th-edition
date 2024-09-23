let o = {x: 1}; // o tem sua própria propriedade e herda toString
console.log(delete o.x); // => true: deleta a propriedade x
console.log(delete o.x); // => true: não faz nada (x não existe)  mais retorna true de todo forma
console.log(delete o.toString); // => true: não faz nada (toString não é propriedade própria)
console.log(delete 1); // => true: nonsense, mais retorna true de toda forma

// No modo restrito, todas essas deleções lançam TypeError em vez de retornar false
console.log(delete Object.prototype) // => false: propriedade é não configurável
var x = 1; // Declara uma variável global
console.log(delete globalThis.x); // => false: não pode deletar essa propriedade
function f() {} // Declara uma função global
console.log(delete globalThis.f); // => false: não  pode deletar essa propriedade também.
