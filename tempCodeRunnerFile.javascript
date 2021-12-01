function test() {
  console.log('test')
}

const obj1 = test.bind({})
console.log(obj1())

function foo() {
  
}

console.log(foo)