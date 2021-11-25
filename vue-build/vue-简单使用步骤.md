[TOC]

## 常用步骤
1. CDN 加载 `<script src="https://unpkg.com/vue@next"></script>`
2. 配置根组件传递给 `Vue.createApp` 选项
3. 使用 `mount()` 方法挂载到 DOM 元素
如：
```js
const RootComponent = {
  data() {
    return { ... }
  }
}

Vue.createApp(RootComponent).mount('#DOM-ele')
```
