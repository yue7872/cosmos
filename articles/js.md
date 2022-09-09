---
title: so you think you know javascript
date: 2/10/2022 15:47:33
tags: [js,语法]
categories: js基础
abbrlink: js
---

# 1

## **Question 1: What will be printed on the browser console?**

```js
var a = 10;
function foo() {
    console.log(a); // ??
    var a = 20;
}
foo();
```

### 变量提升

JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部：

```js
'use strict';

function foo() {
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}

foo();
```

虽然是strict模式，但语句`var x = 'Hello, ' + y;`并不报错，原因是变量`y`在稍后申明了。但是`console.log`显示`Hello, undefined`，说明变量`y`的值为`undefined`。这正是因为JavaScript引擎自动提升了变量`y`的声明，但不会提升变量`y`的赋值。

对于上述`foo()`函数，JavaScript引擎看到的代码相当于：

```js
function foo() {
    var y; // 提升变量y的申明，此时y为undefined
    var x = 'Hello, ' + y;
    console.log(x);
    y = 'Bob';
}
```



例如：

```js
/**
* 不推荐的方式：先调用函数，再声明函数
*/

catName("Chloe");

function catName(name) {
    console.log("我的猫名叫 " + name);
}

/*
代码执行的结果是: "我的猫名叫 Chloe"
*/

```

只有声明会被提升，初始化则不会。***初始化就是赋值***。函数和变量相比，会被优先提升。这意味着函数会被提升到更靠前的位置。

```js
// Example 1 - only y is hoisted
var x = 1;                 // 声明 + 初始化 x
console.log(x + " " + y);  // '1 undefined'
var y = 2;                 // 声明 + 初始化 y
```

采用严格模式后不能使用未声明的变量。

### 严格模式

[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)。

[ECMAScript 5](https://www.ecma-international.org/publications/standards/Ecma-262.htm)的**严格模式**是采用具有限制性JavaScript变体的一种方式，从而使代码隐式地脱离“马虎模式/稀松模式/懒散模式“（sloppy）模式。

严格模式不仅仅是一个子集：它的产生是为了形成与正常代码不同的语义。

不支持严格模式与支持严格模式的浏览器在执行严格模式代码时会采用不同行为。

所以在没有对运行环境展开**特性测试**来验证对于严格模式相关方面支持的情况下，就算采用了严格模式也不一定会取得预期效果。严格模式代码和非严格模式代码可以共存，因此项目脚本可以渐进式地采用严格模式。

严格模式对正常的 JavaScript语义做了一些更改。

1. 严格模式通过**抛出错误**来消除了一些原有**静默错误**。
2. 严格模式修复了一些导致 JavaScript引擎难以执行优化的缺陷：有时候，相同的代码，严格模式可以比非严格模式下**运行得更快**。
3. 严格模式**禁用了**在ECMAScript的未来版本中可能会定义的一些语法。

如果你想改变你的代码，让其工作在具有限制性JavaScript环境中，请参阅[转换成严格模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode)。

### 函数作用域

在JavaScript中，用var声明的变量实际上是有作用域的。

如果两个不同的函数各自申明了同一个变量，那么该变量只在各自的函数体内起作用。换句话说，不同函数内部的同名变量互相独立，互不影响：

```js
'use strict';

function foo() {
    var x = 1;
    x = x + 1;
}

function bar() {
    var x = 'A';
    x = x + 'B';
}
```

由于JavaScript的函数可以嵌套，此时，内部函数可以访问外部函数定义的变量，反过来则不行：

```js
'use strict';

function foo() {
    var x = 1;
    function bar() {
        var y = x + 1; // bar可以访问foo的变量x!
    }
    var z = y + 1; // ReferenceError! foo不可以访问bar的变量y!
}
```

如果内部函数和外部函数的变量名重名，JavaScript的函数在查找变量时 ***从自身函数定义开始，从“内”向“外”查找。*** 如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量。

***在`for`循环等语句块中无法定义具有局部作用域的变量。***

### 命名空间

全局变量会绑定到`window`上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。

减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：

```
// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};
```

把自己的代码全部放入唯一的名字空间`MYAPP`中，会大大减少全局变量冲突的可能。

许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等。



## **Answer 1: undefined**

```js
var a = 10;
function foo() {
  // 变量提升 等价于 var a;
    console.log(a); // undefined
    var a = 20;  //初始化值不提升
  // JavaScript的函数在查找变量时，从自身函数定义开始，从“内”向“外”查找。如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量。
}
foo();
```

# 2

## Question 2: Will output be the same if we use let or const instead of var?

```js
var a = 10;
function foo() {
    console.log(a); // ??
    let a = 20;
}
foo();
```

