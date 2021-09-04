// * try...catch statement for error handling
// ! Make it not stop the programming from continuing.
try {
  // ReferenceError
  myFunc()
  if(!user.name) {
    // Make your own error
    throw new SyntaxError('User has no name')
  }
} catch (e) {
  console.log(e.message)
  console.log(e.name)   // error type
  console.log(e instanceof TypeError)
} finally {
  console.log('Finally runs regardless of result succeeded or not')
}

console.log('Program continues...')