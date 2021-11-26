import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/* 
! React.Component 子类下的组件
1. 组件为简短的代码片段，用以组成复杂的 UI 界面
2. 组件接收参数，并通过 render 方法返回希望在屏幕上看到的内容
3. render 返回的是一个 React 元素，是一种对渲染内容的轻量级描述
4. React 元素实际上都是一个 JS 对象，可以在程序中把它保存在变量中或者作为参数传递
4. 大多数使用 JSX 的特殊语法编写结构
*/
// ? 组件 Square - 渲染棋格
// ? 1. class 类组件写法
// class Square extends React.Component {
//   // ! render 方法返回 React 元素，描述需要渲染的内容
//   render() {
//     return (
//       // 渲染了一个单独的 button 元素
//       <button 
//         className="square" 
//         // this.props.onClick() 是由 Board 组件传递给 Square 的
//         // 实际触发的是 Board（父组件）中的 this.handleClick(i) 方法
//         onClick={() => {this.props.onClick()}}
//       >
//         {/* 大括号使用 JS 表达式 */}
//         { this.props.value }
//       </button>
//     );
//   }
// }
// ? 2. function 函数组件写法
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

// ? 组件 Board
class Board extends React.Component {
  // 为 Square 的父组件
  renderSquare(i) {
    // {} 大括号使用 JS 表达式
    // 数据通过 props 的传递，从父组件流向子组件 
    // 将值传递到 Square 组件
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} 
      />
    )
  }

  // ? 渲染了九个方块
  render() {
    // ! render 方法返回 React 元素，描述需要渲染的内容
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}


// ? 组件 Game
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    // 制作一个副本，保持在 React 中的不可变性
    // 当有玩家胜出时，或者某个 Square 已经被填充时，函数不做处理直接返回
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{  // 使用 concat 不会改变原数组
        squares: squares
      }]),
      stepNumber: history.length,
      // 每移动一步，都会进行取反，决定下一步轮到的次序
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  // ! render 方法返回 React 元素，描述需要渲染的内容
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    /* 
      使用 map 方法，把历史步骤映射为代表按钮的 React 元素
      然后可以展示出一个按钮的列表，点击按钮可以跳转到对应的历史步骤
    */ 
    const moves = history.map((step, move) => {
      const desc = move 
      ? 'Go to move #' + move 
      : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if(winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
