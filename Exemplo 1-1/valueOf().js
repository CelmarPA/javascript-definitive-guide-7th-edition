let point = {
    x: 3,
    y: 4,
    valueOf: function() { return Math.hypot(this.x, this.y);}
};
console.log(Number(point)); // => 5: valueOf() é usando para converter os números
console.log(point > 4); // => true
console.log(point > 5); // => false
console.log(point < 6); // => true