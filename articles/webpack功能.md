---
title: webpack学习：功能篇
date: '5/30/2021 15:00:00'
tags: [webpack, 模块, 打包, Loaders]
categories: webpack
abbrlink: webpack
swiper_index: 4
swiper_desc: webpack的功能
---

# webpack的强大功能

## 1、生成Source Maps（使调试更容易）

开发总是离不开调试，方便的调试能极大的提高开发效率，不过有时候通过打包后的文件，你是不容易找到出错了的地方，对应的你写的代码的位置的，`Source Maps`就是来帮我们解决这个问题的。

通过简单的配置，`webpack`就可以在打包时为我们生成的`source maps`，这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。

在`webpack`的配置文件中配置`source maps`，需要配置`devtool`，它有以下四种不同的配置选项，各具优缺点，描述如下：

| devtool选项                    | 配置结果                                                     |
| ------------------------------ | ------------------------------------------------------------ |
| `source-map`                   | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的`source map`，但是它会减慢打包速度； |
| `cheap-module-source-map`      | 在一个单独的文件中生成一个不带列映射的`map`，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便； |
| `eval-source-map`              | 使用`eval`打包源文件模块，在同一个文件中生成干净的完整的`source map`。这个选项可以在不影响构建速度的前提下生成完整的`sourcemap`，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项； |
| `cheap-module-eval-source-map` | 这是在打包文件时最快的生成`source map`的方法，生成的`Source Map` 会和打包后的`JavaScript`文件同行显示，没有列映射，和`eval-source-map`选项具有相似的缺点； |

正如上表所述，上述选项由上到下打包速度越来越快，不过同时也具有越来越多的负面作用，较快的打包速度的后果就是对打包后的文件的的执行有一定影响。

对小到中型的项目中，`eval-source-map`是一个很好的选项，再次强调你只应该开发阶段使用它，我们继续对上文新建的`webpack.config.js`，进行如下配置:

```js
module.exports = {
  devtool: 'eval-source-map',
  entry: `${__dirname}/app/main.js`,
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  }
};
```

> `cheap-module-eval-source-map`方法构建速度更快，但是不利于调试，推荐在大型项目考虑时间成本时使用。

## 2、使用webpack构建本地服务器

`Webpack`提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以让浏览器监听代码的更改，并自动刷新显示修改后的结果，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖。

```bash
npm install --save-dev webpack-dev-server
```

devserver作为webpack配置选项中的一项，以下是它的一些配置选项，更多配置可参考[这里]()

| devserver的配置选项 | 功能描述                                                     |
| ------------------- | ------------------------------------------------------------ |
| contentBase         | 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录） |
| port                | 设置默认监听端口，如果省略，默认为”8080“                     |
| inline              | 设置为`true`，当源文件改变时会自动刷新页面                   |
| historyApiFallback  | 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为`true`，所有的跳转将指向index.html |

把配置加到webpack的配置文件中，现在的配置文件`webpack.config.js`如下所示：

```js
module.exports = {
  devtool: 'eval-source-map',

  entry: `${__dirname}/app/main.js`,
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './public', // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 不跳转
    inline: true// 实时刷新
  }
};
```

***配置快捷启动***

在`package.json`中的`scripts`对象中添加如下命令，用以开启本地服务器：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
  },
```

在终端中输入`npm run server`即可在本地的`8080`端口查看结果。（这里由于版本问题会报错，解决方式为回退版本）。

## 3、Loaders

`Loaders`是`webpack`提供的最激动人心的功能之一了。通过使用不同的`loader`，`webpack`有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。

Loaders需要单独安装并且需要在`webpack.config.js`中的`modules`关键字下进行配置，Loaders的配置包括以下几方面：

- `test`：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
- `loader`：loader的名称（必须）
- `include/exclude`:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
- `query`：为loaders提供额外的设置选项（可选）

## 4、plugin

**插件**是 webpack 的支柱功能。webpack 自身也是构建于你在 webpack 配置中用到的**相同的插件系统**之上！

插件目的在于解决***loader***无法实现的**其他事**：loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

## 5、dependencies和devDependencies

对于我们依赖的这些插件库，有的是我们开发所使用的，有的则是项目所依赖的。对于这个分界线，我们诞生了`dependencies`和`devDependencies`，具体却别如下：

- `devDependencies`：开发环境使用
- `dependencies`：生产环境使用

