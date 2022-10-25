---
title: go 初始化项目
date: 10/24/2022 15:04:01
tags: [go, golang]
categories: go
outline: 通过 go mod 初始化项目
---

# 初始化

## 新建go.mod

xxx为项目名，会生成go.mod文件

```bash
go mod init xxx
```
或直接复制一份go.mod文件

```mod
module xxx

go 1.16
```

## 新建文件

```
// 文件路径

--- main.go
--- go.mod
--- first_module
    --- test.go
```
其中，test.go命名无所谓

## 文件内容

```go

// main.go
package main

import (
  "fmt"
  "xxx/first_module"
)

func main() {
  first_module.SayHello()
}

// test.go

package first_module

import "fmt"

func SayHello() {
  fmt.Println("hello world")
}
```
