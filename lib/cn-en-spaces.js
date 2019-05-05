const { URL } = require('url');
const pangu = require('pangu');

const spacing = txt => {
  const afterProcess = pangu.spacing(txt);
  if (txt.length === afterProcess.length) return { isError: false };
  for (let index = 0; index < txt.length; index += 1) {
    if (txt[index] !== afterProcess[index]) return { isError: true, index };
  }
};

module.exports = {
  names: ['cn-en-03', 'cn-en-spaces'],
  description: 'Should have space between cn & en.',
  information: new URL('https://www.yuque.com/jeason/box/ispdnv'),
  tags: ['cn-en', 'spaces'],
  function: (params, onError) => {
    // console.log(params.lines);
    const errList = [];
    params.lines.forEach((line, lineNumber) => {
      if (!line) return;
      lineNumber += 1;

      const { isError, index: errIndex } = spacing(line);
      if (!isError) return;

      onError({
        lineNumber,
        detail: `Expected "${line.substring(
          errIndex - 4,
          errIndex
        )} ${line.substring(errIndex, errIndex + 3)}"`,
        range: [errIndex, 2],
        context: `...${line.substring(errIndex - 5, errIndex + 5)}...`,
      });
    });
  },
};
