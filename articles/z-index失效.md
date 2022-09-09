---
title: z-index失效
date: 7/29/2021 14:28:04
tags: [css, z-index]
categories: css
abbrlink: css
---

## z-index失效原因

设置z-index后，没有出现预期结果，可能原因：

#### 1、父级元素溢出隐藏或者不显示

父元素设置了overflow:hidden或者display:none等，导致子元素在父元素外绝对定位，z-index可能不显示。

#### 2、父元素层级低

例如下面的情况，第一个父级DIV的层级是1，第二个父级DIV的层级是2，第一个父级内部的子级DIV是10。由于父级的差距，所以内部子级 z-index设置很大，不会提升到第二个父级上层，就造成了 z-index 无效的假象。

```html
<div style="z-index: 1">
  <div style="z-index: 10">son</div>
</div>
<div style="z-index: 2"></div>
```

#### 3、没有设置定位

使用 z-index 的前提是，需要设置 div 的 定位（eg: position: absolute;）如果元素是标准流，没有定位，那么设置z-index不会使当前元素在另一个元素上方。

#### 4、IE 浏览器不兼容

z-index 有一个属性 inherit，表示子元素继承父元素的 z-index。这个参数在 IE 浏览器上不兼容。

#### 5、注意：

如果项目中层级很复杂（界面 1, modal 100, dialog 1000, mask 500），为了避免层级混乱，最好把 z-index 维护在一个公共的组件内部（一个单独的CSS文件或者单独的JS文件中，使用行内样式），这样修改和后期维护比较方便。
