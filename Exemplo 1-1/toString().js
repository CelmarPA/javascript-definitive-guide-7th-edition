let s = { x: 1, y: 1 }.toString(); // s == "[object Object]"
console.log(s)

let point1 = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; }
}
console.log(String(point1)) // => "(1, 2)": toString() é usado para conversões de string

let point = {
    x: 1000,
    y: 2000,
    toString: function() { return `(${this.x}, ${this.y})`;},
    toLocaleString: function() {
        return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;
    }
};
console.log(point.toString()); // => "(1000, 2000)"
console.log(point.toLocaleString()); // => "(1.000, 2.000)": note o separador milenar
    