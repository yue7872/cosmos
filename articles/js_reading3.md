---
title: js读书笔记系列（三）
tags: [js, 红宝书, 读书笔记, 数据类型]
categories: js基础
abbrlink: js
date: 2021-03-20 00:00:00
---



面试觉得自己实在太*垃圾*了，就来看看基础，做人还是要 **多读书**。
*****
# 基本概念

### 1. 语法   

- 区分大小写   
- 命名规范：第一个字符为字母、下划线、或$
- 不同语句之间打分号，变量可以同时定义多个，用','隔开
``` bash  
function test(){ 
	var sum = a + b;
	var diff = a - b; 
} 
var a = 1,b = 2,c = 3;
```

### 2. 数据类型

- 五种基本/简单数据类型：Undefined、Null、Boolean、Number、String
- 一种复杂数据类型：Object
- ES6新引入数据类型：Symbol

(1)**typeof操作符**
``` bash  
var a = "abc";
typeof a;// "string"
typeof (typeof(1));//"string" typeof 总是返回一个字符串

var b = 123;
typeof b;// "number"
typeof NAN;//"number"  尽管它是"Not-A-Number" (非数值) 的缩写。

var c = true;
typeof c;// "boolean"

var f = undefined;
typeof f;// "undefined"
typeof undefined;//"undefined"

var g;
typeof g;// "undefined"
typeof x;// "undefined"

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';
```

(2) **typeof null**
在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"。
``` bash  
typeof null === 'object';  //JavaScript诞生以来便是如此。
```

(3)**语法中的括号**
``` bash  
var iData = 99;

typeof iData + ' Wisen'; // 'number Wisen'
typeof (iData + ' Wisen'); // 'string'
```
(4)**错误与例外**（占个坑 看完ES6回头再来看）
在 ECMAScript 2015 之前，typeof 总能保证对任何所给的操作数返回一个字符串。即便是没有声明的标识符，typeof 也能返回 'undefined'。使用 typeof 永远不会抛出错误。
但在加入了块级作用域的 let 和 const 之后，在其被声明之前对块中的 let 和 const 变量使用 typeof 会抛出一个 ReferenceError。块作用域变量在块的头部处于“暂存死区”，直至其被初始化，在这期间，访问变量将会引发错误。

另外存在一个例外：在 Web 领域中被归类为对原 ECMA JavaScript 标准的“故意侵犯”。（据说已废弃）
``` bash
typeof document.all === 'undefined';
```

#### undefined
``` bash
var message; // 这个变量声明后默认取得undefined值
// var age； //这个变量未定义
alert(message); // "undefined" 
alert(age); //"错误"
```
#### undefined与mull
在JavaScript中，将一个变量赋值为undefined或null，老实说，几乎没区别。undefined和null在if语句中，都会被自动转为false，相等运算符甚至直接报告两者相等。
``` bash
if (!undefined) 
    console.log('undefined is false');
// undefined is false

if (!null) 
    console.log('null is false');
// null is false

undefined == null
// true
```
最初设计时：null是表示一个无的对象，转为数值时为0；undefined是一个表示无的原始值，转为数值时为NaN。
``` bash
Number(null)
// 0

5 + null
// 5

Number(undefined)
// NaN

5 + undefined
// NaN
```
##### 目前的用法
但是，上面这样的区分，在实践中很快就被证明不可行。目前，null和undefined基本是同义的，只有一些细微的差别。

**null表示"没有对象"，即该处不应该有值**。典型用法是：

- 作为函数的参数，表示该函数的参数不是对象。

- 作为对象原型链的终点。
`Object.getPrototypeOf(Object.prototype) //null`

**undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。**典型用法是：

- 变量被声明了，但没有赋值时，就等于undefined。

- 调用函数时，应该提供的参数没有提供，该参数等于undefined。

- 对象没有赋值的属性，该属性的值为undefined。

- 函数没有返回值时，默认返回undefined。

```bash
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
```
