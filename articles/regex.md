---
title: 正则表达式
date: 10/30/2022 00:40:31
tags: [正则]
categories: 正则
outline: 正则表达式的编写
---

## 贪婪匹配/非贪婪（最小匹配）

\* 和 + 限定符都是贪婪的，因为它们会尽可能多的匹配文字，只有在它们的后面加上一个 ? 就可以实现非贪婪或最小匹配。

例如

```js
const str = "<h1>RUNOOB-菜鸟教程</h1>";
const reg = /<.*>/;
console.log(str.match(reg)); // <h1>RUNOOB-菜鸟教程</h1>

const reg = /<.*?>/;
console.log(str.match(reg)); // <h1>
```

