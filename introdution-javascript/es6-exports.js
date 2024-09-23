/*
export const PI = Math.PI;

export function degreesToRadians(d) { return d * PI / 180; }

export class Circle {
    constructor(r) { this.r = r; }
    area() { return PI * this.r * this.r; }
}
*/
const PI = Math.PI;

function degreesToRadians(d) { return d * PI / 180; }

class Circle {
    constructor(r) { this.r = r; }
    area() { return PI * this.r * this.r; }
}

export { Circle, degreesToRadians, PI};

/* export default class BitSet {
    // Implementation omitted
}
*/

/*
export {
    layout as calculateLayout,
    render as renderLayout
};
*/

// export { Math.sin as sin, Math.cos as cos }; // SyntaxError