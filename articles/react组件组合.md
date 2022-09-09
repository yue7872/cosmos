---
title: React学习记录7：React组件的组合用法
date: '5/28/2021 11:00:00'
tags: [js, react]
categories: React.js
abbrlink: react
---

# React组件的组合用法

## 1、组件的嵌套

- 嵌套的情况下，子组件写在父组件的render函数中

  ```jsx
  class Context extends React.Component {
    render(){
      return(
        <span>this is context</span>
      )
    }
  }
  
  class Home extends React.Component {
    render(){
      return(
      <div>      
        {/* 将子组件直接写进父组件的render函数中 */}
        <h3> this is home </h3>
        <Context />
      </div>
      )
    }
  }
  ```

  

  

## 2、this.props.children

this.props.children是用来组合组件的，效果类似于vue的插槽。

```jsx
class Title extends React.Component {
  render(){
    return(
      <h1>this is title</h1>
    )
  }
}

class Context extends React.Component {
  render(){
    return(
      <span>this is context</span>
    )
  }
}

class Home extends React.Component {
  render(){
    return(
    <div>
      <h3> this is home </h3>
      {/* 2. 在Home组件中使用 this.props.children来接收  */}
      {this.props.children}
    </div>
    )
  }
}

ReactDOM.render(
  <Home>
      {/* 1. 将子组件放在Home组件的内容中 */}
      <Title/>
      <Context/>
  </Home>,
  document.getElementById('root')
);
```

这里需要注意， `this.props.children` 的值有三种可能：如果当前组件没有子节点，它就是 `undefined` ;如果有一个子节点，数据类型是 `object` ；如果有多个子节点，数据类型就是 `array` 。所以，处理 `this.props.children`的时候要小心。

React提供一个工具方法 `React.Children`来处理 `this.props.children` 。我们可以用 `react.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 `undefined` 还是 `object`。更多的 `React.Children` 的方法，请参考[官方文档](https://facebook.github.io/react/docs/top-level-api.html#react.children)。
