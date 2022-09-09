---
title: React学习记录5：列表&Key
date: '5/26/2021  11:00:00'
tags: [js, react]
categories: React.js
abbrlink: react
---

# 列表&Key

## 1、渲染多个组件

可以使用map()来遍历数组，将数组中的元素变为列表标签，然后赋值给listItems，再进行插入与渲染。

```jsx
const numbers = [1,2,3,4,5];
const listItems = numbers.map((number) =>
	<li>{number}</li>
);
  
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);                                                        
```

## 2、基础列表组件

我们通常在组件内渲染列表，可以把上述例子重构，使之成为一个组件。这个组件接收`numbers`数组作为参数，并输出一个元素列表。

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
		//返回一个ul列表
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  //传入numbers数组参数
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**注**：这里应该分配key值，见下：

## 3、key

*key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。*

- 通常使用id来作为元素的key，尽量不要使用index；

- key值在兄弟节点之间必须唯一，而不需要全局唯一；

- 经验法则：map()方法中的元素需要设置key属性，原因如下：

  元素的 key 只有放在就近的数组上下文中才有意义。

  比方说，如果你[提取](https://zh-hans.reactjs.org/docs/components-and-props.html#extracting-components)出一个 `ListItem` 组件，你应该把 key 保留在数组中的这个 `<ListItem />` 元素上，而不是放在 `ListItem` 组件中的 `<li>` 元素上。

