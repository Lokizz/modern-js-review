// * Project3 Number Guesser - Vue build

// ? 配置根组件
const game = {
  // * 创建实例时所需的数据
  data() {  // 返回一个对象储存对应的数据，其中的数据会 变成Vue.createApp() 创建的实例属性
    return {
      minNum: 0,
      maxNum: 0,
      winNum: 0,
      guessNum: null,
      guessesLeft: 3,
      btnValue: "提交",
      // 提示信息
      message: "",
      // 样式相关
      messageColor: "",
      borderColor: "",
      btnColor: "",
      isPlayAgainEnabled: false
    }
  },
  // * 实时响应的数据
  computed: {
    // ? 根据结果变换提示信息的颜色
    msgStyle() {
      return {
        color: this.messageColor
      }
    },
    btnStyle() {
      return {
        color: this.btnColor,
        borderColor: this.borderColor
      }
    }
  },
  // * 定义组件方法
  methods: {
    // ? 初始化数字
    initNum() {
      // 随机生成 0-5
      this.minNum = Math.floor(Math.random() * 5) + 1
      // 随机生成 10-20
      this.maxNum = Math.floor(Math.random() * 10) + 11

      this.winNum = Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum
    },

    // ? 检测是否猜中数字
    validateGuessNum(guess) {
      if (this.isPlayAgainEnabled) {
        window.location.reload()
      }

      // 如果输入无效数字，退出函数
      if (!this.isValidInput(guess)) {
        this.clearMessage()
        this.setMessage(`请输入范围在 ${this.minNum} 到 ${this.maxNum} 之间的有效数字`, 'red')
        this.guessNum = null
        return
      }

      // 游戏结束 - 赢
      if (guess === this.winNum) {
        this.gameOver(true, `正确数字是 ${this.winNum}, 你赢了。`)
      } else {
        this.guessesLeft--
        this.isChanceLeft(this.guessesLeft)
      }
    },

    // ? 检验输入值是否有效
    isValidInput(num) {
      return Number.isNaN(num) || num < this.minNum || num > this.maxNum
      ? false
      : true
    },

    // ? 游戏结束逻辑实现
    gameOver(isWon, msg) {
      let color = isWon === true ? 'green' : 'red'

      this.setMessage(msg, color)
      // 提供重玩选项
      this.playAgain()
    },

    // ? 是否还有机会
    isChanceLeft(count) {
      if (count === 0) {
        this.gameOver(false, `游戏结束，你输了。正确答案是 ${this.winNum}。`)
      } else if (count > 0) {
        this.setMessage(`答案错误，你现在还有 ${this.guessesLeft} 次机会`, 'red')
        this.guessNum = null
      }
    },

    // ? 再玩一次
    playAgain() {
      this.btnColor = 'green'
      this.borderColor = 'green'
      this.btnValue = '再玩一次'
      this.isPlayAgainEnabled = true
    },

    // ? 设置提示消息
    setMessage(msg, color) {
      this.clearMessage()
      this.message = msg
      this.messageColor = color
      this.timeoutID = setTimeout(this.clearMessage, 2000)
    },

    // ? 清除提示消息
    clearMessage() {
      this.message = ""
      // 避免提交间隔太短，导致提示信息消失时间变短
      clearTimeout(this.timeoutID)
    }
  },
  mounted() {
    this.initNum()
    console.log(`悄悄给你正确数字：${this.winNum}`)
  }
}

// ? 传递给 Vue.createApp() 并挂载到 DOM 元素上
const app = Vue.createApp(game).mount('#game')