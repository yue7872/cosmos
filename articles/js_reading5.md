---
title: js读书笔记系列（五）
date: '3/22/2021 5:33:22 PM'
tags: [js, 红宝书, 读书笔记, 数据类型]
categories: js基础
abbrlink: js
---



面试觉得自己实在太*垃圾*了，就来看看基础，做人还是要 **多读书**。
*****

### Object
ECMAScript中的对象其实就是一组数据和功能的集合。
**一个重要思想**：在ECMAScript中，Object类型是所有它的实例的基础。换句话说，Object类型所具有的任何属性和方法也同样存在于更具体的对象中。
Object的每个实例都具有下列属性和方法。  

-  *constructor:* 保存着用于创建当前对象的函数。对于`var o = new Object();`而言，构造函数(constructor)就是Object()。
-  *hasOwnProperty(propertyName):* 用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。其中，作为参数的属性名(*propertyName*)必须以字符串形式指定,例如：
`o.hasOwnProperty("name")`。
- *isPrototypeOf(object):* 用于检查传入的对象是否是传入对象的原型。
- *propertyIsEnumerable(propertyName):* 用于检查给定的属性是否能够使用for-in语句来枚举。与*hasOwnProperty()*方法一样，作为参数的属性名必须以字符串形式指定。
- *toLocaleString():* 返回对象的字符串表示，该字符串与执行环境的地区对应。
- *toString():* 返回对象的字符串表示。
- *valueOf():* 返回对象的字符串、数值或布尔值表示。通常与toString()方法的返回值相同。
