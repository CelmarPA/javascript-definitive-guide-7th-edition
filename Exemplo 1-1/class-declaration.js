class Circle{
    constructor(radius) { this.r = radius; }
    area() { return Math.PI * this.r * this.r; }
    circumference() { return 2  * Math.PI * this.r; }
}

let circ = new Circle(5);

console.log(circ.area().toFixed(2));
console.log(circ.circumference().toFixed(2));

export { Circle };