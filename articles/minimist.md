---
title: webpack学习：npm库
date: '6/04/2021 14:00:00'
tags: [webpack, 模块, 打包, npm]
categories: webpack
abbrlink: webpack
swiper_index: 2
swiper_desc: webpack的npm库
---

# npm库之minimist

## 1、process

先来看一下node.js里的process模块：

process存在于全局对象上，不需要使用require()加载即可使用，process模块主要做两方面的事情：

- 获取进程信息（资源使用、运行环境、运行状态）
- 执行进程操作（监听事件、调度任务、发出警告）

#### 环境变量：process.env

在node服务运行时，经常会判断当前服务运行环境，（生产环境 / 非生产环境）：

```js
if(process.env.NODE_ENV === 'production'){
  console.log('生产环境');
}else{
  console.log('非生产环境')
}
```

#### 异步：process.nextTick(fn)

```js
console.log('海贼王');
process.nextTick(function(){
    console.log('火影忍者');
});
console.log('死神');

// 输出如下
// 海贼王
// 死神
// 火影忍者
```

通过process.nextTick调度的任务是异步任务，EventLoop是分阶段的，每个阶段执行特定的任务，而nextTick的任务在阶段切换的时候就会执行，因此nextTick会比setTimeout(fn, 0)更快的执行。

#### 获取命令行参数：process.argv

process.argv 返回一个数组，数组元素分别如下：

- 元素1：node
- 元素2：可执行文件的绝对路径
- 元素x：其他，比如参数等

```js
// print process.argv
process.argv.forEach(function(val, index, array) {
  console.log('参数' + index + ': ' + val);
});
```

运行命令 `NODE_ENV=dev node argv.js --env production`，输出如下。（不包含环境变量）

```bash
参数0: /Users/a/.nvm/versions/node/v6.1.0/bin/node
参数1: /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.22-node-process/argv.js
参数2: --env
参数3: production
```

#### 当前工作路径：process.cwd() vs process.chdir(directory)

- process.cwd()：返回当前工作路径
- process.chdir(directory)：切换当前工作路径

工作路径的用途不用过多解释了，直接上代码

```js
console.log('Starting directory: ' + process.cwd());
try {
  process.chdir('/tmp');
  console.log('New directory: ' + process.cwd());
}
catch (err) {
  console.log('chdir: ' + err);
}
```

输出如下：

```bash
Starting directory: /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.22-node-process
New directory: /private/tmp
```

## 2、加载环境变量

我们可以直接在node.js指定命令行参数，再用process.argv读取出来

```bash
node index.js --beep=boop -t -z 12 -n5 foo bar
```

结果如下：

```bash
[
  '/usr/local/bin/node',
  '/Users/blairyue/Desktop/yyz/index.js',
  '--beep=boop',
  '-t',
  '-z',
  '12',
  '-n5',
  'foo',
  'bar'
]
```

从上述代码中可以看到，`process.argv` 变量是一个数组，数组前两项分别是 node 程序位置和js脚本位置，数组中随后的元素都是我们启动Node.js后的参数，这些参数以空格分隔成数组。

## 3、minimist

minimist 是一个专门用于处理Node.js启动参数的库，可以将 `process.argv` 中的参数列表转换成更加易于使用的格式：

```js
const argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
// { _: [ 'foo', 'bar' ], beep: 'boop', t: true, z: 12, n: 5 }
```

经过 minimist 解析的`process.argv`是一个对象，例如，我们可以直接从访问 `argv.beep` 得到 `--beep=boop` 参数的值。
