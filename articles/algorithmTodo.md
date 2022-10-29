---
title: 算法相关todo
date: 10/29/2022 23:15:05
tags: [todo,算法]
categories: 算法
outline: 学习算法过程中的todolist
---

## Todo

### 深拷贝

```ts
const a: number[] = [15, 44, 62];
const b = a;
b[0] = 100;
console.log(a[0]); // 100
```

如上述代码，简单复制数组会导致修改 `b[i]` 时 `a[i]` 也发生更改。

<!-- TODO：实现深拷贝。 -->

### js函数重载

在java中很容易实现函数重载，但是在js中却不行，因为js中函数不能重名。

另外，接口新增了一个参数，如何实现兼容？

<!-- TODO：实现js函数重载。 -->
