---
title: canvas相关
date: '4/6/2021 6:22:51 PM'
tags: [canvas, html5, 绘图]
categories: html
abbrlink: html
---

# canvas相关

觉得自己实在太*垃圾*了，就来整理一下，做人还是要 **多总结**。
*****

# canvas设置宽高
- canvas大小默认为300X150；
- 错误的设置宽高，导致画布内内容变形
	使用css设置画布的大小会导致画布按比例缩放你设置的值。（css只是设置canvas在屏幕的显示大小）
- 正确设置方法是设置canvas标签的width height属性。 

```html
<canvas width="450" height="350"></canvas>
```

**注意 没有单位**

#绘画    
    moveTo(); //起始点
	lineTo(); //路线
	stroke(); //结束

例：
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.moveTo(0,0);
    ctx.lineTo(200,100);
    ctx.stroke();
