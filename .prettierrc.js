module.exports = {
  trailingComma: "none",
  tabWidth: 2,
  semi: false,
  printWidth: 800, // 超过最大值换行
  useTabs: false, // false缩进不使用tab，使用空格
  semi: false, // true句尾添加分号
  singleQuote: false, // true使用单引号代替双引号
  proseWrap: "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  arrowParens: "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  endOfLine: "lf", // 结尾是 \n \r \n\r auto
  htmlWhitespaceSensitivity: "ignore",
  ignorePath: ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  requireConfig: false // Require a 'prettierconfig' to format prettier
}
