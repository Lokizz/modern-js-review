// * Fetch API from ES6

document.getElementById('button0').addEventListener('click', getText)
document.getElementById('button1').addEventListener('click', getJson)
document.getElementById('button2').addEventListener('click', getExternal)

function getText() {
  // ! fetch returns Promise
  fetch('test.txt')
    .then(handleError)
    .then(res => res.text())// Response Object
    .then(data => {
      console.log(data)
      document.getElementById('output').textContent = data
    })
    .catch(err => console.error(err)) 
  }

function getJson() {
  fetch('posts.json')
    .then(handleError)
    .then(res => res.json())
    .then(posts => {
      posts.forEach(post => {
        document.getElementById('output').innerHTML += `
          <ul>
            <li>${post.title}</li>
            <li>${post.body}</li>
          </ul>
        `
      })
    })
    .catch(err => console.error(err))
}

// Get from external API
function getExternal() {
  fetch('https://api.github.com/users')
    .then(handleError)
    .then(res => {
      return res.json()
    })
    .then(users => {
      let output = ''
      users.forEach(user => {
        output += `<li>${user.login}</li>`
        document.getElementById('output').innerHTML = output
      })
    })
    .catch(err => console.log(err))
}

// ! An http error will not fire off .catch automatically
// You have to check the response and throw an error yourself
function handleError(res) {
  // tell from the `.ok` property from Response Obj 
  // or the `.status` property
  if (!res.ok) {
    throw new Error("something went wrong when fetching the resource...")
  }
  return res
}