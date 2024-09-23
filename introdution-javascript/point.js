class Point { // Por convenção nome de classes são maiúsculos.
    constructor(x, y) { // Função constructor para inicializar novas instâncias.
        this.x = x; // This palavra chave é o novo objeto sendo inicializado.
        this.y = y; // Os argumentos são armazenados como propriedades do objeto.
    } // Retorno não é necessário em funções constructor.

    distance() { // Método para calcular a distância a partir do ponto de origem.
        return Math.sqrt( // Retorna a raiz quadrada de x² + y²
            this.x * this.x + // this se refere ao objeto Point no qual o método distance foi chamado.
            this.y * this.y
        );
    }
}

// Usa a função constructor de  Point com "new" para criar objetos de Point.
let p = new Point(1, 1); // O ponto geometrico (1,1).

// Agora usa um método do objeto Point p.
let d = p.distance();
console.log(d);