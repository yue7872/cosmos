---
title: webpack学习：问题记录2
date: 7/21/2021 11:31:44
tags: [webpack,模块,打包,记录]
categories: webpack
abbrlink: webpack
---

# 1、webpack插件splitchunks

SplitChunks插件是什么呢，简单的来说就是Webpack中一个**提取或分离代码**的插件，主要作用是***提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的js文件***。

官网：

> 最初，chunks（以及内部导入的模块）是通过内部 webpack 图谱中的父子关系关联的。`CommonsChunkPlugin` 曾被用来避免他们之间的重复依赖，但是不可能再做进一步的优化。
>
> 从 webpack v4 开始，移除了 `CommonsChunkPlugin`，取而代之的是 `optimization.splitChunks`。



webpack 将根据以下条件自动拆分 chunks：

- 新的 chunk 可以被共享，或者模块来自于 `node_modules` 文件夹
- 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
- 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
- 当加载初始化页面时，并发请求的最大数量小于或等于 30

当尝试满足最后两个条件时，最好使用较大的 chunks。

## optimization.splitChunks的默认配置

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 只提取异步加载的模块出来打包到一个文件中。
      minSize: 20000, // 规定被提取的模块在压缩前的大小最小值，单位为字节，默认为20000，只有超过了20000字节才会被提取。
      maxSize: 0, // 把提取出来的模块打包生成的文件大小不能超过maxSize值，如果超过了，要对其进行分割并打包生成新的文件。单位为字节，默认为0，表示不限制大小。
      minChunks: 1, // 表示要被提取的模块最小被引用次数，引用次数超过或等于minChunks值，才能被提取。
      maxAsyncRequests: 30, // 最大的按需(异步)加载次数，默认为 30。
      maxInitialRequests: 30, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件），默认为30。入口点的最大并行请求数。
      cacheGroups: { // 缓存组配置，默认有vendors和default
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 匹配需拆分chunk的目录
          priority: -10 // 拆分优先级
        },
        default: {
          minChunks: 2, // 覆盖外层minChunks,用于提取被引用指定次数的公共模块，这里默认2次
          priority: -20,
          reuseExistingChunk: true // 是否重用已存在的chunk
        }
      }
    }
```



其中有几项配置详细介绍如下：

1. ***splitChunks.chunks*** 这里有三个值  (async, initial, all) ，默认是async。
   - `async` 只提取异步加载的模块出来打包到一个文件中。
   - `initial` 提取同步加载和异步加载模块，如果xxx在项目中异步加载了，也同步加载了，那么xxx这个模块会被提取两次，分别打包到不同的文件中。
   - `all ` 对所有类型的模块进行拆分。 (一般我们都会配置这个选项)

2. ***异步加载的模块***：通过`import('xxx')` 或 `require(['xxx'],() =>{})`加载的模块。

   ***同步加载的模块***：通过`import xxx` 或 `require('xxx')`加载的模块。

3. ***splitChunks.maxSize*** 的值建议设置成0。比如你设置了30kb, 那么Gzipped大小超过30kb的bundle会继续拆分，直到最终文件Gzipped大小小于30kb。

4. ***splitChunks.cacheGroups*** 可以让我们单独打包符合条件的模块。

5. ***splitChunks.minSize*** 模块文件的原始大小要大于这个值才会被提取。（主要是为了让提取出来的模块有适当大小，而不至于让最后的打包文件又多又小，从而大大增加资源请求数量，增大资源请求总时间，最后得不偿失）。

6. 如果一个模块既在入口文件被引入又在其他地方被引入，那么最后只会被打包到入口文件的主bundle中。

7.  其他需要注意的就是`splitChunks ` 上的配置都会作用于`cacheGroups` 缓存组配置，你可以在缓存组配置重新定义相关的值从而覆盖外层`splitChunks` 的设置值。

# 2、html-webpack-plugin

[`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin)简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件，使用[lodash模板](https://lodash.com/docs#template)提供你自己的模板，或使用你自己的[loader](https://www.webpackjs.com/loaders)。

# 3、html-webpack系列插件和splitchunks共同使用

html-webpack-plugin在多页面时，无法将optimization.splitChunks提取的公共块，打包到页面中。

即公共代码被提取出去，却无法被html-webpack插件打包进页面，只会引入主文件，代码分隔出来的页面中不会引入。

**解决1：在html-webpack-plugin的bata版已经修复，请重新安装**

```bash
npm install --save-dev html-webpack-plugin@next 
```

bata版只需按入口文件引入即可，相关代码分隔出来的js和css都会自动对应引入，所以bata版本最简单，什么都不需要处理

**解决2：代码分隔配置分组中添加name配置，在html-webpack-plugin的chunks配置中把对应的name添加进去**

```js
new HtmlWebpackPlugin( { ... chunks: [ "main", "manifest", "vendors", "common" ] } )

// 提取公共模块，包括第三方库和自定义工具库等
optimization: { // 找到chunk中共享的模块,取出来生成单独的
  chunk splitChunks: { 
    cacheGroups: { 
      vendors: {  // 抽离第三方插件 ... 
        name: "vendors", 
      }, 
      utilCommon: {   // 抽离自定义工具库 
        name: "common", 
      }, 
      runtimeChunk:{ // 为 webpack 运行时代码创建单独的chunk 
          name:'manifest' 
      }
    }
}
```

这样即可打包进去。

***参考***：

cacheGroups 中的每一个缓存块，其实都是一个chunk，你要在html中自动引入，就在htmlWebpackPlugin中把cacheGroups对应的键值加入到chunk数组里。在下面的chunk数组里添加`commons`就可以了。注意后面那个s

```js
return {
  template: `./views/${name}.html`,
  filename: `${name}.html`,
  title: name,
  inject: true,
  hash: true,
  chunks: [name, 'common', 'commons']
};
```

