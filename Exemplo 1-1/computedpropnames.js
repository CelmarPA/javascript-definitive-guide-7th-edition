const PROPERTY_NAME = "p1";
function computePropertyName() { return "p" + 2; }

let o = {};
console.log(o[PROPERTY_NAME] = 1);
console.log(o[computePropertyName()] = 2);
console.log(o)
let p = {
    [PROPERTY_NAME]: 1,
    [computePropertyName()]: 2
};
console.log(p.p1 + p.p2); // => 3

const extension = Symbol("my extension symbol");
let o1 = {
    [extension]: { /* extension data stored in this object */ } 
};
o1[extension].x = 0; // Isso não vai conflitar com outras propriedades de o
console.log(o1)