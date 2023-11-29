const fs = require("fs");

function mdLinks(caminhodoDoArquivo){
  return new Promise(function(resolve, reject){
    fs.readFile(caminhodoDoArquivo, "utf8", (err, data) => {
      if(err) reject (err);

      const pattern = /\[([^\]]+)\]\((https?[^)]+)\)/g; // expressão regular que é usada para busca por padrões como [texto](URL), onde texto é qualquer texto entre colchetes e URL é uma URL que começa com http ou https 
      const matches = [...data.matchAll(pattern)];
      const links = matches.map(match => {
        return {
          href: match[2],
          text: match[1],
          file: caminhodoDoArquivo
        }
      })
      resolve(links);
    });
  });
}

mdLinks('./README.md').then(result => console.log(result))

module.exports = { mdLinks }

// promessa faz uma requisição para um serviço externo
// tratativa de erro catch, tratativa sucesso then
// serviço externo de leitura de aquivos
// fetch é um serviço que retorna uma promise
// callback é uma função que é passada como parametro de outra função
