---
title: webpack学习：loader篇
date: '5/30/2021 23:00:00'
tags: [webpack, Loaders, 模块, 打包]
categories: webpack
abbrlink: webpack
---

# webpack之Loader

单开一篇记录一下loader！

### Babel

Babel其实是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：

- 让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；
- 让你能使用基于JavaScript进行了拓展的语言，比如React的JSX；

#### Babel的安装与配置

Babel其实是几个模块化的包，其核心功能位于称为`babel-core`的npm包中，webpack可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的`babel-env-preset`包和解析JSX的`babel-preset-react`包）。

```bash
// npm一次性安装多个依赖模块，模块之间用空格隔开
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
```

在`webpack`中配置Babel的方法如下:

```js
module: {
  rules: [
    {
      test: /(\.jsx|\.js)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            'env', 'react'
          ]
        }
      },
      exclude: /node_modules/
    }
  ];
}
```

现在你的webpack的配置已经允许你使用ES6以及JSX的语法了。继续用上面的例子进行测试，不过这次我们会使用React，记得先安装 React 和 React-DOM.

接下来我们使用ES6的语法，更新`Greeter.js`并返回一个React组件

```jsx
//Greeter,js
import React, {Component} from 'react'
import config from './config.json';

class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter
```

修改`main.js`如下，使用ES6的模块定义和渲染Greeter模块

```jsx
// main.js
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

render(<Greeter />, document.getElementById('root'));
```

再start就可以看到打包后的内容了。

### 一切皆模块

Webpack有一个不可不说的优点，它把所有的文件都都当做模块处理，JavaScript代码，CSS和fonts以及图片等等通过合适的loader都可以被处理。

webpack提供两个工具处理样式表，`css-loader` 和 `style-loader`，二者处理的任务不同，`css-loader`使你能够使用类似`@import` 和 `url(...)`的方法实现 `require()`的功能,`style-loader`将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

```js
module: {
  rules: [
    {
      test: /(\.jsx|\.js)$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }
      ]
    }
  ];
}
```



> 请注意这里对同一个文件引入多个loader的方法。即写在rules里，大括号包裹，逗号隔开。

在app文件夹中新建main.css:

```css
/* main.css */
html {
  box-sizing: border-box;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6, p, ul {
  margin: 0;
  padding: 0;
}
```

在main.js中引入文件 `import './main.css‘`

通常情况下，css会和js打包到同一个文件中，并不会打包为一个单独的css文件，不过通过合适的配置webpack也可以把css打包为单独的文件的。

