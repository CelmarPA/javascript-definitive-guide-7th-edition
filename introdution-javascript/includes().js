let a = [1,true,NaN];
console.log(a.includes(true)); // => true
console.log(a.includes(2)); // => false
console.log(a.includes(NaN)); // => true
console.log(a.indexOf(NaN)); // => -1; indexOf can't find NaN