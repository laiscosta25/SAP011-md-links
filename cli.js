
const { mdLinks } = require('./index.js');
const chalk = require('chalk');

const caminhoArquivo = process.argv[2];
const validateOptionIndex = process.argv.indexOf('--validate'); //Obtém o índice da opção --validate nos argumentos da linha de comando.

const options = {
    validate: validateOptionIndex !== -1 //Cria um objeto options que contém a opção validate com base na presença da opção --validate
};

mdLinks(caminhoArquivo, options).then((conteudoArquivo) => {
    if(options.validate) {
        return mdLinks(conteudoArquivo).then(() => {
            for(const link of conteudoArquivo) {
                console.log(
                    chalk.bgPink.bold(link.text) +
                    chalk.white.bold(' URL: ') +
                    chalk.gray(link.href) +
                    (link.ok ? chalk.green('☑ OK ') : chalk.red('☒ FAIL ')) +
                    chalk.white.bold(' Status: ') +
                    chalk.dim(link.status)
                );
            }
        })
    }
})
.catch((err) => {
    console.error(chalk.red('Erro', err));
});