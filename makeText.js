/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** Make Markov machine from text and generate text from it. */

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
}

/** read file and make text. */

function makeText(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

/** read URL and make text. */

async function makeURLText(url) {
    let res;

    try {
        res = await axios.get(url);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(res.data);
}

/** interpret cmd */

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    makeURLText(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
