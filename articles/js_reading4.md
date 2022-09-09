---
title: js读书笔记系列（四）
date: '3/21/2021 12:26:57 AM'
tags: [js, 红宝书, 读书笔记, 数据类型]
categories: js基础
abbrlink: js
---



面试觉得自己实在太*垃圾*了，就来看看基础，做人还是要 **多读书**。
*****
# 基本概念

### Boolean
流控制语句会自动执行相应的Boolean转换**即调用Boolean()**，如if语句。
```bash
var message = "Hello world!"; 
if (message){ 
 alert("Value is true"); 
}
```
以下为转换规则：

| 数据类型 | 转化为true的值 | 转化为false的值 |
| :-: | :-: | :-: |
| Boolean | true | false |
| String | 任何非空字符串 | ""(空字符串) |
| Number | 任何非零数字(包括无穷大) | 0和NaN |
| Object | 任何对象 | null |
| Undefined | not applicable | undefined |

### Number  

- 整数和浮点都是Number   
- 八进制第一位必须为0，第二位为（0-7），否则就会当作十进制数来解析。
`var octalNum1 = 079;  //解析为79`
`var octalNum2 = 08;  //解析为8`
- 六进制前两位必须为x,后跟任意十六进制数（0-9及A-F）不区分大小写。
- 进行算术计算时，以八进制和十六进制表示的数值最终都会转成十进制。
- 浮点数的最高精度为17位小数，由于舍入误差、无法测试特定的浮点数值。例如
``` bash  
var a=0.1,b=0.2;
a+b==0.3; //false  注意==和=
```
详见[这个链接](https://blog.csdn.net/weixin_44591840/article/details/93966720)

##### NaN

- 非数值（Not a Number）是一个特殊的数值，任何设计NaN的操作都会返回NaN，如NaN/10.
- NaN与任何值都不相等，包括它本身。
'alert(NaN == NaN); //false'
- 0/0结果是NaN，正数/0返回Infinity，负数/0返回-Infinity
```bash
-1/0; //-infinity
isFineite(-1/0);//false
```

##### isNaN()函数

- 可确定该函数是否"不是数值"
- isNaN()在接收到一个值时，会尝试将它转化为数值。某些不是数值的值会直接转化为数值，例如字符串'10'或boolean值。任何不能转化为数值的值都会导致这个函数返回true。
``` bash  
alert(isNaN(NaN)); //true 
alert(isNaN(10)); //false (10是一个数值)
alert(isNaN("10")); //false （可以被转化成数值10）
alert(isNaN("blue")); //true （不能转化成数值）
alert(isNaN(true)); //false	（可以被转化成数值1）
```
- isNaN()函数也适用于对象。这种情况下，会先调用对象的valueOf()方法，然后确认该方法的返回值是否可以转化为数值，如果不能，则基于这个返回值再调用toString方法，再测试返回值。而这个过程也是ES中内置函数和操作符的一般执行流程。

##### 数值转换
包括Number()用于各种类型,parseInt()和parseFloat()专门用来把字符串转化成数值。

**Number()**
``` bash  
var num1 = Number("Hello world!"); //NaN
var num2 = Number(""); //0 
var num3 = Number("000011"); //11 
var num4 = Number(true); //1
var num5 = Number("0xf");//15
```
**parseInt()**
``` bash  
var num1 = parseInt("1234blue"); // 1234   
var num2 = parseInt(""); // NaN 第一个字符不是字符或负号，就返回NaN
var num3 = parseInt("0xA"); // 10（十六进制）
var num4 = parseInt(22.5); // 22 
var num5 = parseInt("070"); // 56（八进制）
var num6 = parseInt("70"); // 70（十进制）
var num7 = parseInt("0xf"); // 15（十六进制）
```
为了消除在解析数据的时候进制错误，如070被当成十进制（ES5），可指定第二个参数（基数）。
``` bash  
var num1 = parseInt("10", 2); //2   
var num2 = parseInt("10", 8); //8   
var num3 = parseInt("10", 10); //10    
var num4 = parseInt("10", 16); //16 
```
**parseFloat()**
只解析十进制数。会忽略前导的0，任何16进制数都会被解析为0。可以解析到一个小数点
``` bash
var num1 = parseFloat("1234blue"); //1234
var num2 = parseFloat("0xA"); //0 
var num3 = parseFloat("22.5"); //22.5 
var num4 = parseFloat("22.34.5"); //22.34 
var num5 = parseFloat("0908.5"); //908.5 
var num6 = parseFloat("3.125e7"); //31250000​
```
