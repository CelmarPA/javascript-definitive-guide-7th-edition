// Lê blocos de um fluxo assíncrono e os imprime
async function printStream(stream) {
    for await (let chunk of stream) {
        console.log(chunk)
    }
}