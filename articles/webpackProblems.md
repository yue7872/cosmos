---
title: webpack学习：报错篇
date: '5/30/2021 22:00:00'
tags: [webpack, 模块, 打包]
categories: webpack
sticky: 1
abbrlink: webpack
---

### 1、webpack5 ： 启动 webpack-dev-server 报错 ： “Cannot find module 'webpack-cli/bin/config-yargs”

分析原因：
webpack，webpack-cli 以及 webpack-dev-server版本不兼容

解决方案： 回退版本，等待官方解决兼容性问题再升级webpack
亲测回退版本有效

```js
"webpack": "^4.43.0",
"webpack-cli": "^3.3.12",
"webpack-dev-server": "^3.11.0"
```

### 2、babel报错： **Plugin/Preset files are not allowed to export objects, only functions.**

又又又是版本问题，**原因：babel版本冲突，6和7版本改动较大，存在兼容问题**

**解决办法:**

将babel版本全部升级为7，或者将版本全部降到6。

直接

```bash
npx babel-upgrade --write
```

**还要修改.babelrc文件**

这个文件需要自己在根目录下新建：

```json
{
   "presets": ["@babel/react", "@babel/env"],
}
```

### 3、image-webpack-loader安装报错，包括mozjpeg、pngquant、gifsicle等。

解决方案：

直接

```bash
brew install automake autoconf libtool dpkg pkgconfig nasm libpng
```

让它装，装完就好了。

### 4、npm install 时报 phantomjs-prebuilt@2.1.14 安装失败

```BASH
\#13 645.9 npm ERR! code ELIFECYCLE

\#13 645.9 npm ERR! errno 1

\#13 645.9 npm ERR! phantomjs-prebuilt@2.1.16 install: `node install.js`

\#13 645.9 npm ERR! Exit status 1

\#13 645.9 npm ERR! 

\#13 645.9 npm ERR! Failed at the phantomjs-prebuilt@2.1.16 install script.

\#13 645.9 npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```

解决方案：

```bash
npm install phantomjs-prebuilt@2.1.14 --ignore-scripts
```

即可

### 5、输入npm install 报错node-sass@4.13.0 postinstall:`node scripts/build.js` Failed at the node-sass@4.13.0

是因为sass安装时获取源的问题，先修改sass安装的源，再运行`npm install`就成功了

```bash
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
```

### 6、node-sass/vendor找不到等之类的问题

```javascript
Error: ENOENT: no such file or directory, scandir '/home/hartron/foodnetteam/codebase/mandi/node_modules/node-sass/vendor'
    at Error (native)
    at Object.fs.readdirSync (fs.js:952:18)
    at Object.getInstalledBinaries (/home/hartron/foodnetteam/codebase/mandi/node_modules/node-sass/lib/extensions.js:121:13)
    at foundBinariesList (/home/hartron/foodnetteam/codebase/mandi/node_modules/node-sass/lib/errors.js:20:15)
    at foundBinaries (/home/hartron/foodnetteam/codebase/mandi/node_modules/node-sass/lib/errors.js:15:5)
    at Object.module.exports.missingBinary (/home/hartron/foodnetteam/codebase/mandi/node_modules/node-sass/lib/errors.js:45:5)
    at module.exports (/home/hartron/foodnetteam/codebase/mandi/node_modules/node-sass/lib/binding.js:15:30)
    at Object.<anonymous> (/home/hartron/foodnetteam/codebase/mandi/node_modules/node-sass/lib/index.js:14:35)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
```

```bash
./src/styles/index.scss
Module build failed (from ./node_modules/@tencent/tea-scripts/node_modules/mini-css-extract-plugin/dist/loader.js):
ModuleBuildError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):
Error: Missing binding /Users/blairyue/Desktop/cloud-tencent-UI/expense/node_modules/node-sass/vendor/darwin-x64-64/binding.node
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 10.x

Found bindings for the following environments:
  - OS X 64-bit with Node.js 10.x
  - OS X 64-bit with Unsupported runtime (83)
```



解决方案：

```bash
npm update
npm install
node node_modules/node-sass/scripts/install.js
npm rebuild node-sass
```

