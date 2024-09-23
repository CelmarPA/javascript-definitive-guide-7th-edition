function hypotenuse(a, b) {
    function square(x) { return x*x; }
    return Math.sqrt(square(a) + square(b)).toFixed(3);
}
console.log(hypotenuse(2 ,2));