let o = { x: 1 };
console.log("x" in o); // => true: o tem propriedade "x"
console.log("y" in o); // => false: o não tem propriedade "y"
console.log("toString" in o); // => true: o herda a propriedade toString

console.log(o.hasOwnProperty("x")); // => true: o tem uma propriedade própria "x"
console.log(o.hasOwnProperty("y")); // => false: o não tem uma propriedade y
console.log(o.hasOwnProperty("toString")); // => false: toString é herdado

console.log(o.propertyIsEnumerable("x")); // => true: o tem uma propriedade enumerável "x"
console.log(o.propertyIsEnumerable("y")); // => false: o não tem a propriedade "y"
console.log(o.propertyIsEnumerable("toString")); // => false: não é enumerável

console.log(o.x !== undefined); // => true: o tem a propriedade "x"
console.log(o.y !== undefined); // => false: o não tem a propriedade "y"
console.log(o.toString !== undefined); // true: o herda a propriedade toString

let ob = { x: undefined }; // Propriedade explicitamente configurada para undefined
console.log(ob.x !== undefined); // => false: propriedade existe mais é undefined
console.log(ob.y !== undefined); // => false: propriedade não existe
console.log("x" in ob); // => true: a propriedade existe
console.log("y" in ob); // => false: a propriedade não existe
console.log(delete ob.x); // => Deleta a propriedade x
console.log("x" in ob); // => false: não existe mais