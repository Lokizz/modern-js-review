// * ES2015+ New Features

// ? Iterator Example
// function nameIterator(names) {
//   let nextIndex = 0

//   return {
//     next: function() {
//       return nextIndex < names.length ? 
//       // nextIndex++ returns the current value first, then add itself by 1 after
//       { value: names[nextIndex++], done: false } :
//       { done: true }
//     }
//   }
// }

// const namesArr = ['loki', 'pinky', 'zoe']
// const names = nameIterator(namesArr)

// console.log(names.next())
// console.log(names.next())
// console.log(names.next())
// console.log(names.next())


// ? Generator Example
// ! * - the symbol tells JS that this is a generator
/*
yield 是什么
1. yield 是 ES6 的新关键字，使生成器函数执行暂停，yield 关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的版本的 return 关键字。
2. yield 关键字实际返回一个 IteratorResult（迭代器）对象，它有两个属性，value 和 done，分别代表返回值和是否完成。
3. yield 无法单独工作，需要配合 generator（生成器）的其他函数，如 next，懒汉式操作，展现强大的主动控制特性
*/
function* sayNames() {
  yield 'Jack'
  yield 'Jill'
  yield 'John'
}

const names = sayNames()

console.log(names.next())
console.log(names.next())
console.log(names.next())
console.log(names.next())

// ID Creator
function* createIds() {
  let index = 0

  while(true) {
    yield index++
  }
}

const gen = createIds()

console.log(gen.next().value)
console.log(gen.next().value)