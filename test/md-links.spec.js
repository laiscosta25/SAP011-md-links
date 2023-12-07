const { mdLinks } = require('../index.js');

describe('mdLinks', () => {
  const caminhoArquivo = './test/Files/links.md';

  it('deveria retornar erro caso não exista links no arquivo', () => { // para linha 11 do index.js
    return mdLinks(caminhoArquivo, {validate: false}).then((links) => {
      expect(links).toStrictEqual([
        {href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', file: './test/Files/links.md'},
        {href: 'https://nodejs.org/lksndflksnf', text: 'Node.js', file: './test/Files/links.md'},
        {href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays', text: 'Arranjos', file: './test/Files/links.md'},
      ])
    })
  });

  it('deveria retornar links extraídos sem validação quando o validate for false', () => {
    return mdLinks(caminhoArquivo, {validate: false}).then((links) => {
      expect(links).toStrictEqual([
        {href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', file: './test/Files/links.md'},
        {href: 'https://nodejs.org/lksndflksnf', text: 'Node.js', file: './test/Files/links.md'},
        {href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays', text: 'Arranjos', file: './test/Files/links.md'},
      ])
    })
  });

  it('deveria retornar links extraídos com validação quando o validate for true', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 200
    }));

    return mdLinks(caminhoArquivo, {validate: true}).then((links) => {
      expect(links).toStrictEqual([
        {href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', file: './test/Files/links.md', status: 200, ok: 'ok'},
        {href: 'https://nodejs.org/lksndflksnf', text: 'Node.js', file: './test/Files/links.md', status: 200, ok: 'ok'},
        {href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays', text: 'Arranjos', file: './test/Files/links.md', status: 200, ok: 'ok'},
      ])
    })
  });

  it('deveria retornar links extraídos com validação quando o validate for true', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 404
    }));

    return mdLinks(caminhoArquivo, {validate: true}).then((links) => {
      expect(links).toStrictEqual([
        {href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', file: './test/Files/links.md', status: 404, ok: 'fail'},
        {href: 'https://nodejs.org/lksndflksnf', text: 'Node.js', file: './test/Files/links.md', status: 404, ok: 'fail'},
        {href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays', text: 'Arranjos', file: './test/Files/links.md', status: 404, ok: 'fail'},
      ])
    })
  });

  it('deveria retornar links extraídos com validação quando o validate for true', () => {
    global.fetch = jest.fn(() => Promise.reject({

    }));

    return mdLinks(caminhoArquivo, {validate: true}).then((links) => {
      expect(links).toStrictEqual([
        {href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', file: './test/Files/links.md', status: 'Link com erro', ok: 'fail'},
        {href: 'https://nodejs.org/lksndflksnf', text: 'Node.js', file: './test/Files/links.md', status: 'Link com erro', ok: 'fail'},
        {href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays', text: 'Arranjos', file: './test/Files/links.md', status: 'Link com erro', ok: 'fail'},
      ])
    })
  });

});
