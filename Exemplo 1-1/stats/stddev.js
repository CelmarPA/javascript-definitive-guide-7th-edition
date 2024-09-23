import { square, sum } from "./constants.js";
import { mean } from "./mean.js";

const stddev = d => {
    let m = mean(d);
    return Math.sqrt(d.map(x => x - m).map(square).reduce(sum) / (d.length - 1));
}

export { stddev };