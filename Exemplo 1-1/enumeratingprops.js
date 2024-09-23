let o = {x: 1, y: 2, z: 3}; // Três propriedade enumeráveis
console.log(o.propertyIsEnumerable("toString")); // false: não enumerável
for(let p in o) { // Itera pelas propriedades
    console.log(p); // Imprime x, y, z, mas não toString
}

for(let p in o) {
    if (!o.hasOwnProperty(p)) continue; // Pula propriedades herdadas
}

for(let p in o) {
    if (typeof o[p] === "function") continue; // Pula todos os métodos
}
