let options = { timeout: 0, title: "", verbose: false, n: null };
console.log(options.timeout ?? 1000); // => 0: como definido no objeto
console.log(options.title ?? "Untitled"); // "":  como definido no objeto
console.log(options.verbose ?? true); // => false: como definido no objeto
console.log(options.quiet ?? false); // => false: propriedade não definida
console.log(options.n ?? 10); // => 10: propriedade é null