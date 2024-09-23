export class Circle{
    constructor(radius) { this.r = radius; }
    area() { return Math.PI * this.r * this.r; }
    circumference() { return 2  * Math.PI * this.r; }
};