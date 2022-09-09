---
title: butterfly主题
date: '6/23/2021 18:30:58'
tags: [themes]
categories: hexo
abbrlink: theme
---

## Butterfly主题

换上cards之后，发现，这也太简单了！他还告诉我要专注于内容输出而非折腾，说的很有道理，但是我选择换个好看一点的皮肤再输出！

这次吸取教训，提前看了点主题的demo，发现butterfly最合我心意，有点花里胡哨但又没那么花里胡哨，所以就来换一套这个！

地址：[butterfly](https://butterfly.js.org/posts/21cfbf15/#%E5%AE%89%E8%A3%9D)

生态也很丰富，各种魔改教程，如：https://yangchaoyi.vip/

一样不多做过程记录，主要记录一下遇到的问题。

### 1、复制

把主题文件夹中的 _config.yml 复制到 Hexo 根目录里，同时重新命名为 _config.butterfly.yml。

以后只需要在 _config.butterfly.yml进行配置就行。

这里注意是把theme butterfly里的config复制到主目录下，而不是主目录的config。

### 2、top_img报错

`top_img.indexOf is not a function` 出现这个错误的原因是：

在之前用的matery主题中，有一个是否在封面轮播的选项，将cover值在md文件里设置为true，而在butterfly里，cover的值为文章封面即顶部图片，应该为字符串，所以报错。

解决方法： 在md文件中，删除`cover:true`这一项即可。

### 3、引入permalink

引入了 `permalink: :abbrlink/:title/` 这样的东西每次写博客的时候前面加上 abbrlink: 这样就能优化链接显示,即把原来的日期换成了填写的abbrlink。👍

### 4、豆瓣

在豆瓣中想读、想看、看过，即可在blog中更新。

用的这个插件：https://github.com/jerryc127/butterfly-plugins/tree/main/hexo-butterfly-douban

**注意：**不是书单/片单。而且这个写完后就不能hexo d了 因为会和hexo douban冲突，所以hexo de吧😂。

### 5、养鱼

在主题配置的 `inject` 引入 js: https://cdn.jsdelivr.net/gh/xiabo2/CDN@latest/fishes.js **即可**

顺便调整页脚阴影透明度 `themes\butterfly\source\css\_layout\footer.styl`

### 6、养狗

```bash
npm install --save hexo-helper-live2d
```

安装完之后，可以在这里预览模型。 https://huaji8.top/post/live2d-plugin-2.0/

选择喜欢的下载就好。即替换下面的这个wanko：

```bash
npm install live2d-widget-model-wanko
```

打开站点配置文件，添加

```yaml
live2d:	
	enable: true	
	scriptFrom: local	
	model: 		
		use: live2d-widget-model-haruto #模型选择	
	display: 		
		position: right  #模型位置		
		width: 150       #模型宽度		
		height: 300      #模型高度	
	mobile: 		
    show: false      #是否在手机端显示
```

Hero g s就能养啦。



### 7、各种插件

这个主要是参照大佬的博客，配置之类都很详细，用就完事。

[链接](https://zfe.space/categories/%E6%95%99%E7%A8%8B/)

### 8、评论系统

每天都在疯狂搞评论系统，~~又没有人评论搞这么久干嘛~~。

详情参照大佬的博客：[这里](https://blog.hclonely.com/posts/409d3090/)，注意

