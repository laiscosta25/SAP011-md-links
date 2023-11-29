
const { soma, markdownLinks } = require('./index.js');
const chalk = require('chalk');
const resultado = soma(1, 3);

console.log(chalk.bgCyan('A soma é:'), chalk.magenta(resultado));

markdownLinks ('./README.md')
.then((conteudoArquivo) => {
    console.log(chalk.bgYellow(conteudoArquivo))
});