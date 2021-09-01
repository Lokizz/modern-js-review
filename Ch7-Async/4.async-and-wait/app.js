// * Async turns a function into Promise
// async function myFunc() {
//   return 'hello'
// }

// myFunc()  // returns a Promise
//   .then(res => console.log(res))

async function getUsers() {
  // await response of the fetch call
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  // Only proceed once its resolved
  const data = await response.json()
  
  // Only proceed once second promise is resolved
  return data
}

getUsers()
  .then(data => console.log(data))