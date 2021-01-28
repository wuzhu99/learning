<!--
 * @Author: wuz
 * @Date: 2021-01-28 17:16:41
 * @LastEditTime: 2021-01-28 17:18:28
 * @FilePath: /learning/react/hook入门.md
-->

# 为什么使用 hook

Hook 是 React 16.8 的新增特性，是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

## 类组件和函数组件的区别

详细参考 [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/), 感兴趣的同学可以直接看原文。
|区别|类组件 |函数组件 |
|--|--|--|
| 定义方式 |class |function |
|生命周期|有|无
| status |有 |无 |
| this | 有 | 无|
函数组件一直以来都因为缺乏类组件诸如状态、生命周期等种种特性，也因为这些原因函数组件得不到开发者的青睐，而 Hooks 的出现就是让函数式组件拥有类组件的特性。

## 没有破坏性改动

在我们继续之前，请记住 Hook 是：

1.  **完全可选的。** 你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必现在就去学习或使用 Hook。
2.  **100% 向后兼容的**。Hook 不包含任何破坏性改动。
3.  现在可用。 Hook 已发布于 v16.8.0。
    **没有计划从 React 中移除 class。** 你可以在本页底部的章节读到更多关于 Hook 的渐进策略。

## Hook 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中）

# useState

```javascript
//引入 React 中的 useState Hook。它让我们在函数组件中存储内部 state。
import React, { useState } from 'react'

function Example() {
  // 声明一个叫 "count" 的 state 变量
  //在 Example 组件内部，我们通过调用 useState Hook 声明了一个新的 state 变量。
  //它返回一对值给到我们命名的变量上。我们把变量命名为 count，因为它存储的是点击次数。
  //我们通过传 0 作为 useState 唯一的参数来将其初始化为 0。
  //第二个返回的值本身就是一个函数。它让我们可以更新 count 的值，所以我们叫它 setCount。
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      //当用户点击按钮后，我们传递一个新的值给 setCount。 //React 会重新渲染 Example
      组件，并把最新的 count 传给它 //我们已经有了 setCount 和 count 变量，所以我们不需要
      this:
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

等价的 class 示例

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        //在 class 中，我们需要调用 this.setState() 来更新 count 值<button
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          Click me
        </button>
      </div>
    )
  }
}
```

# useEffect

- useEffect 可以让你在函数组件中执行副作用操作

```javascript
// 引入useEffect hook
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)
  useEffect(
    // 类似componentDidMount与componentDidUpdate
    //在每次渲染之后执行useEffect第一个参数
    () => {
      document.title = `You clicked ${count} times`
      return function () {
        //React 会在组件卸载时候触发这里的函数。
        //相当于componentWillUnmount
      }
    },
    //useEffect第二个参数 默认为[]每次渲染执行, 传入count仅在count更改时更新
    [count]
  )

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

> 如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

- 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。不管你知不知道这些操作，或是“副作用”这个名字，应该都在组件中使用过它们。

等价的 class 示例

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}
```

- useEffect 做了什么？ 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。在这个 effect 中，我们设置了 document 的 title 属性，不过我们也可以执行数据获取或调用其他命令式的 API。

- 为什么在组件内部调用 useEffect？ 将 useEffect 放在组件内部让我们可以在 effect 中直接访问 count state 变量（或其他 props）。我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API。

- useEffect 会在每次渲染后都执行吗？ 是的，默认情况下，它在第一次渲染之后和每次更新之后都会执行。（我们稍后会谈到如何控制它。）你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

# 自定义 Hook

- 通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

> 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

useFriendStatus 是我们的一个自定义 Hook

```javascript
import { useState, useEffect } from 'react'
//名字应该始终以 use 开头，这样可以一眼看出其符合 Hook 的规则。
//friendID作为参数，返回其是否在线
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
    }
  })

  return isOnline
}
```

如何使用自定义 Hook？

```javascript
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id)

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id)

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>
  )
}
```

在两个组件中使用相同的 Hook 不会共享 state 。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的，它都会获取独立的 state。由于我们直接调用了 useFriendStatus，从 React 的角度来看，我们的组件只是调用了 useState 和 useEffect。

# useRef

> useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

```javascript
import { useRef } from 'react'
function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus()
  }
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```

- useRef() 和自建一个 {current: ...} 对象的唯一区别是，**useRef 会在每次渲染时返回同一个 ref 对象。**
- 当 ref 对象内容发生变化时，useRef 并不会通知你。**变更 .current 属性不会引发组件重新渲染。**

# useContext

在组件之间共享状态

> 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context
> 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

**别忘记 useContext 的参数必须是 context 对象本身：**

- 正确： useContext(MyContext)
- 错误： useContext(MyContext.Consumer)
- 错误： useContext(MyContext.Provider)

```javascript
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}

const ThemeContext = React.createContext(themes.light)

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  const theme = useContext(ThemeContext)
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  )
}
```

useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。

---

好了，本文到此就介绍完了，如果你有其他的补充或者觉得我有什么地方说得不对的话可以在评论区和我一起探讨。

友情链接：[Hook API 索引](https://react.docschina.org/docs/hooks-reference.html)
