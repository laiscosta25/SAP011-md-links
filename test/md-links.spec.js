const mdLinks = require('../cli.js');


describe('mdLinks', () => {
  const caminhoArquivo = './README.md';
  const options = {validate: false};

  it('deveria retornar links extraídos sem validação quando o validate for false', () => {
    return mdLinks(caminhoArquivo, options).then((links) => {
      expect(links).toStrictEqual([
        {href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', file: './README.MD'},
        {href: 'https://nodejs.org/lksndflksnf', text: 'Node.js', file: './README.MD'},
        {href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays', text: 'Arranjos', file: './README.MD'},
      ])
    })
  });

});
