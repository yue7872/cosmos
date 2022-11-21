---
title: z-index失效
date: 7/29/2021 14:28:04
tags: [css, z-index]
categories: css
abbrlink: css
---

## z-index 失效原因

设置 z-index 后，没有出现预期结果，可能原因：

#### 1、父级元素溢出隐藏或者不显示

父元素设置了 overflow:hidden 或者 display:none 等，导致子元素在父元素外绝对定位，z-index 可能不显示。

#### 2、父元素层级低

例如下面的情况，第一个父级 DIV 的层级是 1，第二个父级 DIV 的层级是 2，第一个父级内部的子级 DIV 是 10。由于父级的差距，所以内部子级 z-index 设置很大，不会提升到第二个父级上层，就造成了 z-index 无效的假象。

```html
<div style="z-index: 1">
  <div style="z-index: 10">son</div>
</div>
<div style="z-index: 2"></div>
```

#### 3、没有设置定位

使用 z-index 的前提是，需要设置 div 的 定位（eg: position: absolute;）如果元素是标准流，没有定位，那么设置 z-index 不会使当前元素在另一个元素上方。

#### 4、IE 浏览器不兼容

z-index 有一个属性 inherit，表示子元素继承父元素的 z-index。这个参数在 IE 浏览器上不兼容。

#### 5、fixed 定位

父元素设置为 fixed 定位，会导致 background-color 失效，子元素设置 z-index 也会*看起来*失效。

```html
<style>
  .box {
    width: 100%;
    height: 100px;
    background-color: #000;
    position: fixed;
    top: 0;
    left: 0;
    color: aliceblue;
  }
  /* .outer {
      width: 100%;
      height: 100%;
      background-color: green;
      position: relative;
    } */
  .inner {
    width: 100px;
    height: 50px;
    background-color: red;
    position: relative;
    z-index: -1;
    margin-top: 80px;
  }
</style>
<body>
  <div class="box">
    这是父元素上的文字
    <div class="outer">
      <div class="inner">
        这是z-index -1的元素
      </div>
    </div>
  </div>
</body>
```

而实际上只有 background-color 和 box-shadow 等失效，z-index 依然有效。验证方法是把 inner 上移到与 box 上的文字重合，可以看到文字盖在了 inner 上面。
因此，z-index 依然有效，只是看起来失效。
解决方案是把 background-color 和 box-shadow 等属性放到 outer 上。

#### 6、注意：

如果项目中层级很复杂（界面 1, modal 100, dialog 1000, mask 500），为了避免层级混乱，最好把 z-index 维护在一个公共的组件内部（一个单独的 CSS 文件或者单独的 JS 文件中，使用行内样式），这样修改和后期维护比较方便。
