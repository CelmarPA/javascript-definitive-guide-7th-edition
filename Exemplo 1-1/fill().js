let a = new Array(5); // Inicia sem elementos e length 5
a.fill(0); // => [0,0,0,0,0]; fill the array with zeros
console.log(a);
a.fill(9,1); // => [0,9,9,9,9]; fill with 9 starting at index 1
console.log(a);
a.fill(8, 2, -1); // => [0,9,8,8,9]; // fill with 8 at indexes 2, 3
console.log(a);