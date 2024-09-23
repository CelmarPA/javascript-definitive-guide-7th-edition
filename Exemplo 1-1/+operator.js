console.log(1 + 2); // => 3: adição
console.log("1"  + "2"); // => "12": concatenação
console.log("1" + 2); // => "12": contatenação depois de converter número para string
console.log(1 + {}); // => "1[object Object]": concatenação depois de converter objeto para string
console.log(true + true); // 2: adição depois de converter booleano para número
console.log(2 + null); // 2: adição depois de converter null para 0
console.log(2 + undefined); // NaN: adição depois de converter undefined para NaN

console.log(1 + 2 + " blind mice"); // "3 blind mice"
console.log(1 + (2 + " blind mice")); // "12 blind mice"