/*function square(x, log) { // O segundo argumento é uma função optional
    if (log) { // Se a função opcional for passada
        log(x); // Invoca log
    }
    return x * x; // Returna o quadrado do argumento
} */

function square(x, log) { // O segundo argumento é uma função opcional
    log?.(x); // Chama a função se existe uma
    return x *x; // Retorna o quadrado do argumento
}

let f = null, x = 0;
try {
    f(x++); // Lança um TypeError porque f é null
} catch(e) {
    x // => 1: x é incrementado antes de lançar a exceção
}
f?.(x++) // => undefined: f é null, mais não tem lançamento de exceção
x // => 1: o incremento é pulado por causo do curto circuito