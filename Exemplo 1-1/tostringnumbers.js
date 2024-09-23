let n = 123456.789;
console.log(n.toFixed(0)); // => "123457"
console.log(n.toFixed(2)); // => "123456.79" 
console.log(n.toFixed(5)); // => "123456.78900"
console.log(n.toExponential(1)); // => "1.2e+5"
console.log(n.toExponential(3)); // => "1.235e+5"
console.log(n.toPrecision(4)); // => "1.235e+5"
console.log(n.toPrecision(7)); // => "123456.8"
console.log(n.toPrecision(10)); // => "123456.7890"

console.log(parseInt("3 blind mice")); // => 3
console.log(parseFloat(" 3.14 meters")); // => 3.14
console.log(parseInt("-12.34")); // => -12
console.log(parseInt("0xFF")); // => 255
console.log(parseInt("0xff")); // => 255
console.log(parseInt("-0xFF")); // => -255
console.log(parseFloat(".1")); // => 0.1
console.log(parseInt("0.1")); // => 0
console.log(parseInt(".1")); // => NaN: inteiros não podem começar com "."
console.log(parseFloat("$72.47")) // => NaN: números não podem começar com "$"

console.log(parseInt("11", 2)); // => 3: (1*2 + 1)
console.log(parseInt("ff", 16)); // => 255: (15*16 + 15)
console.log(parseInt("zz", 36)); // => 1295: (35*36 + 35)
console.log(parseInt("077", 8)); // => 63: (7*8 + 7)
console.log(parseInt("077", 10)); // => 77: (7*10 + 7)
