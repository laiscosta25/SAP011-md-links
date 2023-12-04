const fs = require("fs");

function mdLinks(caminhodoDoArquivo, options){ // extração de links
  return new Promise(function(resolve, reject){
    fs.readFile(caminhodoDoArquivo, "utf8", (err, data) => { //leitura de arquivos
      if(err) reject (err); // rejeita caso tiver um erro

      const pattern = /\[([^\]]+)\]\((https?[^)]+)\)/g; // expressão regular que é usada para busca por padrões como [texto](URL).
      const matches = [...data.matchAll(pattern)];
      if(matches.length < 1) {
        reject("Arquivo não possui links.")
      }
      const links = matches.map(match => {
        return {
          href: match[2],
          text: match[1],
          file: caminhodoDoArquivo
        }
      })
      if(options.validate === false){ // verificar se a pessoa quer fazer a validação de links
        resolve(links);
      } else {
        const linksValidated = links.map(link => { //
          return fetch(link.href).then(response => {
            link.status = response.status
            if (response.status >= 200 && response.status <= 299){ // de 200 a 299 são códigos de sucesso
              link.ok = "ok"
            } else {
              link.ok = "fail"
            }
            return link;
          }
          ).catch(err => {
            link.ok = "fail"
            link.status = "Link com erro"
            return link;
          }
          )
        })
        resolve(Promise.all(linksValidated))
      }
      
    });
  });
}

// mdLinks('./README.md', {validate: true}).then(result => console.log(result))

module.exports = { mdLinks }

// promessa faz uma requisição para um serviço externo
// tratativa de erro catch, tratativa sucesso then
// serviço externo de leitura de aquivos
// fetch é um serviço que retorna uma promise
// callback é uma função que é passada como parametro de outra função
