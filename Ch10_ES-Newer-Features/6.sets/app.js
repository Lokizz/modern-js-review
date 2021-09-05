// * ES6 Sets
// Store unique values of ANY type

const set1 = new Set()
const set2 = new Set([100, true, 'string'])
// console.log(set2)

// ? Add values to set | only one unique value to be left
set1.add(100)
set1.add('A string')
set1.add(() => {})
set1.add({name: 'John'})
set1.add(['John', 'Beth', 'Mike'])

// console.log(set1)

// ? .size
// console.log(set1.size)

// ? .has() - Check for values
// console.log(set1.has(100))

// ? Delete
// set1.delete(100)
// console.log(set1)

// ? Iterating through SETS
// for...of
for(let item of set1) {
  console.log(item)
}

// forEach
set1.forEach(item => {
  console.log(item)
})


// ? Covert to Arrays
 const valArr = Array.from(set1)
 console.log(valArr)