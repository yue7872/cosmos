---
title: 实现Tuple2Obj & Length
date: 10/07/2022 00:16:45
tags: [typescript, Tuple2Obj]
categories: ts
outline: ts类型体操，实现元组转化为对象以及获取元组长度
---

# 实现Tuple2Obj

传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

例如：

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

# 实现Tuple2Obj

创建一个通用的`Length`，接受一个`readonly`的数组，返回这个数组的长度。

例如：

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

# 遍历数组

`T[number]` 表示数组中的每一项


# 数组长度

`T['length']` 表示数组的长度

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


# answer2
```ts
type Length<T extends readonly (string | number | symbol)[]> = T['length']
```
