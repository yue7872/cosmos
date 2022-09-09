---
title: webpack学习：基础篇
date: '5/28/2021 16:00:00'
tags: [webpack, 模块, 打包, npm]
categories: webpack
abbrlink: webpack
swiper_index: 3
swiper_desc: webpack的基础
---

## 1、webpack是什么

`webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包器，当 `webpack` 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 `bundle`。

WebPack可以看做是**模块打包机**：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

***也就是将各种类型的资源，包括图片、css、js等，转译、组合、拼接、生成 JS 格式的 bundler 文件。***

参照官网图：

<img src="/img/post/webpack.png" alt="webpack" style="zoom:50%;" />

## 2、webpack工作方式

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

## 3、webpack的核心概念

- 入口(entry)：打包的入口
- 输出(output)：打包的出口
- loader：loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
- 插件(plugins)：在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

## 4、开始使用webpack

#### 正式使用Webpack前的准备

1. 在上述练习文件夹中创建一个package.json文件，这是一个标准的npm说明文件，里面蕴含了丰富的信息，包括当前项目的依赖模块，自定义的脚本任务等等。在终端中使用`npm init`命令可以自动创建这个package.json文件。输入这个命令后，终端会问一堆问题，回车默认即可。

2. package.json文件就绪后，安装webpack作为依赖包

   ```bash
   //安装webpack
   npm install --save-dev webpack
   
   //全局安装的话
   npm install -g webpack
   ```

3. 回到my-wp文件夹，新建app public文件夹，app用来存放原始数据和js模块，public用来存放之后供浏览器读取的文件（包括使用webpack打包生成的js文件以及一个`index.html`文件）。接下来我们再创建三个文件:

- `index.html` --放在public文件夹中;

- `Greeter.js`-- 放在app文件夹中;

- `main.js`-- 放在app文件夹中;

  

我们在**index.html**文件中写入最基础的html代码，它在这里目的在于引入打包后的js文件（这里我们先把之后打包后的js文件命名为`bundle.js`，之后我们还会详细讲述）。

```html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>mywebpack</title>
</head>
<body>
	<div id="root"></div>
	<script src="bundle.js"></script>
</body>
</html>

```



我们在`Greeter.js`中定义一个返回包含问候信息的`html`元素的函数,并依据CommonJS规范导出这个函数为一个模块：

```js
// Greeter.js
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings!";
  return greet;
};
```

`main.js`文件中我们写入下述代码，用以把`Greeter模块`返回的节点插入页面。

```js
//main.js 
const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());
```

在根目录下（my-wp）新建一个名为`webpack.config.js`的文件，用来配置webpack。

```js
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```

> **注**：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。

之后在命令行里运行`webpack`命令就可以了。这条命令会自动引用`webpack.config.js`文件中的配置选项.

可以看出`webpack`同时编译了`main.js` 和`Greeter,js`,现在打开`index.html`,可以看到我们输出的Hello World了。



#### 更快捷的执行打包任务

在命令行中输入命令需要代码类似于`node_modules/.bin/webpack`这样的路径其实是比较烦人的，不过值得庆幸的是`npm`可以引导任务执行，对`npm`进行配置后可以在命令行中使用简单的`npm start`命令来替代上面略微繁琐的命令。在`package.json`中对`scripts`对象进行相关设置即可，设置方法如下。

```json
{
  "name": "webpack-sample-project",
  "version": "1.0.0",
  "description": "Sample webpack project",
  "scripts": {
    "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
  },
  "author": "zhang",
  "license": "ISC",
  "devDependencies": {
    "webpack": "3.10.0"
  }
}
```

> **注：**`package.json`中的`script`会安装一定顺序寻找命令对应位置，本地的`node_modules/.bin`路径就在这个寻找清单中，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。

npm的`start`命令是一个特殊的脚本名称，其特殊性表现在，在命令行中使用`npm start`就可以执行对应的命令，如果对应的此脚本名称不是`start`，想要在命令行中运行时，需要这样用`npm run {script name}`如`npm run build`。

现在只需要执行`npm start`就可以打包文件了。

