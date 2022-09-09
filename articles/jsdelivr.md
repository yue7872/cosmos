---
title: jsdelivr加速
date: 7/01/2021 20:36:33
tags: [CDN]
categories: 工具
abbrlink: jsdelivr
---

## 使用jsdelivr加速github文件

新建一个仓库，clone、提交后，在releases里创建一个版本号。

此时就可以用jsdelivr加速访问github的文件了。

使用方法为：

`https://cdn.jsdelivr.net/gh/`用户名/仓库名@版本号/文件路径

例如：https://cdn.jsdelivr.net/gh/yue7872/blogEmoji@1.0/owo.json

如果不使用版本号，则会引用最新资源。

