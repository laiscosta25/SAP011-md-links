const { mdLinks } = require('../index.js');

console.log(mdLinks)
describe('mdLinks', () => {
  const caminhoArquivo = './test/Files/links.md';
  const options = {validate: false};

  it('deveria retornar links extraídos sem validação quando o validate for false', () => {
    return mdLinks(caminhoArquivo, options).then((links) => {
      expect(links).toStrictEqual([
        {href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', file: './test/Files/links.md'},
        {href: 'https://nodejs.org/lksndflksnf', text: 'Node.js', file: './test/Files/links.md'},
        {href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays', text: 'Arranjos', file: './test/Files/links.md'},
      ])
    })
  });

  it('deveria retornar links extraídos com validação quando o validate for true', () => {
    return mdLinks(caminhoArquivo, options).then((links) => {
      expect(links).toStrictEqual([
        {href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', file: './test/Files/links.md'},
        {href: 'https://nodejs.org/lksndflksnf', text: 'Node.js', file: './test/Files/links.md'},
        {href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays', text: 'Arranjos', file: './test/Files/links.md'},
      ])
    })
  });

});
