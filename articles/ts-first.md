---
title: 实现First
date: 10/22/2022 21:18:15
tags: [typescript, First]
categories: ts
outline: ts类型体操，实现First过程中的知识点
---

# First

实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

# infer
TODO: infer相关

`infer`关键字用于推断泛型类型的类型参数，可以用于条件类型中。

# answer

```ts
type First<T extends any[]> = T extends [infer R, ...any[]] ? R : never
```
