---
title: feflow套件开发
date: 6/28/2021 18:48:40
tags: [feflow]
description: '这篇文章为加密内容, 请输入密码查看.'
categories: feflow
abbrlink: feflow
swiper_index: 10
swiper_desc: feflow套件开发
random: false
---

# feflow套件开发功能

## 1. 配置文件

### 描述：

安装套件时，在根目录生成配置文件，`.feflow.config.json` ，可配置项目的类型、图片压缩、是否使用新文件名等。

### 要点：

1. 默认配置文件内容：

   ```json
   {
     "projectType": "react",
     "imageMinify": true,
     "cssNewFile": true
   }
   ```

   各项配置含义：

   - `projectType`: 代表项目类型，包括react（nemo项目），static（静态项目），component（组件库项目）等，默认为react。
   - `imageMinify`: 代表是否开启图片压缩功能，如果设置为false，则该项目下的所有图片都不会被压缩。如果只有部分图片无需压缩，将其放在img文件夹下的unmin文件夹即可，可参考目录结构。
   - `cssNewFile`: 代表css文件名是否需要加时间戳，如果设为false，则每次发布都是不带时间戳的css文件，如 index.css。

2. 如果本地已经有配置文件，重新安装套件时，就不会再进行覆盖。如果删除了配置文件，安装时就会重新生成默认的配置文件。

## 2. 目录结构

### 描述：

项目目录结构

### 要点：

1. projects是项目目录

2. .feflow.config.json为项目配置文件

3. .feflowrc.json为开发套件命令注册文件

4. coding_ci.yaml和coding_start.py为流水线配置文件

5. 在项目目录下的slice文件夹里的图片会被合并成雪碧图，unmin里的图片不会被压缩

6. 目录结构见下图：

   <img src="/Users/blairyue/Desktop/feflow目录.png" style="zoom:50%;" />

   <img src="/Users/blairyue/Desktop/feflow目录2.png" style="zoom:50%;" />

   

## 3. 文件打包

### 描述：

build样式文件使之符合发布准备

*注：build环节无需用户输入，内置在publish环节里，publish规则与build一致*

### 要点：

1. 支持单个页面打包，比如fef build index 只打包首页
2. 支持多层级引入,例如：import (./a/b/c/d.css)
3. img src资源打包同步
4. 支持文件路径打包 fef build src/projects/index
5. 在打包时，引用的css文件或图片不存在，会给出提示，并终止打包。

## 4. css处理

### 描述：

与maxim保持一致。

### 要点：

1. build后的css文件底部加上时间戳：#FEFLOW{content:ble202106221010}
2. 支持scss/sass和less文件
3. css会被压缩，采用的是cssnano
4. 支持新样式属性的编译
5. css默认加时间戳，具体可参照配置文件`cssNewFile`属性

## 5. 新建项目

### 描述：

新增新建项目、页面、组件的功能。

### 要点：

命令分别为：
新建子项目：fef sub name
新建页面：fef page name
新建组件：fef com name

## 6. 雪碧图

### 描述：

slice文件夹下的图片资源会被拼合为一张雪碧图。

### 要点：

1. 雪碧图的合并包括png和svg图片文件，两种格式的会被分别合并为一张雪碧图。如：`sprite-index.png`和`sprite-index.svg`。
2. 雪碧图的时间戳后缀，规则与css文件一致。默认有后缀，`cssNewFile`设置为false时，雪碧图也没有时间戳后缀。

## 7. 图片压缩

### 描述：

对资源图片选用合理机制合理压缩图片。

### 要点：

1. 默认图片都会被压缩，unmin文件夹下的文件不会压缩。

2. 如果在`.feflow.config.json` 里配置：`imageMinify": false`，则所有图片都不会被压缩。

3. 图片压缩方案

   采用`image-webpack-loader` 来进行压缩。具体的方案：

   - jpg： mozjpeg
   - png：pngquant
   - gif：gifsicle
   - svg：svgo

   压缩率在65%--85%之间。

## 8. 代码规范性检测

### 描述：

本地开发时执行 fef lint 可进行代码规范性检测。

### 要点：

1. 采用eslint进行规范性检测
2. fef lint 后跟项目名，可检测单个项目，如 fef lint index
3. 支持自动修复，后跟参数即可，如 fef lint -f
4. 参数和项目名可同时使用，如 fef lint index -f 即自动修复index项目

## 9. 本地开发

### 描述：

本地开发时执行 fef start 可快速启动本地开发服务器。

### 要点：

1. 支持单个项目启动，比如fef start index 只启动首页
2. 支持热更新，本地修改即可刷新页面
3. 如果启动多个项目，修改 http://localhost:8001/index.html 其中的项目名即可
