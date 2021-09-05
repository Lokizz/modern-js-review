// * Destructing
// Make it easy to assign variables and extract variables from arrs and objs

// let a, b
// [a, b] = [100, 200]
// [a, b] = [200, 300];
// console.log(b);  // 300

// ? Rest pattern
// [a, b, ...rest] = [100, 200, 300, 400, 500]

// console.log(rest);   // [300, 400, 500]

// ({ a, b } = { a: 100, b:200, c: 300, d: 400, e: 500 })
// console.log(a, b);  // 100, 200

// ({ a, b, ...rest } = { a: 100, b:200, c: 300, d:400, e: 500})
// console.log(rest);    // {c: 300, d: 400, e: 500}

// ? Array Destructing
// const people = ['John', 'Beth', 'Mike']

// const [person1, person2, person3] = people
// console.log(person1, person2, person3)    // John Beth Mike

// ? Parse arr returned from function
// function getPeople() {
//   return ['John', 'Beth', 'Mike']
// }

// console.log(getPeople())
// let per1, per2, per3;
// [per1, per2, per3] = getPeople()
// console.log(per1, per2, per3)   // John Beth Mike

// ? Object Destructing
const person = {
  name: 'John Doe',
  age: 32,
  city: 'Miami',
  gender: 'Male',
  sayHello() {
    console.log('Hello')
  }
}

const { name, age, city, sayHello } = person
console.log(name, age, city)
sayHello()