// * ES6 Maps
// ! Maps = key-value pairs - can use ANY type as a key or value

const map1 = new Map()

// ? Set keys
const key1 = 'some string',
      key2 = {},
      key3 = () => {}

// .set() - Set map values by key
map1.set(key1, 'Value of key1')
map1.set(key2, 'Value of key2')
map1.set(key3, 'Value of key3')

// .get() - Get values by key
console.log(map1.get(key1))

// .size - Count values
console.log(map1.size)

// ? Iterator maps

// for...of
// for(let [key, value] of map1) {
//   console.log(`${key} = ${value}`)
// }

// for(let key of map1.keys()) {
//   console.log(key)
// }

// for(let value of map1.values()) {
//   console.log(value)
// }

// forEach
map1.forEach((val, key) => {
  console.log(`${key} = ${val}`)
})


// ? Convert to Arrays
const keyValArr = Array.from(map1)
console.log(keyValArr)

const keyArr = Array.from(map1.keys())
const valArr = Array.from(map1.values())
console.log(keyArr)
console.log(valArr)