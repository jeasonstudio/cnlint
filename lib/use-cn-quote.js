const { URL } = require('url');
const ruleList = [
  { source: '“', target: '『' },
  { source: '”', target: '』' },
  { source: '‘', target: '「' },
  { source: '’', target: '」' },
];

module.exports = {
  names: ['cn-en-04', 'use-cn-quote'],
  description: 'Use 『』or「」',
  information: new URL('https://www.yuque.com/jeason/box/ispdnv'),
  tags: ['cn-en', 'punctuation'],
  function: (params, onError) => {
    // console.log(params.lines);
    const errList = [];
    params.lines.forEach((line, lineNumber) => {
      if (!line) return;
      lineNumber += 1;

      for (let ri = 0; ri < ruleList.length; ri++) {
        const { source, target } = ruleList[ri];
        const errIndex = line.indexOf(source);
        if (errIndex >= 0) {
          onError({
            lineNumber,
            detail: `Change ${source} to ${target}`,
            range: [errIndex, 2],
            context: `...${line.substring(errIndex - 5, errIndex + 5)}...`,
          });
        }
        const targetIndex = line.indexOf(target);
        if (targetIndex >= 0) {
          if (line[targetIndex - 1] === ' ' || line[targetIndex + 1] === ' ') {
            onError({
              lineNumber,
              detail: `Unexpected space arround ${target}`,
              range: [targetIndex, 2],
              context: `...${line.substring(targetIndex - 5, targetIndex + 5)}...`,
            });
          }
        }
      }

      // onError({
      //   lineNumber,
      //   detail: `Expected "${line.substring(
      //     errIndex - 4,
      //     errIndex
      //   )} ${line.substring(errIndex, errIndex + 3)}"`,
      //   range: [errIndex, 2],
      //   context: `...${line.substring(errIndex - 5, errIndex + 5)}...`,
      // });
    });
  },
};
