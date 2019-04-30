const { URL } = require('url');
const { locations, isEnglishCharOrSpace } = require('./common');

const halfPunctuation = ['.', ',', '?', '!', '"', "'", ':', ';', '(', ')'];

module.exports = {
  names: ['cn-en', 'full-width-punctuation'],
  description: 'Expected full-width punctuation',
  information: new URL('https://www.yuque.com/jeason/box/ispdnv'),
  tags: ['punctuation'],
  function: (params, onError) => {
    // console.log(params.lines);
    const errList = [];
    params.lines.forEach((line, lineNumber) => {
      if (!line) return;
      const haveHp = halfPunctuation.some(hp => line.indexOf(hp) >= 0);
      if (!haveHp) return;

      halfPunctuation.forEach(hp => {
        locations(line, hp).forEach(hpi =>
          errList.push({ lineIndex: hpi, lineNumber, line, hp })
        );
      });
    });

    // console.log(errList);
    errList
      .filter(item => {
        const beforeChar = item.line[item.lineIndex - 1];
        const afterChar = item.line[item.lineIndex + 1];
        if (beforeChar && afterChar) {
          return (
            !isEnglishCharOrSpace(beforeChar) || !isEnglishCharOrSpace(afterChar)
          );
        } else if (beforeChar && !afterChar) {
          return !isEnglishCharOrSpace(beforeChar);
        } else if (!beforeChar && afterChar) {
          return !isEnglishCharOrSpace(afterChar);
        } else {
          return false;
        }
      })
      .forEach(({ lineNumber, lineIndex, line, hp }) => {
        // console.log(line);
        onError({
          lineNumber,
          detail: `'${hp}' not legal`,
          range: [lineIndex, 1],
          context: line.substring(lineIndex - 5, lineIndex + 5),
        });
      });
  },
};
