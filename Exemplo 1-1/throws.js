function factorial(x) {
    // Se o argumento de entrada é inválido, lança uma excessão!
    if (x < 0) throw new Error("x must not be negative");
    let f;
    for(f = 1; x > 1; f *= x, x--) /* empty */;
    return f;
}

console.log(factorial(4)) // => 24
console.log(factorial(-1))