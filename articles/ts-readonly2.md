---
title: 实现Pick
date: 10/07/2022 00:16:45
tags: [typescript, readOnly2]
categories: ts
abbrlink: ts
---

# 实现ReadOnly2

实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

`K`指定应设置为Readonly的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

例如

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
```

# readonly
readonly是ts中的一个关键字，用来修饰属性，表示该属性为只读属性，不能被修改。
Readonly<T>是ts中的一个内置类型，用来修饰对象，表示该对象的所有属性都为只读属性，不能被修改。

```ts
interface Todo {
  title: string
}
// or
interface Todo = {
  readonly title: string
}
const todo: Readonly<Todo> = {
  title: "Hey",
}
todo.title = "Hello" // Error: cannot reassign a readonly property
```

# 泛型默认值 =

如下面的 K extends keyof T = keyof T 表示 K 的默认值是 keyof T
即 不传 K 的时候，K 的值是 keyof T


# Omit和Exclude的区别

Omit返回的是一个新的类型，而Exclude返回的是联合类型
可以写
```ts
Omit<T, K>
# 或者
Exclude<keyof T, K>
```

# &

```ts
type A = { a: string }
type B = { b: string }
type C = A & B
// C = { a: string, b: string }

type D = { a: string }
type E = { a: string }
type F = D & E
// F = { a: string }

type G = { a: string }
type H = { a: number }
type I = G & H
// I = { a: string & number }
```
## 注：
string & number 的结果是never


# 答案
```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}
```
