---
title: go基础语法
date: 10/27/2022 23:53:44
tags: [go,golang]
categories: go
outline: go定义变量、切片操作、map操作、循环等基础语法
---

# 基础语法

## 变量
```go
// 定义变量
var a int
var b string
var c bool
var d float32
var e float64
var f byte
var g rune
var h []int
var i [10]int
var j map[string]int
var k struct {
    x int
}
var l *int
var m func(a int) int
var n error
```

## 快速赋值
```go
a := 1
// 相当于
var a int = 1
```

## 切片
```go
// 定义切片
var a []int

// 定义切片并赋值
var a = []int{1, 2, 3}
a := []int{1, 2, 3}
a := make([]int, 3) // [0 0 0]
a := make([]int, 3, 5) // 定义长度为3，容量为5的切片 [0 0 0] len: 3 cap: 5

// 切片长度
len(a)
```

## map
```go
// 定义map
var a map[string]int // key为string，value为int

// 定义map并赋值
var a = map[string]int{"a": 1, "b": 2}
a := map[string]int{"a": 1, "b": 2} // key为string，value为int {"a": 1, "b": 2}
a := make(map[string]int) // map[]
a := make(map[string]int, 10) // 定义长度为10的map

// 判断map中是否有某个key
if _, ok := a["a"]; ok {
    fmt.Println("a存在")
}
```

## for 循环
```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// range
for i, v := range a {
    fmt.Println(i, v)
}
```
