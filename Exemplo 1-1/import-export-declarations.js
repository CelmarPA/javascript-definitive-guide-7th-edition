import Circle from './geometry/circle.js';
import { PI, TAU } from './geometry/constants.js';
import { magnitude as hypotenuse } from './vectors/utils.js';

// geometry/constants.js
const PI = Math.PI;
const TAU = 2 * PI;
export { PI, TAU };

export const TAU = 2 * Math.PI;
export function magnitude(x,y) { return Math.sqrt(x*x + y*y);
}
export default class Circle { /* class definition omitted
here */ }