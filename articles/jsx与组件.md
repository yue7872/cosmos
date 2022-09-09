---
title: React学习记录1：JSX与组件
date: 5/23/2021
tags: [js, jsx, React, 组件, 元素]
categories: React.js
abbrlink: react
---

# Create React App

*Create React App*，是一个用于**学习React**的舒适环境，也是用React创建一个新的单页应用的最佳方式。

创建项目，在控制台中执行：

```
npx create-react-app my-app
cd my-app
npm start
```

这样就新建好一个新的单页应用，可以开始写代码了！

# JSX简介

*JSX*是一种JavaScript的语法扩展，用于React架构中，它具有JavaScript的全部功能。可以生成React**元素**。

## 1、大括号

JSX语法中，可以在大括号内放置任何有效的JavaScript表达式，包括函数等。

```jsx
const name = 'yyz';
const element = <h1>Hello,{name}</h1>;

ReactDOM.render(
	element,
	document.getElementBuId('root')
);
```

## 2、表达式

编译之后，JSX表达式会被转为普通js函数调用。即可以把JSX赋值给变量，把JSX当参数传入，以及从函数中返回JSX：

```jsx
function getHello(user){
	if(user){
		return <h1>Hello,{getName(user)}!</h1>;
	}
	return <h1>Hello,Stranger.</h1>;
}
```

## 3、特定属性

可以用大括号在属性值中插入js表达式，也可以通过引号将属性值指定为字符串。

```jsx
const element = <img src={user.avatarUrl} />
const element = <div tabIndex='0'></div>
```

*注*：React DOM使用camelCase（小驼峰命名），如class变为了`className`

## 4、表示对象

Babel就把JSX转译成一个名为`React.creatElement()`函数调用。

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

等效于

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

实际上它创建了一个这样的对象：

```jsx
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

这些对象被称为 **“React元素”**。

# 元素渲染

***元素是构成React应用的最小砖块。***

React元素是创建开销极小的普通对象。React DOM会负责更新DOM来与React元素保持一致。

## 1、将元素渲染为DOM

React应用通常都只有单一的根DOM节点

```html
<div id="root"></div>
```

只需把React元素一起传入`ReactDOM.render()`，就能把它渲染到根DOM节点中。

```jsx
const element = <h1>hello,world</h1>;
ReactDOM.render(element,document.getElementById('root'));
```

## 2、更新已渲染的元素

React元素是不可变对象（const），无法改变它的子元素或属性。一个元素就像电影的单帧：代表某个特定时刻的UI。

更新UI可以创建一个全新元素，并将其传入`ReactDOM.render()`。

```jsx
function tick() {
	const element = <h1>It is {new Date().toLocaleTimeString()}!</h1>;
	ReactDOM.render(element,document.getElementById('root'));
}
<div id='root'></div>
setInterval(tick,1000);
```

这个例子中，每秒都会调用render()；

## 3、React只更新它需要更新的部分

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

尽管每一秒我们都会新建一个描述整个 UI 树的元素，React DOM 只会更新实际改变了的内容，也就是例子中的文本节点。

# 组件&props

***组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。***

组件，从概念上类似于JS函数。它接受任意的入参（即“props”），并返回用于描述页面展示内容的React元素。（意思就是return一个元素）

## 1、函数组件与class组件

可以编写JS函数来定义组件

```jsx
function Welcome(props) {
	return <h1>Hello,{props.name}</h1>
}
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

同时还可以使用ES6的class来定义组件：

```jsx
class Welcome extends React.Component {
	render() {
		return <h1>Hello,{this.props.name}</h1>
	}
}
```

这两个组件等效。

## 2、渲染组件

React元素也可以是用户自定义的组件：

```jsx
const element = <Welcome name="Sara" />;
```

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（比如name）以及子组件转换为单个对象传递给组件，这个对象被称之为 “props”。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

这个例子中，执行了如下步骤：

- 调用ReactDOM.render()函数，并传入element作为参数。
- React调用Welcome组件，并将{name: 'Sara'}作为props传入。
- Welcome组件将`<h1>Hello,Sara</h1>`元素作为返回值。
- React DOM将DOM高效地更新为`<h1>Hello,Sara</h1>`

注：**组件名称必须以大写字母开头。**小写字母开头的组件会被视为原生DOM标签。

## 3、组合组件

组件可以在输出中引用其他组件。如：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

通常来说，每个新的 React 应用程序的顶层组件都是 `App` 组件。

## 4、提取组件

即将组件拆分为更小的组件。

最初看上去，提取组件可能是一件繁重的工作，但是，在大型应用中，构建可复用组件库是完全值得的。根据经验来看，如果 UI 中有一部分被多次使用（`Button`，`Panel`，`Avatar`），或者组件本身就足够复杂（`App`，`FeedStory`，`Comment`），那么就可以考虑将它独立提取出来

## 5、props的只读性

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。

***纯函数*** 不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

而所有React组件都必须像纯函数一样保护它们的props不被更改。
