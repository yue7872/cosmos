---
title: React学习记录8：类型检查
date: '5/28/2021 14:00:00'
tags: [js, React, 类型检查, props]
categories: React.js
abbrlink: react
swiper_index: 5
swiper_desc: react的类型检查
---

# 使用PropTypes进行类型检查

***注：***自 React v15.5 起，`React.PropTypes` 已移入另一个包中。使用 `prop-types` 库代替。（需要多一步import）

## propTypes

类似于TS的类型检查，React也内置了这样的功能，只需配置propTypes属性：

```jsx
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  //限制props类型为string，isRequired属性 不满足条件会报错
  name: PropTypes.string.isRequired
};
```

`PropTypes` 提供一系列验证器，可用于确保组件接收到的数据类型是有效的。在本例中, 我们使用了 `PropTypes.string`。当传入的 `prop` 值类型不正确时，JavaScript 控制台将会显示警告。出于性能方面的考虑，`propTypes` 仅在开发模式下进行检查。

## 限制单个元素

你可以通过 `PropTypes.element` 来确保传递给组件的 children 中只包含一个元素。

```jsx
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // 这必须只有一个元素，否则控制台会打印警告。
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};

```

## 默认Props值

可以通过配置特定的 `defaultProps` 属性来定义 `props` 的默认值：

```jsx
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染出 "Hello, Stranger"：
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

`defaultProps` 用于确保 `this.props.name` 在父组件没有指定其值时，有一个默认值。`propTypes` 类型检查发生在 `defaultProps` 赋值后，所以类型检查也适用于 `defaultProps`。

## 函数组件

函数组件想要添加PropsTypes，需要在导出之前以单独声明的一个函数的形式，声明该组件，具体代码如下：

```jsx
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

//声明
export default HelloWorldComponent
```

