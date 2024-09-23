let o = {}; // o herda métodos de objeto de Object.prototype
o.x = 1; // e agora ele tem uma propriedade própria x.
let p = Object.create(o); // p herda as propriedades de o e Object.prototype
p.y = 2; // e tem sua uma propriedade própria y.
let q = Object.create(p); // q herda as propriedades de p, o e Object.prototype
q.z = 3; // e tem sua uma propriedade própria z.
let f = q.toString(); // toString é herdado de Object.prototype
console.log(q.x + q.y); // => 3; x e y são herdados de o e p

let unitcircle = { r: 1 }; // Um objeto para herdar
let c = Object.create(unitcircle); // c herda a propriedade r
c.x = 1; c.y = 1; // c define duas propriedade próprias
c.r = 2; // c subescreve sua propriedade herdada
console.log(unitcircle.r); // => 1: o prototipo não é afetado.

let book = {};

let surname = undefined;
if (book) {
    if (book.author) {
        surname = book.author.surname;
    }
}

surname = book && book.author && book.author.surname;

let surnamee = book?.author?.surname;