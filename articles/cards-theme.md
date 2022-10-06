---
title: cards主题
date: '6/22/2021 15:05:32'
tags: [themes]
categories: hexo
abbrlink: theme
---

## Cards主题

用了一段时间花里胡哨的	[Matery](https://github.com/blinkfox/hexo-theme-matery)	感觉看起来很乱，也不太适合一个干净整洁的博客，于是换了个主题，叫cards，这里是链接：[Cards](https://theme-cards.ichr.me/)   . 使用文档比较具体，就不记录怎么使用了，记录一下踩的坑。

### 1、评论系统 minivaline

使用的评论系统文档：https://minivaline.js.org/docs/v5/cn/#/

配置如下：

```yaml
# MiniValine
minivaline:
  appId: t8ltzv6dfc6LY2PyUHg63qji-gzGzoHsz
  appKey: kLUU303uYNpQC2FUrzrWiBAi
  mode: xCss # xCss
  avatarD: retro
  math: true
  enableFlag: true
  master: [85947f1b17a8c872e90bc01764a99268]
  tagMeta: [博主, 小伙伴, 访客]
  placeholder: 留个评论再走吧！
  md: true
  region: true
  enableUA: true
  RecordIP: true
  pageSize: 6
```



- 其中appId和appKey都是在leancloud中获取。

- enableFlag设置为true后，填写master的邮箱（md5加密后的），可自动带上flag标志。

- region设置为true后，需要修改js文件，下载minivaline的js文件，这个主题用的是很早的版本，所以要下这个版本，在里面修改。（最新版本的minivaline需要配置后端，我懒得弄 ）

  修改如下：

  ![miniValine](/img/post/miniValine.png)

  即在html里生成region信息。(有bug/已取消)

- 设置参数minivaline.pageSize时，若设置为超过6的数，则会报错409。原因是leancloud里该应用最大工作线程数限制为6，当一页显示评论数大于6时，就会报请求过多的错误。免费的开发版有用量限制啊😭。

### 2、代码高亮

在设置代码高亮的时候，照着官方教程走了一遍，发现显示不出来我引入的css样式，后来在`head`里发现这么一句话：

```html
<link rel="stylesheet" id="hl-default-theme" href="https://cdn.jsdelivr.net/npm/prismjs@1.21.0/themes/prism-okaidia.min.css" media="none">
```

我一看，好家伙，这是直接把我引入的样式文件禁用了啊。

在主题文件的文件夹下 `cards-layout-plugins-highlight-prismjs-source.ejs`里，可以看到如下内容：

```ejs
<% if (config.highlight.enable !== true && config.prismjs.enable === true && page.cover === false) { %>
    <% if (theme.vendors.prismjs) { %>
        <link rel="stylesheet" id="hl-default-theme" href="<%= `${theme.vendors.prismjs}${theme.style.prismjs.default || 'prism'}.css` %>" media="none">
        <% if (theme.darkmode === true && (theme.style.prismjs.darkmode !== theme.style.prismjs.default || theme.style.prismjs.darkmode === null)) { %>
            <link rel="stylesheet" id="hl-dark-theme" href="<%= `${theme.vendors.prismjs}${theme.style.prismjs.darkmode || 'prism-dark'}.css` %>" media="none">
        <% } %>
    <% } else { %>
        <link rel="stylesheet" id="hl-default-theme" href="<%= `https://cdn.jsdelivr.net/npm/prismjs@1.21.0/themes/${theme.style.prismjs.default || 'prism'}.min.css` %>" media="none">
        <% if (theme.darkmode === true && (theme.style.prismjs.darkmode !== theme.style.prismjs.default || theme.style.prismjs.darkmode === null)) { %>
            <link rel="stylesheet" id="hl-dark-theme" href="<%= `https://cdn.jsdelivr.net/npm/prismjs@1.21.0/themes/${theme.style.prismjs.darkmode || 'prism-dark'}.min.css` %>" media="none">
        <% } %>
    <% } %>
    <% if (config.prismjs.line_number === true) { %>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.21.0/plugins/line-numbers/prism-line-numbers.min.css" media="none" onload="this.media='all'">
    <% } %>
<% } %>
```

可以看到，不管判断条件满足哪一条，最终的media都会被设置为none（除了line_number），所以之前不管我怎么设置，都只能显示line_number的样式。

不知道是不是官方的问题，不过不重要，下载下来这个主题，那他就是我的了。反正只设置一次，简单粗暴地直接把所有的none改为all，解决。

效果如下：

![highLight](/img/post/cardsHightlight.png)

### 3、太丑了！

我配置完发现cards有点过于简单，要添加样式还要自己修改好多东西，换一个！
