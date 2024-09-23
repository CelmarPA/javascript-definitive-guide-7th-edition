function factorial(x) {
    // Se a entrada do usuário é inválida, lança uma excessão!
    if (x < 0) throw new Error("x must not be negative");
    // Caso contrário, calcula e retorna normalmente
    let f;
    for(f = 1; x > 1; f *= x, x--) /* empty */;
    return f;
}

try {
    // Pede ao usuário para digitar um número
    let n = Number(prompt("Please enter a positive integer", ""));
    // Calcula o fatorial do número, assumindo que é um valor válido
    let f = factorial(n);
    // Mostra o resultado 
    alert(n + "!" + " = " + f);
}
catch(ex) { // Se a entrada do usuário não for válida, terminamos aqui
    alert(ex); // Conta ao usuário que erro é
}