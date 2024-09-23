let value = 2;
let o = {
    // Um propriedade comum de dados
    dataProp: value,

    // Um propriedade de acesso definida como um par de funções
    get acessorProp() { return this.dataProp;  },
    set acessorProp(value) { this.dataProp = value; }
};

let p = {
    // x e y são propriedades read-write regulares
    x: 1.0,
    y: 1.0,

    // r é uma propriedades de acesso read-write com getter e setter.
    // Não se esqueça de colocar vírgula depois do método de acesso.
    get r() { return Math.hypot(this.x, this.y); },
    set r(newvalue) {
        let oldvalue = Math.hypot(this.x, this.y);
        let ratio =  newvalue / oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },

    // theta é uma propriedade de acesso read-only com apenas getter
    get theta() { return Math.atan2(this.y, this.x); }
}; 
console.log(p.r); // => Math.SQRT2
console.log(p.theta) // => Math.PI / 4

let q = Object.create(p); // Um novo objeto que herda getters e setters
q.x = 3, q.y = 4; // Cria as propriedades  de dados próprias de q
console.log(q.r); // => 5: a propriedade de acesso herdada funciona
console.log(q.theta); // => Math.atan2(4, 3)

// Esse  objeto gera estritamente números serais incrementados
const serialnum = {
    // Essa propriedade guarda próximo número serial
    // O _ na no nome da propriedade indica que é apenas para uso interno
    _n: 0,
    // Retorna o valor atual incrementado
    get next() {  return this._n++; },
    // Define o novo valor de n, mas apenas se for maior que o atual
    set next(n) {
        if (n > this._n) this._n = n;
        else throw new Error("serial number can only be set to a larger value");
    }
};
serialnum.next = 10; // Define o valor inicial do número serial
console.log(serialnum.next); // => 10
console.log(serialnum.next); // => 11: valores diferentes cada vez que chamanos next

// Esse objeto tem propriedades de acesso que retornam números aleátorios
// A expressão "random.octet", por exemplo, gera um número aleátorio entre 0 e 255 cada vez que é avaliada
const random = {
    get octet() { return Math.floor(Math.random()* 256); },
    get uint16() { return Math.floor(Math.random()* 65536); },
    get int16() { return Math.floor(Math.random() * 65536) - 32768; }
};

console.log(random.octet);
console.log(random.uint16);
console.log(random.int16);