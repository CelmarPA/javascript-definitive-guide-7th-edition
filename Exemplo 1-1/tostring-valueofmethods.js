console.log(({x: 1, y: 2}).toString()); // => "[object Object]"

console.log([1,2,3].toString()); // => "1,2,3"

console.log((function(x) { f(x); }).toString()); // => "function(x) { f(x); }"

console.log(/\d+/g.toString()); // => "/\\d+/g"

let d = new Date(2020,0,1); 
console.log(d.toString()); // => "Wed Jan 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)"

console.log(d.valueOf()); // => 1577847600000

console.log((Number([])).valueOf());
console.log((Number([99])).valueOf());
console.log((Number([])).toString());
console.log((Number([99])).toString());