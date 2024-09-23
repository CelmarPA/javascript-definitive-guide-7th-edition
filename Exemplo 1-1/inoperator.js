let point = { x: 1, y: 1}; // Define um objeto
console.log("x" in point); // => true: objeto tem a propriedade nominada "x"
console.log("z" in point); // false: objeto não tem a propriedade "z"
console.log("toString" in point); // => true: objetos herdam o método toString

let data = [7,8,9]; // Um array com elementos (indices) 0, 1, e 2
console.log("0" in data); // => true: array temn um elemento "0"
console.log(1 in data); // => true: números são convertidos para strings
console.log(3 in data); // => false: não tem elemento 3
