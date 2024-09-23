let o = { x: 1, y: 2, z: 3 };

for(let p in o) { // Atribui os nomes da propriedades de o para p
    console.log(o[p]); // Imprime o valor de cada propriedade
}

let a = [], i  = 0;
for(a[i++] in o) /* empty */;
console.log(a);

for(let i in a) console.log(i);