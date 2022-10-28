---
title: css问题记录
date: 4/06/2022 17:56:08
tags: [css,记录]
categories: css
abbrlink: css
---

# css问题记录

#### 1. after/before 的content设为中文字符，浏览器偶尔显示乱码

解决方案： 把中文字符转化为unicode编码。工具： https://tool.chinaz.com/Tools/Unicode.aspx

转化后生成的编码中，把u去掉，如删除 => \u5220\u9664\u000d\u000a => \5220\9664\000d\000a，用这个编码替换掉原来的content即可。

#### 2.小程序scroll-view，IOS下拉底色问题：

在scroll-view上设置

```css
background: linear-gradient(to bottom, #08a89c 0%, #08a89c 50%, #edf2f2 50%, #edf2f2 100%);
```

其中#08a89c 和 #edf2f2 分别对应下拉色和页面底色。注意scroll-view里的内容至少占据50%，否则会多出来一块颜色块。

可以设置min-height: 50%;

#### 3.渐变边框的实现

```css
.box {
  border: 4px solid transparent;
  border-radius: 16px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #222, #222), linear-gradient(90deg, #8F41E9, #578AEF);
}
```