### 7、ModuleNotFoundError: No module named 'requests'

```bash
ModuleNotFoundError: No module named 'requests'
[13:08:10][ERROR]Error: Command failed: python3 coding-start.py list
Traceback (most recent call last):
  File "/Users/blairyue/Desktop/test/feflow-lab/coding-start.py", line 5, in <module>
    import requests
ModuleNotFoundError: No module named 'requests'
```

解决方案：

安装python3

```bash
brew install python3
```

```bash
#安装pip
sudo easyinstall pip

#处理pip安装报错
curl 'https://bootstrap.pypa.io/get-pip.py' > get-pip.py
sudo python3 get-pip.py

#安装requests库
sudo pip install requests
```

即可解决

### 8、jsx文件不写后缀无法识别，

在webpack.config.js文件中增加一条：

```js
  resolve: {
    extensions:[".js",".jsx",".json"],
  },
```

即可省略后缀

### 9、sass-loader引用资源的问题

> 由于 Sass/libsass 并没有提供url rewriting 的功能，所以所有的链接资源都是相对输出文件(output)而言。
>
> - 如果生成的 CSS 没有传递给 css-loader，它相对于网站的根目录。
>
> - 如果生成的 CSS 传递给了 css-loader，则所有的 url 都相对于入口文件（例如：main.scss）。
>
> 第二种情况可能会带来一些问题。正常情况下我们期望相对路径的引用是相对于 .scss 去解析（如同在 .css 文件一样）。幸运的是，有2个方法可以解决这个问题：
>
> 1. 将 resolve-url-loader 设置于 loader 链中的 sass-loader 之后，就可以重写 url。
> 2. Library 作者一般都会提供变量，用来设置资源路径，如 bootstrap-sass 可以通过 $icon-font-path 来设置。参见this working bootstrap example。

所有的 url 都相对于入口文件（例如：`main.scss`）会带来资源找不到的问题，即如果不是在同一个文件夹下，没法正确解析使用的相对路径。

解决方式：

使用resolve-url-loader来解决sass-loader缺少url rewriting的功能。

```js
// ...
'resolve-url-loader',
  {
  loader: 'sass-loader',
  options: {
    sourceMap: true
  },
},
```

安装`resolve-url-loader` ，在sass-loader后引用即可。

**注：需要sass-loader开启sourceMap。**

### 10、sass的问题

```bash
Error: Function rgb is missing argument $green.
        on line 30 of src/components/SaleCard/style/index.scss

> >box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 20%), -8px -8px 20px 0 #f
```

带/的sass解析不了，node-sass 不支持颜色级别4，所以改用dart-sass。

安装dark-sass：`npm install sass -D`

在webpack中添加：

```json
{
  loader: 'sass-loader',
  options: {
    implementation: require('sass'), //采用dart-sass替换掉node-sass
  },
},
```

即可解决。

### 11、webpack处理不了sass/scss的语法

loader的test，要把sass和less分开写

```json
test: /.(c|sa|sc)ss$/,
```

分别处理，不能把lessloader和sass-loader写在一起。

### 12、shelljs不打印输出

