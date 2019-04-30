const { URL } = require('url');

module.exports = {
  names: ['cn-en-02', 'period-outside-brackets'],
  description: 'Period should outside brackets at line end.',
  information: new URL('https://www.yuque.com/jeason/box/ispdnv'),
  tags: ['cn-en', 'punctuation'],
  function: (params, onError) => {
    // console.log(params.lines);
    const errList = [];
    params.lines.forEach((line, lineNumber) => {
      if (!line) return;
      lineNumber += 1;

      const errIndex = line.indexOf('。）');
      if (errIndex < 0) return;
      onError({
        lineNumber,
        detail: `Expected '）。'`,
        range: [errIndex + 1, 2],
        context: `...${line.substring(errIndex - 5, errIndex + 5)}...`,
      });
    });
  },
};
