const { URL } = require('url');

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

      // const reg = new RegExp(
      //   '(([\u4e00-\u9fa5])([A-Za-z]))|(([A-Za-z])([\u4e00-\u9fa5]))',
      //   'g'
      // );
      const reg1 = /([\u4e00-\u9fa5])([0-9a-zA-Z])/g;
      const reg2 = /([0-9a-zA-Z])([\u4e00-\u9fa5])/g;
      const rules = [
        /([\u4e00-\u9fa5])([0-9a-zA-Z])/g,
        /([0-9a-zA-Z])([\u4e00-\u9fa5])/g,
      ];

      rules.forEach(reg => {
        while ((tmparr = reg1.exec(line)) !== null) {
          // console.log(tmparr);
          // errList.push({ lineNumber, index: tmparr.index });
          const errIndex = tmparr.index + 1;
          onError({
            lineNumber,
            detail: `Should have space between '${tmparr[1]}' and '${
              tmparr[2]
            }'`,
            range: [errIndex, 2],
            context: `...${line.substring(errIndex - 5, errIndex + 5)}...`,
          });
          // console.log(`Found ${tmparr[0]}. Next starts at ${reg1.lastIndex}.`);
        }
      });
    });
    // console.log(errList);
  },
};
