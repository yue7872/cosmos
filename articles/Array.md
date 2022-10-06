---
title: 数组操作
date: '4/1/2021 8:03:37 PM'
tags: [js, 数组]
categories: js基础
abbrlink: js
---

# 数组操作

面试觉得自己实在太*垃圾*了，就来整理一下常问问题，做人还是要 **多总结**。
*****

### 数组的一些操作
concat()，连接两个或更多的数组，**返回结果**。`arr.concat(12,arr1,arr2,34)`

pop(),删除并返回数组**最后一个元素**。 arr.pop(),数组为空则不改变数组 返回undefined

push(),向数组的末尾添加一个或多个元素，**返回新的长度**。  可以push数组。但不会展开，生成二维数组，`arr.push([1,2],34)`,不像concat会全部展开，而是以数组的形式保存着。

shift()，删除并返回数组**第一个元素**。和pop类似。

unshift(),向数组的开头添加一个或多个元素，**返回新的长度**。和push类似。

slice()，从已有的数组中返回选定的元素。