---
title: React学习记录4：条件渲染
date: '5/26/2021 10:00:00'
tags: [js, react]
categories: React.js
abbrlink: react
---

# 条件渲染

*在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后，依据应用的不同状态，你可以只渲染对应状态下的部分内容。*

## 1、if或条件运算符

自定义一个Greeting组件，根据用户是否登陆来决定显示哪个组件。

```jsx
function UserGreeting(props){
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props){
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
	<Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

这个事例根据`isLoggedIn`的值来渲染不同的问候语。（if语句判断）

## 2、元素变量

可以使用变量来储存元素。

新建两个组件，注销和登陆按钮：

```jsx
function LoginButton(props){
  return(
  	<button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props){
  return(
  	<button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

创建一个有状态的组件，`LoginControl`

```jsx
class LoginControl extends React.Component{
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state={isLoggedIn: false};
  }
  
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    
    //条件判断输出不同button
    if(isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }
    
    return(
    	<div>
        <!-- Greeting组件根据状态渲染成不同的按钮 并渲染button -->
      	<Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
	<LoginControl />,
  docunment.getElementById('root')
)
```

## 3、与运算符 &&

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      <!-- 采用与运算符来进行条件渲染 -->
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```



之所以能这样做，是因为在 JavaScript 中，`true && expression` 总是会返回 `expression`, 而 `false && expression` 总是会返回 `false`。

因此，如果条件是 `true`，`&&` 右侧的元素就会被渲染，如果是 `false`，React 会忽略并跳过它。

请注意，返回 false 的表达式会使 `&&` 后面的元素被跳过，但会返回 false 表达式。在下面示例中，render 方法的返回值是 `<div>0</div>`。

```jsx
render() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

## 4、三目运算符

***渲染文本：***

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

***渲染组件***

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

## 5、阻止组件渲染

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。

下面的示例中，`<WarningBanner />` 会根据 prop 中 `warn` 的值来进行条件渲染。如果 `warn` 的值是 `false`，那么组件则不会渲染:

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。例如，上面这个示例中，`componentDidUpdate` 依然会被调用。
