---
title: React学习记录2：State&生命周期
date: 5/24/2021
tags: [js, react]
categories: React.js
abbrlink: react
---


1. 当 `<Clock />` 被传给 `ReactDOM.render()`的时候，React 会调用 `Clock` 组件的构造函数。因为 `Clock` 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 `this.state`。我们会在之后更新 state。
2. 之后 React 会调用组件的 `render()` 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 `Clock` 渲染的输出。
3. 当 `Clock` 的输出被插入到 DOM 中后，React 就会调用 `ComponentDidMount()` 生命周期方法。在这个方法中，`Clock` 组件向浏览器请求设置一个计时器来每秒调用一次组件的 `tick()` 方法。
4. 浏览器每秒都会调用一次 `tick()` 方法。 在这方法之中，`Clock` 组件会通过调用 `setState()` 来计划进行一次 UI 更新。得益于 `setState()` 的调用，React 能够知道 state 已经改变了，然后会重新调用 `render()` 方法来确定页面上该显示什么。这一次，`render()` 方法中的 `this.state.date` 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。
5. 一旦 `Clock` 组件从 DOM 中被移除，React 就会调用 `componentWillUnmount()` 生命周期方法，这样计时器就停止了。

## 1、State使用

### 不要直接修改State

例如，此代码不会重新渲染组件

```jsx
this.state.comment = 'Hello';
```

而是应该使用`setState()` 

```jsx
this.setState({comment: 'Hello'});
```

构造函数是唯一可以给`this.state`赋值的地方。

## 2、State的更新可能是异步的

为了性能，React会把多个`setState()`调用合并。 如：

```jsx
tick() {
	this.setState({
		counter: this.state.counter+1,
	})
	this.setState({
		counter2:this.state.counter+1,
	})
}
```

以上代码输出结果为：`counter2 : 1  counter : 1;`

很显然，因为异步，在给counter2赋值的时候，取到的`this.state.counter`的值还是0。解决方案如下：

react提供了该方法的拓展：**接受一个函数作为参数**

该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props作为第二个参数：

```jsx
tick() {
	this.setState({
		counter: this.state.counter+1,
	})
	this.setState((preState,props)=>({
		counter2: preState.counter+1,
	}));
}
```

以上代码输出结果为：`counter2 : 2 counter : 1;`

preState中，counter已经加了1.

## 3、数据是向下流动的

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

组件可以选择把它的 state 作为 props 向下传递到它的子组件中。`FormattedDate` 组件会在其 props 中接收参数 `date`，但是组件本身无法知道它是来自于 `Clock` 的 state，或是 `Clock` 的 props，还是手动输入的。

这通常会被叫做 ***“自上而下”*** 或是 ***“单向”*** 的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中***“低于”***它们的组件。

如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

## 4、生命周期

### ①初始化

#### getDefaultProps()

​	设置默认props

#### getInitialState()

​	class语法下没有此钩子函数，直接在constructor中定义this.state。此时可以访问this.props

#### componentWillMount()

​	组件初始化时调用，整个生命周期只调用一次，此时可以修改state

#### render()

​	react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时不能更改state了

#### componentDidMount()

​	组件渲染之后调用，只调用一次。

### ②更新

#### componentWillReceiveProps(nextProps)

​	组件初始化时不调用，组件接受新的props时调用。

#### shouldComponentUpdate(nextProps, nextState)

​	可以在此对比前后两个props和state是否相同，若相同则返回false阻止更新来提升性能

#### componentWillUpdata(nextProps, nextState)

​	组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state

#### componentDidUpdate()

​	组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。

### ③卸载

#### componentWillUnmount()

​	组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
