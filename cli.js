
const { mdLinks } = require('./index.js');
const chalk = require('chalk');

const caminhoArquivo = process.argv[2];
console.log(caminhoArquivo)
const options = {
    validate: process.argv.includes("--validate") // verifica se '--validate' está incluído
};

mdLinks(caminhoArquivo, options).then(result => console.log(result)).catch(result => console.log(result)) // printa no terminal.