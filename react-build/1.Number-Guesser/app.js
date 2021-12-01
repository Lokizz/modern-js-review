// * Number Guesser
// TODO: 
// finish the left logic of the program

// ? 提示标题
function Header(props) {
  return (
    <div>
      <h1>Number Guesser</h1>
      <p>
        请输入一个范围在
        <strong> {props.minNum} </strong> 
        与 
        <strong> {props.maxNum} </strong>
        之间的数字。
        <br />
        <span style={{color: "#bbb", fontSize: "12px", marginLeft: "-.8rem"}}>（提示：可从浏览器控制台直接看见答案。）</span>
      </p>
    </div>
  )
}

// ? 数字输入组件
function NumberInput(props) {
  if (props.isInputDisabled) {
    return (disabled)
  }
  
  return (
    <input 
      type="number" 
      placeholder="请输入数字"
      value = {props.value} 
      onChange = {props.handleChange} 
    />
  )
}

// ? 提交按钮组件
function SubmitBtn(props) {
  const btnStyle = {
    color: props.color,
    borderColor: props.color,
    marginLeft: '0.5rem'
  }

  return (
    <input 
      style={btnStyle}
      onClick={props.handleClick}
      type="submit" 
      value={props.btnValue} 
    />
  )
}

// ? 提示信息组件
function Message(props) {
  return (
    // 行内样式使用对象指定对应的具体样式属性
    <p style={{ color: props.color }}>
        {props.msg}
    </p>
  )
}

class Game extends React.Component {
  // 构建私有属性
  constructor(props) {  // props 用于传递数据到不同的组件
    // ! super 让对象能够向上使用父对象的属性和方法
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      minNum: 0,
      maxNum: 0,
      winNum: 0,
      guessNum: '',
      guessLeft: 3,
      isWon: false,
      isInputDisabled: false,
      btnValue: '提交',
      btnColor: '',
      msgColor: '',
      msgContent: '',
      // 用于及时重置 timeout，避免点击间隔太短带来的潜在影响
      timeoutID: ''
    }
  }

  // ! 在组件被渲染到 DOM 中后运行
  componentDidMount() {
    // 初始化需要的数字
    const minNum = Math.floor(Math.random() * 5) + 1
    const maxNum = Math.floor(Math.random() * 10) + 11
    const winNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    // 正确答案
    console.log(winNum)

    this.setState({
      minNum: minNum,
      maxNum: maxNum,
      winNum: winNum
    })
  }


  // * UI 界面相关 -- 开始
  // ? 设置提示信息
  setMessage(msg, color) {
    // 如果存在还未完成的 timeout，则重置它
    this.state.timeoutID && clearTimeout(this.state.timeoutID)
    // 如果还存在机会，则需要清空上一次的输入
    this.state.guessLeft && this.setState({guessNum: ''})

    this.setState({
      msgColor: color,
      msgContent: msg
    })
    
    const timeoutID = setTimeout(() => this.clearMessage(), 2000)
    this.setState({timeoutID: timeoutID})
  }

  // ? 清除提示信息
  clearMessage() {
    this.setState({
      msgContent: ''
    })
  }
  // UI 界面相关 -- 结束


  // * 表单处理相关 -- 开始
  // ? 实时监听并同步输入值
  handleChange(evt) {
    // 将表单输入同步到 state
    this.setState({
      guessNum: Number.parseInt(evt.target.value)
    })
  }

  // ? 检验提交值
  handleClick() {
    const guess = this.state.guessNum
    const answer = this.state.winNum
    // 再玩一次 - 刷新网页
    if (this.state.btnValue === "再玩一次") {
      window.location.reload()
      return
    }

    // 检测数字是否有效
    this.isValidNum(guess) &&
    // 对比答案
    this.compareWinNum(guess, answer)
  }
  // 表单处理相关部分 -- 结束


  // * 处理逻辑相关 -- 开始
  // ? 判断输入的数字是否有效
  isValidNum(num) {
    if (Number.isNaN(num) || num < this.state.minNum || num > this.state.maxNum) {
      this.setMessage(
        (<span>请输入范围在 <strong>{this.state.minNum}</strong> 和 <strong>{this.state.maxNum}</strong> 之间的有效数字。</span>),
        'red'
      )
      return false
    } else {
      return true
    }
  }

  // ? 判断有效数字的正确与否
  compareWinNum(guessNum, winNum) {
    const diff = winNum - guessNum
    const guessLeft = this.state.guessLeft - 1

    switch (true) {
      case (diff === 0): {
        this.gameOver(true, '答案正确，你赢了！')
        break
      }
      case (diff > 0 && guessLeft > 0): {
        this.chancesMinus(true)
        break
      }
      case (diff < 0 && guessLeft > 0): {
        this.chancesMinus(false)
        break
      }
      case (guessLeft === 0): {
        this.gameOver(false, `你输了，正确答案是${winNum}`)
      }
    }
  }

  // ? 给出答案的错误提示
  chancesMinus(isSmaller) {
    const guessLeft = this.state.guessLeft - 1
    console.log(guessLeft)
    let info = isSmaller ? "小" : "大" 

    this.setState({guessLeft: guessLeft})
    this.setMessage(<span>比正确答案<strong>{info}</strong>，你还剩余 <strong>{guessLeft}</strong> 次机会</span>, 'red')
  }

  // ? 游戏结束的状态更改
  gameOver(isWon, msg) {
    let color = isWon === true ? 'green' : 'red'
    
    this.setState({
      msgContent: msg,
      btnValue: "再玩一次",
      btnColor: color
    })

    this.setMessage(msg, color)
  }

  render() {
    const minNum = this.state.minNum
    const maxNum = this.state.maxNum
    const guessNum = this.state.guessNum
    // 生成 winNum
    const winNum = this.state.winNum

    // 样式相关
    const btnColor = this.state.btnColor
    const btnValue = this.state.btnValue
    const msgColor = this.state.msgColor
    const msgContent = this.state.msgContent

    // render 方法返回需要渲染的 React 元素
    return (
      // {} 大括号内可直接使用 JS 表达式
      <div className="container">
        {/* 显示标题组件 */}
        <Header 
          minNum={minNum}
          maxNum={maxNum}
        />
        {/* 数字输入组件 */}
        <NumberInput 
          value={guessNum}
          handleChange={this.handleChange}
          isInputDisabled={this.isInputDisabled}
        />
        {/* 提交按钮组件 */}
        <SubmitBtn 
          color={btnColor}
          handleClick={this.handleClick}
          btnValue={btnValue}
        />
        {/* 提示信息组件 */}
        <Message 
          color={msgColor}
          msg={msgContent}
        />
      </div>
    )
  }
}

// 渲染到指定的 DOM 元素
ReactDOM.render(
  <Game />,
  document.querySelector('#game-container')
)