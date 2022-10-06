---
title: 实现Pick
date: 10/07/2022 00:16:45
tags: [typescript, pick]
categories: ts
abbrlink: ts
---

# 实现Pick
```ts
interface A {
    name: string;
    age: number;
    sex: number;
}

type A1 = Pick<A, 'name'|'age'>
// A1 = {
//     name: string;
//     age: number;
// }
```

[answer](https://github.com/yue7872/type-challenges/blob/main/questions/00004-easy-pick/template.ts)

# extends
1. extends用于继承
```ts
interface A {
  a: string;
}
interface B {
  b: number;
}
interface C extends A, B {
  c: boolean;
}

// 合法
const myObj: C = {
  a: 'a',
  b: 1,
  c: true
}
```

2. extends用于条件判断

- extends 前面能赋值给后面则为true

``` ts
type A = string;
type B = number;
type C = string | number;

type D = A extends B ? string : number; // D = number

type D = A extends C ? string : number; // D = string
```

- extends 联合类型 + 泛型

```
type Test<T> = T extends A ? string : number;
Test<C> // string | number
```

> 对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。

即：
```ts
Test<C> = (Test<A> | Test<B>) extends A ? string : number;
Test<C> = (Test<A> extends A ? string : number )|
(Test<B> extends A ? string : number);
Test<C> = (string | number);
```

### 特殊： never
```
// never是所有类型的子类型
type A1 = never extends 'x' ? string : number; // string

type P<T> = T extends 'x' ? string : number;
type A2 = P<never> // never
```

never被认为是空的联合类型，所以没有联合项进行分配，始终是never。


### 防止泛型分配
方法：将泛型[]括起来
```ts
type P<T> = [T] extends ['x'] ? string : number;
type A1 = P<'x' | 'y'> // number
type A2 = P<never> // string
```

# in
用于遍历

- 枚举
```ts
enum Letter {
    A,
    B,
    C,
}

type LetterMap = {
    [key in Letter]: string;
}

// type LetterMap = {
//     0: string;
//     1: string;
//     2: string;
// }
```

- 联合类型
```ts
type Letter = 'A' | 'B' | 'C';
type LetterMap = {
    [key in Letter]: string;
}

// type LetterMap = {
//   A: string;
//   B: string;
//   C: string;
// }
```

# keyof
keyof 是TS中的索引类型查询操作符。keyof T 会得到由 T 上已知的公共属性名组成的联合类型。

```ts
interface Person {
  name: string;
  age: number;
  phoneNum: number;
}

type PersonProperty = keyof Person; // "name" | "age" | "phoneNum"
```
