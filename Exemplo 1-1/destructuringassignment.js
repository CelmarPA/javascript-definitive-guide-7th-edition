/*
let [x,y] = [1,2]; // Mesmo  que let x = 1, y= 2
[x,y] = [x+1,y+1]; // Mesmo que x = x + 1, y = y + 1
console.log(x, y);
[x,y] = [y,x]; // Troca os valores das duas variáveis
console.log([x,y]); // => [3, 2]: os valores incrementados e trocados


// Converte coordenadas [x,y] para [r, theta] coordenadas polares
function toPolar(x, y) {
    return [Math.sqrt(x*x+y*y), Math.atan2(y,x)];
}

// Converte polar para coordenadas cartesianas
function toCartesian(r, theta) {
    return [(r*Math.cos(theta)), (r*Math.sin(theta))];
}

let [r,theta] = toPolar(1.0, 1.0); // r == Math.sqrt(2); theta == Math.PI/4
console.log([r,theta]);
let [x,y] = toCartesian(r,theta); // [x,y] == [1.0,1.0]
console.log([x,y]);

let o = { x: 1, y: 2 }; // O objeto que iremos iterar sobre
for(const [name, value] of Object.entries(o)) {
    console.log(name, value); // Imprime "x 1" e "y 2"
}

let [i, k] = [1]; // x == 1; y == undefined
console.log([i, k]);
[i, k] = [1, 2, 3]; // x == 1; y == 2
console.log([i, k]);
[,i,,k] = [1,2,3,4]; // x == 2; y == 4
console.log([i, k]);

let [u, ...t] = [1,2,3,4]; // t == [2,3,4]
console.log([u, t])

let [a, [b, c]] = [1, [2,2.5], 3]; // a == 1; b == 2; c == 2.5
console.log([a, [b, c]]);

let [first, ...rest] = "Hello"; // first == "H"; rest == ["e", "l", "l", "o"]
console.log([first, rest]);
*/

let transparent = { r: 0.0, g: 0.0, b: 0.0, a: 1.0}; // Uma cor RGBA
console.log(transparent);
let {r, g, b} = transparent;
console.log("Red:", r, "Green:", g, "Blue:", b);


// Mesmo que const sin = Math.sin, cos = Math.cos, tan = Math.tan
const {sin, cos, tan} = Math;

// Mesmo que const cosine = Math.cos, tangent = Math.tan;
const {cos: cosine, tan: tangent} = Math;

let pointss = [{x: 1, y: 2}, {x: 3, y: 4}]; // Um array de dois objetos pontos
let [{x: x_1, y: y_1}, {x: x_2, y: y_2}] = pointss; // Desestruturado em 4 variáveis
console.log((x_1 === 1 && y_1 === 2 && x_2 === 3 && y_2 === 4)); // => true

let points_2 = { p1: [1, 2], p2: [3, 4] }; // Um objeto com 2 arrays de propriedades
let { p1: [x01, y01], p2: [x02, y02]} = points_2; // Desentruturado em 4 variáveis
console.log(x01 === 1 && y01 === 2 && x02 === 3 && y02 === 4); // => true

// Começa com a estrutura de dados e uma desestruturação complexa
let points = [{x: 1, y: 2}, {x: 3, y: 4}];
let [{x: x1, y: y1}, {x: x2, y: y2}] = points;

// Verifica sua sintaxe de desestruturação invertendo a atribuição
let points2 = [{x: x1, y: y1}, {x: x2, y: y2}]; // points2 == points
console.log(points2);
console.log(points);