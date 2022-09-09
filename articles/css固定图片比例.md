---
title: css固定图片比例
date: 8/16/2021 16:45:46
tags: [css]
categories: css
abbrlink: css
---

```css
img {
		width: 100%;
    height: 0;
    padding-top: 70%;
  	background: url(./img.png) no-repeat;
    background-size: cover;
}
```

设置高为0宽为100%，padding设置为图片的高宽比，加属性：`background-size: cover;`；无论如何拖动，图片比例都不变。实现原理：padding参照父元素宽度。

