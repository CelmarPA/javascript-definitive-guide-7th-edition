let empty = {}; // Um objeto sem propriedades
let point = { x: 0, y: 0 }; // Duas propriedades númericas
let p2 = { x: point.x, y: point.y + 1 }; // Valores  mais complexos
let book = {
    "main title": "JavaScript", // Esses nomes de propriedades incluem espaços,
    "sub-title": "The Definitive Guide", // e hiféns, então use strings literais.
    for: "all audiences", // for é reservado mais sem citações
    author: {
        firstmane: "David", // O valor dessa propriedade é um objeto em si.
        surname: "Flanagan"
    }
};

let o = new Object(); // Cria um objeto vazio: o mesmo que {}.
let a = new Array(); // Cria um array vazio: o mesmo que [].
let d = new Date(); // Cria um objeto Date representando o hora atual.
let r = new Map(); // Cria um objeto Map para mapeamento de key/value

let o1 = Object.create({x: 1, y: 2}); // o1 herda propriedades x e y.
console.log(o1.x + o1.y); // => 3
 
let o2 = Object.create(null); // o2 não herda propriedades nem métodos.

let o3 = Object.create(Object.prototype); // o3 é como {} ou new Object().

let ob = { x: "don't change the value" };
// library.function(Object.create(ob)); // Proteje contra modificações acidentais.

// Querying and Setting Properties
let author = book.author; // Obtém a propriedade "author" de book.
let name = author.surname; // Obtém a propriedade "surmane" de author.
let title = book["main title"]; // Obtém a propriedade "main title" de book.

book.edition = 7; // Cria a propriedade "edition" em book.
book["main title"] = "ECMAScript"; // Muda a propriedade "main title".

let addr = "";
for(let i = 0; i < 4; i++) {
    addr += customer[`address${i}`] + "\n"
}

function computeValue(portfolio) {
    let total = 0.0;
    for(let stock in portfolio) { // Para cada stock em  portfolio:
        let  shares = portfolio[stock]; // obtém o número de ações
        let price =  getQuote(stock); // olha o preço da ação
        total += shares * price; // Adiciona valor das ações ao valor total
    }
    return total; // Retorna o valor total.
}