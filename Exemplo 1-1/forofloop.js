let data = [1, 2, 3, 4, 5, 6, 7, 8, 9], sum = 0;
for(let element of data) {
    sum += element
}
console.log(sum); // => 45

/*let o = { x: 1, y: 2, z: 3 };
for (let element of o ) { // Lança TypeError porque o não é iterável
    console.log(element);
}*/

let o = { x: 1, y: 2, z: 3 };
let keys = "";
for (let k of Object.keys(o)) {
    keys += k;
}
console.log(keys); // => "xyz"

let s = 0;
for(let v of Object.values(o)) {
    s += v;
}
console.log(s); // => 6

let pairs = "";
for(let [k, v] of Object.entries(o)) {
    pairs += k + v;
}
console.log(pairs); // => "x1y2z3"0

let frequency = {};
for(let letter of "mississippi") {
    if (frequency[letter]) {
        frequency[letter]++;
    } else {
        frequency[letter] = 1;
    }
}
console.log(frequency); // => {m: 1, i: 4, s: 4, p: 2}

let str = "I ❤ 🐈"
for(let l of str) {
    console.log(l);
}

let text = "Na na na na na na na na Batman!";
let wordSet =  new Set(text.split(" "));
let unique = [];
for(let word of wordSet) {
    unique.push(word);
}
console.log(unique); // => ["Na", "na", "Batman!"]

let m = new Map([[1, "one"]]);
for(let [key, value] of m) {
    console.log(key);
    console.log(value);
}