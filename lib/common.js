// 从一个字符串中找出某个字符的全部索引
module.exports.locations = (string, substring) => {
  let a = [],
    i = -1;
  while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);
  return a;
};

// 判断一个字符是否为英文字符或者是空格
module.exports.isEnglishCharOrSpace = s => /[a-zA-Z]|\s/i.test(s);
