let a = [1,2,3,4,5];
b = a.reduce((x,y) => x+y, 0); // => 15; the sum of the values
console.log(b); 
c = a.reduce((x,y) => x*y, 1); // => 120; the product of the values
console.log(c);
d = a.reduce((x,y) => (x > y) ? x : y); // => 5; the largest of the values
console.log(d);

// Compute 2^(3^4). Exponentiation has right-to-left precedence
let a1 = [2,3,4];
b1 = a1.reduceRight((acc, val) => Math.pow(val,acc)); // => 2.4178516392292583e+24
console.log(b1);