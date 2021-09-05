// * Symbols -- primitive data value
// ! The main purpose of symbols is their uniqueness
// Which makes them valuable in terms of things like object property identifiers

// ? Create a symbol
const sym1 = Symbol()
const sym2 = Symbol('sym2')

console.log(sym1)  // Symbol()
console.log(sym2)  // Symbol(sym2)

console.log(Symbol() === Symbol())  // false


// ? Unique Object Keys
const KEY1 = Symbol()
const KEY2 = Symbol('sym2')

const myObj = {}

myObj[KEY1] = 'Prop1'
myObj[KEY2] = 'Prop2'
myObj.key3 = 'Prop3'
myObj.key4 = 'Prop4'

console.log(myObj)

// ! Symbols are not enumerable in for...in
for (let i in myObj) {
  console.log(`${i}: ${myObj[i]}`)
}

// ! Symbols are ignored by JSON.stringify()
console.log(JSON.stringify(myObj))  // No [KEY1] and [KEY2]