---
title: ts基础
date: 10/14/2022 19:21:06
tags: [typescript, type, interface]
categories: ts
abbrlink: ts
outline: 一些ts基础知识，包括类型声明，ts类型等
---

# type和interface

## interface只描述对象，type描述所有数据

interface不能描述基本类型，而type可以，基本类型：number，string，boolean，symbol，null，undefined
```ts
type A = { age: number } & { name: string }


// error: 接口无法扩展基元类型，如“string”；接口只能扩展命名类型和类ts(2840)
interface A extends string {
}
```
## type只是别名，interface是类型声明

## type不能重新赋值不能继承，不能扩展

优点：不用跟踪type的变化，计算很快
缺点：不能继承，不能扩展，不能声明合并


```ts
type A = string
A = number // error
type A = number // error
```

```ts
interface A {
  a: string
}
interface A {
  b: string
}

// ok
const a: A = {
  a: 'a',
  b: 'b'
}
```

> interface扩展string
```ts
declare global {
  interface String {
    trimLeft(length:numbe): string;
  }
}

const a = '123456'
a.trimLeft(2) // ok
```

> - 对外API尽量用interface，方便扩展
> - 对内API尽量用type，防止代码分散


# never unknown any

### never是空集
```ts
type A = string & number // never
const a: never = 1 // error
```

### 任意值（Any）用来表示允许赋值为任意类型。
any是所有类型的子类型，可以赋值给任何类型
any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) ,这导致 any 基本上就是放弃了任何类型检查.

### unknown

unknown 类型也被认为是 top type ，但它更安全。与 any 一样，所有类型都可以分配给unknown。
但只能将 unknown 类型的变量赋值给 any 和 unknown。

·
```ts
type A = unknown;
const a: A = 2;

// 类型“unknown”上不存在属性“hello”。ts(2339)
a.hello();
```
