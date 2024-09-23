let s = "Hello, world"; // Começa com algum texto.

// Obtendo porções de uma string
console.log(s.substring(1, 4)); // => "ell": o segundo, terceiro e quarto caracteres.
console.log(s.slice(1, 4)); // => "ell": a mesma coisa
console.log(s.slice(-3)); // => "rld": os três ultimos caracteres
console.log(s.split(", ")) // => ["Hello", "world"]: separa no delimitador da string

// Buscando uma string
console.log(s.indexOf("l")); // => 2: posição da primeira letra l
console.log(s.indexOf("l", 3)); // => 3: posição do primeio "l" até ou depois a 3 posição
console.log(s.indexOf("zz")); // => -1: s não inclui a substring "zz"
console.log(s.lastIndexOf("l")); // => 10: posição da última letra l

// Funções de busca booleanas no ES6 e posterior
console.log(s.startsWith("Hell")); // => true: a string começa assim
console.log(s.endsWith("!")); // => false: s não termina com !
console.log(s.includes("or")); // => true: s inclue substring "or"

// Criando versões modificadas de uma string
console.log(s.replace("llo", "ya")); // => "Heya, world"
console.log(s.toLowerCase()); // => "hello, world"
console.log(s.toUpperCase()); // => "HELLO, WORLD"
console.log(s.normalize()); // Unicode NFC normalization: ES6
console.log(s.normalize("NFD")); // NFD normalization. Also "NFKC", "NFKD"

// Inspecionando caracteres individuais (16 bits) de uma string
console.log(s.charAt(0)); // => "H": o primeiro caracter
console.log(s.charAt(s.length-1)); // => "d": o ultimo caracter
console.log(s.charCodeAt(0)); // => 72: número de 16 bits na posição especificada
console.log(s.codePointAt(0)); // => 72: ES6, funciona para codepoints > 16 bits

// Funções de preenchimento de string no ES2017
console.log("x".padStart(3)); // => "   x": adiciona espaços a esquerda com um comprimento de 3
console.log("x".padEnd(3)); // => "x   ": adiciona espaços a direira com um comprimento de 3
console.log("x".padStart(3, "*")); // => "**x": adiciona asteriscos a direita com um comprimento de 3
console.log("x".padEnd(3, "-")); // => "x--": adiciona traços a direita com  um comprimento de 3

//  Funções de corte de espaço. trim() em ES5 e outros ES2019
console.log(" test ".trim()); // => "test": remove os espaços no inicio e no fim
console.log(" test ".trimStart()); // => "test ": remove os espaços no inicio (a esquerda) também trimLeft
console.log(" test ".trimEnd()); // => " test": remove os espaços no fim (a direita) também trimRight

// Vários métodos de string
console.log(s.concat("!")); // => "Hello, world!": ao invez de simplesmente usa operador + 
console.log("<>".repeat(5)); // => "<><><><><>": concatena n copias. ES6

// Usando [] para acessar caracteres individuais em uma string
console.log(s[0]); // => "H"
console.log(s[s.length-1]); // => "d"

