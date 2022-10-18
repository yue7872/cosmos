---
title: 实现Tuple2Obj
date: 10/07/2022 00:16:45
tags: [typescript, Tuple2Obj]
categories: ts
abbrlink: ts
---

# 实现Tuple2Obj

传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

例如：

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

# 遍历数组

`T[number]` 表示数组中的每一项

# readonly 范围
仅允许对数组和元组文本类型使用 "readonly" 类型修饰符。ts(1354)

# 联合类型元组

`(string | number | symbol)[]`

# answer
```ts
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [K in T[number]]: K
}
```

