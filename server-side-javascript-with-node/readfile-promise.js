const util = require("util");
const fs =  require("fs"); // Require the filesystem module
const path = require("path");
const pfs = { // Promise-based variants of some fs functions
    readFile: util.promisify(fs.readFile)
};

function readConfigFile(path) {
    return pfs.readFile(path, "utf-8").then(text => {
        return JSON.parse(text);
    });
}

async function readConfigFile(parth) {
    let text = await pfs.readFile(path, "utf-8");
    return JSON.parse(text);
}