[cross-spawn](https://www.npmjs.com/package/cross-spawn)

YYDS!

### 13、svg?fill=#fff 的处理

在css的loader配置里需要用到 'svg-transform-loader/encode-query', 来将?转为%23的形式，不然css-loader不会处理?后的参数，写在resolve-url-loader上面。

在svg的loader配置里用到'svg-transform-loader',处理fill，记得把svg的名字hash值开启，不然无法正确生成不同颜色的。

### 14、CopyPlugin的问题 

compilation.getCache ERROR  TypeError: compilation.getCache is not a function
问题：安装的版本过高

```bash
npm uninstall copy-webpack-plugin --save
npm install copy-webpack-plugin@6.2.1 --save
```

### 15、image-webpack-loader的问题 

提示mozjpeg找不到
问题：安装的版本过高

将image-webpack-loader版本降至6.0.0

```js
Error: spawn xxx/node_modules/mozjpeg/vendor/cjpeg ENOENT
```

执行 npm rebuild

### 16、路径存在，但resolve-url-loader识别不到

cssloader 的 importLoaders 数过小，设置为之后的loader数。

### 17、pnpm链接的形式，会导致组件库换肤出问题？

见20

### 18、.DS_Store

.DS_Store是Mac OS保存文件夹的自定义属性的隐藏文件，如文件的图标位置或背景色，相当于Windows的desktop.ini。

1、禁止.DS_store生成：打开   “终端” ，复制黏贴下面的命令，回车执行，重启Mac即可生效。

```bash
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE
```

2、恢复.DS_store生成： 

```bash
defaults delete com.apple.desktopservices DSDontWriteNetworkStores
```

### 19、image-webpack-loader报错

```js
ModuleBuildError: Module build failed (from ./node_modules/.pnpm/image-webpack-loader@6.0.0/node_modules/image-webpack-loader/index.js):
RangeError: Maximum call stack size exceeded
```

压缩图片出了问题，是因为svg里只写了base64的image，导致svg无法被压缩。

解决方案：

关闭图片压缩 或者 将这张svg图放到不压缩的文件夹下

### 20、打包成功，访问html出错

```bash
Error: Minified React error #321; visit https://reactjs.org/docs/error-decoder.html?invariant=321 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
Uncaught Error: Minified React error #321; visit https://reactjs.org/docs/error-decoder.html?invariant=321 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
```

pnpm使用独创的基于symlink的node_modules结构，只允许访问package.json中的引入packages（严格）。

React/react-dom没有在package.json中引入，所以访问不到。

解决方案:

新增react/react-dom的依赖

### 21、热更新报错

```
index.js:62 Uncaught Error: Invalid URL
    at ./node_modules/normalize-url/index.js.module.exports (index.js:62:1)
    at getReloadUrl (hotModuleReplacement.js:90:1)
    at hotModuleReplacement.js:79:1
    at NodeList.forEach (<anonymous>)
    at reloadStyle (hotModuleReplacement.js:76:1)
    at update (hotModuleReplacement.js:119:1)
    at invokeFunc (debounce.js:95:1)
    at trailingEdge (debounce.js:144:1)
    at timerExpired (debounce.js:132:1)
./node_modules/normalize-url/index.js.module.exports @ index.js:62
getReloadUrl @ hotModuleReplacement.js:90
（匿名） @ hotModuleReplacement.js:79
reloadStyle @ hotModuleReplacement.js:76
update @ hotModuleReplacement.js:119
invokeFunc @ debounce.js:95
trailingEdge @ debounce.js:144
timerExpired @ debounce.js:132
setTimeout（异步）
leadingEdge @ debounce.js:103
debounced @ debounce.js:172
hotApplyInternal @ bootstrap:593
hotApply @ bootstrap:361
cb @ process-update.js:76
（匿名） @ process-update.js:91
Promise.then（异步）
check @ process-update.js:90
./node_modules/webpack-hot-middleware/process-update.js.module.exports @ process-update.js:52
processMessage @ client.js:279
handleMessage @ client.js:139
handleMessage @ client.js:102
```

碰到个奇怪的报错，热更新失效，会报上面这个错。

通过打断点，一步步调试，发现normalize-url 下面这里的代码：

```js
const urlObj = url.parse(str);
if (opts.normalizeHttps && urlObj.protocol === 'https:')
  urlObj.protocol = 'http:';

if (!urlObj.hostname && !urlObj.pathname)
  throw new Error('Invalid URL');
```

str是 'https', 就是说传入了一个空字符串，热更新的问题，那就是css-hot-loader传给normalize-url的值。

在css-hot-loader的hotModuleReplacement.js里发现这样一个函数：

```js
function reloadStyle(src) {
  const elements = document.querySelectorAll('link');
  let loaded = false;

  forEach.call(elements, (el) => {
    if (el.visited === true)
      return;

    const url = getReloadUrl(el.href, src);
    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });

  return loaded;
}
```

这里会选中html里的`<link>`标签，把它的href的值传给normalize-url，从而实现html中的css的热更新。而html-template-dev里有这样一个标签：

```html
<link rel="stylesheet" id="custom" /> <!-- custom 用于脚本填入项目自定义的样式 -->
```

没有href属性，所以传入的str为空值。

这样就导致Invalid URL。
