---
title: 实现Omit
date: 10/07/2022 02:21:06
tags: [typescript, omit]
categories: ts
abbrlink: ts
---

# 实现Omit

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```
[answer](https://github.com/yue7872/type-challenges/blob/main/questions/00003-medium-omit/template.ts)

# Exclude/Extract
作用：Exclude 取差集，而 Extract 取交集

注意Exclude是操作联合类型的，而Omit是操作键值对的


```ts
type Exclude<T, U> = T extends U ? never : T;

type A = Exclude<'x' | 'a', 'x'> // A = 'a'
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'> // A = 'a'

// 与 Exclude 实现刚好相反，Exclude 取差集，而 Extract 取交集
type Extract<T, U> = T extends U ? T : never;

// 相当于: type A = 'x'
type A = Extract<'x' | 'a', 'x'>
```
