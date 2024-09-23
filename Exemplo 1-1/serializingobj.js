let o = {x: 1, y: {z:[false, null, ""]}}; // Define um objeto teste
let s = JSON.stringify(o); // s == '{"x":1,"y":{"z": [false,null,""]}}'
let p = JSON.parse(s); // p == {x: 1, y: {z: [false, null, ""]}}
console.log(s);
console.log(p);