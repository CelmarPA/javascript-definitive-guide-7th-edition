// Processing Arrays with Functions

// Non-functional style
let data = [1,1,3,5,5]; // This is our array of numbers

// The mean is the sum of the elements divide by the number os elements
let total = 0
for(let i = 0; i < data.length; i++) total += data[i];
let mean = total/data.length; // mean == 3; The mean of our data is 3

// To compute the standard deviation, we first sum the squares of
// the deviation of each element from the mean.
total = 0;
for(let i = 0; i < data.length; i++) {
    let deviation = data[i] - mean;
    total += deviation * deviation;
}
let stddev = Math.sqrt(total/(data.length-1)); // stddev == 2
console.log(stddev);

// Functional style
// First, define two simple functions
const sum = (x,y) => x+y;
const square = x => x*x;

// Then uise those functions with Array methods to compute mena and stddev
let datas = [1,1,3,5,5]
let m = datas.reduce(sum) / datas.length; // mean == 3
let dev = datas.map(x => x-m);
let standarddev = Math.sqrt(dev.map(square).reduce(sum)/(data.length - 1)); // => 2
console.log(standarddev)

// Funtional versions of map() and reduce() methods:
const map = function(a, ...args) { return a.map(...args); };
const reduce = function(a, ...args) { return a.reduce(...args);};

// New code to compute mean and stardard deviation
const s = (x,y) => x+y;
const sq = x => x*x;
let d = [1,1,3,5,5];
let me = reduce(d, s)/d.length;
let deviat = map(d, x => x-me);
let standdev = Math.sqrt(reduce(map(deviat, sq), s)/(d.length - 1));
console.log(standdev);