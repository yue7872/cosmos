---
title: 字符串翻转
date: '4/1/2021 8:03:37 PM'
tags: [js, js基础, 字符串]
categories: js基础
abbrlink: js
---

# 字符串翻转

面试觉得自己实在太*垃圾*了，就来整理一下常问问题，做人还是要 **多总结**。
*****

### 字符串翻转还是比较好实现的，不过还是要多几种思路。
1、利用charAt，从尾部遍历，再逐个拼接。
``` bash
var result = '';
for(let i = str.lenght - 1 ;i > 0 ;i--){
	result += str.charAt(i);
}
return result;
```
2、利用数组reverse。
``` str.split('').reverse().join("")```

3、利用栈实现
栈先进后出、将元素压入栈内，再输出，即可实现翻转。
可以利用数组模拟栈。
