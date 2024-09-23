for(let i = 0; i < a.length; i++) {
    if (a[i] === target) break;
}

let matrix = getData(); // Obtém um array 2D de números de algum lugar
// Agora soma todos os números da matriz
let sum = 0, success = false;
// Começa com um declaração rotulada que podemos pular fora se houver erros
computeSum: if (matrix) {
    for(let x = 0; x < matrix.length; x++) {
        let row = matrix[x];
        if(!row) break computeSum;
        for(let y = 0; y < row.length; y++) {
            let cell = row(y);
            if (isNaN(cell)) break computeSum;
            sum += cell;
        }
    }
    success = true;
}
// As instruções break saltam aqui. Se chegarmos aqui com sucesso == falso
// então havia algo errado com a matriz que recebemos
// Caso contrário, sum contém a soma de todas as células do matriz.