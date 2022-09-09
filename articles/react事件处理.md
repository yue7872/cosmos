---
title: React学习记录3：事件处理
date: 5/26/2021
tags: [js, react]
categories: React.js
abbrlink: react
---


# 事件处理

React元素的事件处理类似于DOM元素，只是一些语法不同。

## 1、命名

- React事件命名采用小驼峰式（camelCase），而不是纯小写。

- 使用JSX语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

  例如，HTML：

  ```html
  <button onclick="changeState()">
    改变
  </button>
  ```

  而在React中：

  ```html
  <button onClick={changeState}>
  	改变
  </button>
  ```

## 2、默认行为阻止

类似于a标签的默认跳转事件（return false），在react中：

```jsx
handleClick(e) {
    e.preventDefault();  //这里阻止跳转
    console.log('The link was clicked.');
}
return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
);
```

## 3、绑定事件

```jsx
function tick() {
  console.log('---------')
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      msg: props.msg,
      counter: 0,
      counter2: 0
    };
  }
  
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
        	<img src={logo} className='App-logo' alt='logo'/>
          <h1 onclick={tick}>{this.state.msg}</h1>
          <h3>Counter:{this.state.counter}</h3>
        </header>
      </div>
    );
  }
}
```

—— 你必须谨慎对待 JSX 回调函数中的 `this`，在 JavaScript 中，class 的方法默认不会绑定`this`。如果你忘记绑定`this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。

由于作用域的问题，tick函数得写在外面，这样一来，也就不能操作App这个类下面所有的属性及事件了。

比如，在tick()函数中`console.log(this)`输出为`undefined`。

对此，有三种解决方法：

- 手动绑定this

```jsx
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      msg: props.msg,
      counter: 0,
      counter2: 0
    };
    this.tick = this.tick.bind(this);   //利用bind()手动绑定
  }
  
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
        	<img src={logo} className='App-logo' alt='logo'/>
          <h1 onclick={tick}>{this.state.msg}</h1>
          <h3>Counter:{this.state.counter}</h3>
        </header>
      </div>
    );
  }
}
```

- 采用属性初始化器语法

  ***箭头函数***

  ```jsx
  tick = ()=>{
    console.log(this);
  }
  ```

- 有性能问题的第三种

  ```jsx
  onClick={(e)=>this.handleClick(e)}
  ```

  使用这个语法有个问题就是每次组件渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

