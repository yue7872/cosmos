---
title: alfred学习：问题记录
date: 7/05/2021 15:00:00
tags: [alfred,记录]
categories: 工具
abbrlink: alfred
---

# alfred问题记录

## 1、snippets快速展开失效

打开偏好设置，发现报错：

`loginwindow seems to be preventing text expansion by locking secure input`

什么什么安全输入之类的，官方说是有别的应用侵占了安全输入，或者是启动的时候输入密码之类的问题。

我直接重启电脑可以解决。

这里是官方文档的解释：[Snippets and Text Expansion Troubleshooting](https://www.alfredapp.com/help/troubleshooting/snippets/)

## 2、snippets + vim bug

如 !co 我期望得到

```js
console.log('x');
```

但在vim里，会显示为!coconsole.log('x');

解决方案：

snippets => Auto Expansion Options => tweaking => Simulated key event speed: 调到最低



