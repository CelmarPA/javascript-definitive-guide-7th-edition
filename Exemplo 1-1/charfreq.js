// Exemplo 1-1: Calculando histrogramas de frequência de caracteres com JavaScript:

/*
* Esse programa Node lê um texto de um input padrão e calcula a frenquência
* de cada letra no texto, e exibe um histograma dos caracteres mais
* frequentimente utilizados. É necessário Node 12 ou superior para rodar.
*
* Em um ambiente Unix-type você pode chamar o programa assim:
*  node charfreq.js < corpus.txt
*
*/

// Essa classe extende Map  para que o método get() returne o valor especificado em vez de null quando a ckey não está no map
class  DefaultMap extends Map {
    constructor(defaultValue) {
        super(); // Chama a Superclasse constructor
        this.defaultValue = defaultValue; // Lembra do valor padrão
    }

    get(key) {
        if (this.has(key)) { // Se a key já estiver no mapa
            return super.get(key); // Retorna o valor da Superclasse
        } 
        else {
            return this.defaultValue; // Caso contrário returna o valor padrão
        }
    }
}

// Essa classe calcula e mostra os histogramas de frenquência das letras
class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0); // Mapa de letras para contagem
        this.totalLetters = 0; // Quantas letras no total
    }

    // Esta função atualiza o histograma com as letras do texto
    add(text) {
        // Remove os espaços em brando do text, e converte para maiúsculas
        text = text.replace(/\s/g, "").toUpperCase();

        // Agora itera pelos caracteres do texto
        for(let character of text) {
            let count = this.letterCounts.get(character); // Obtém a contagem antiga
            this.letterCounts.set(character, count+1); // Incrementa a contagem
            this.totalLetters++;
        }
    }

    // Converte o histograma para uma string que mostra um grafico ASCII
    toString() {
        // Converte o Mapa para um array de [key, value] arrays
        let entries = [...this.letterCounts];

        // Organiza o array pela contagem, e em seguida alfabeticamente
        entries.sort((a,b) => { // Uma função para definir a order de organização
            if (a[1] === b[1]) { // Se a contagem for a mesma
                return a[0] < b[0] ? -1 : 1; // Organiza alfabeticamente
            } else { // Se a contagem for diferente 
                return b[1] - a[1]; // Organiza pela maior contagem
            }
        });

        // Converte as contagens em porcentagens
        for(let entry of entries) {
            entry[1] = entry[1] / this.totalLetters * 100;
        }

        // Descarta qualquer entrada menor que 1%
        entries = entries.filter(entry => entry[1] >= 1);

        // Agora converte cada entrada para uma linha de texto
        let lines = entries.map(
            ([l,n]) => `${l}: ${"#".repeat(Math.round(n))}
            ${n.toFixed(2)}%`
        );

        // E retorna as linhas concatenadas, separadas por caracteres de novas linhas
        return lines.join("\n");
    }
}

// Esta função assíncrona (retorno de promessa) cria um histograma objeto, 
// lê de forma assíncrona pedaços de texto da entrada padrão e adiciona esses pedaços ao 
// histograma. Quando chega ao final do fluxo, ele retorna este histograma

async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8"); // Lê Unicode strings e não bites
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}

// Esta linha final de código é corpo principal  do programa.
// Isto faz um Objeto Histogram da entrada padrão, então imprime o histrograma.
histogramFromStdin().then(histogram => {
    console.log(histogram.toString()); });
