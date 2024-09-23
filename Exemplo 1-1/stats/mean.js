import { sum } from "./constants.js";

const mean = data => data.reduce(sum) / data.length;

export { mean };