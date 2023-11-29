const { reject } = require("assert");
const fs = require("fs");

function soma(a, b){
  return a + b;
}

function markdownLinks (filePath){
  return new Promise (function (resolve, reject) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if(err) reject (err);

      const pattern = /\[([^\]]+)\]\((https?[^)]+)\)/g; // expressão regular que é usada para busca por padrões como [texto](URL), onde texto é qualquer texto entre colchetes e URL é uma URL que começa com http ou https 
      const matches = data.match(pattern);



      resolve(matches);
        });
   });
};

markdownLinks('./README.md').then(result => console.log(result))

module.exports = { soma, markdownLinks };

// promessa faz uma requisição para um serviço externo
// tratativa de erro catch, tratativa sucesso then
// serviço externo de leitura de aquivos
// fetch é um serviço que retorna uma promise
// callback é uma função que é passada como parametro de outra função
