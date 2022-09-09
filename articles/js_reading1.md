---
title: js读书笔记系列（一）
tags: [js, 红宝书,读书笔记]
categories: js基础
abbrlink: js
date: 2021-03-18 00:00:00
---



面试觉得自己实在太*垃圾*了，就来看看基础，做人还是要 **多读书**。
*****
## javascript实现

完整的javascript由以下三部分实现：
- 核心（ECMAScript）
- 文档对象模型（DOM）
- 浏览器对象模型（BOM）

### 1. ECMAScript
- 其实是脚本语言的标准化规范，可以理解为js的一个标准，但实际上js是ECMAScript标准的实现和扩展。
- 由ECMA-262定义，**提供核心语言功能**。

### 2.文档对象模型（DOM）
- **提供访问和操作网页内容的方法和接口**。  

- DOM是针对XML但经过拓展用于HTML的应用程序编程接口（API,Application Programming Interface），它把整个界面映射为一个多层节点结构。即创建了一个树形图。  
``` bash
	<html>  
	 <head>
	 	<title>Sample Page</title>
	 </head>
	 <body>
	 	<p>Hello World!</p>
	 </body>
	</html>
```
***树状结构：***   
html-head-title-Sample Page  
	-body-p-Hello World!
##### 2.1 DOM级别
- DOM1：（目标主要是映射文档结构）  
 1、 DOM核心：规定了如何映射基于XML的文档结构  
    2、 DOM HTML：在DOM核心基础上进行拓展，添加了针对HTML的对象和方法  
   
- DOM2:
1、 DOM视图（Views）：定义了追踪不同文档（应用css之前和之后的文档）视图的接口  
2、 DOM事件（Events）：定义了事件和事件处理的接口  
3、 DOM样式（Style）：定义了基于CSS为元素样式的接口  
4、 DOM遍历和范围（Traversal and Range）：定义了遍历和操作文档树的接口
- DOM3:
1、 DOM加载和保存模块：引入以统一方式加载和保存文件的方法  
2、 DOM验证模块：新增验证文档的方法
3、 扩展DOM核心：支持XML1.0规范

### 浏览器对象模型（BOM）
- **提供与浏览器交互的方法与接口**  

- 根本上讲，BOM只处理浏览器窗口和框架。人们习惯上把所有针对浏览器的js扩展算作BOM的一部分。如：  
	- 弹出、移动、缩放、关闭浏览窗口的功能；
	- navigator对象：提供浏览器详细信息；
	- location对象：提供浏览器所加载页面的详细信息；
	- screen对象：提供用户显示器分辨率详细信息的screen对象；
	- 对cookies的支持；
	- 像XMLHttpRequest和IE的ActiveXObject这样的自定义对象。​
