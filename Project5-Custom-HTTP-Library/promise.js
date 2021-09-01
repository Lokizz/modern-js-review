const posts = [
  { title: 'Post One', body: 'This is post one.'},
  { title: 'Post Two', body: 'This is post two.'}
]

function createPost(post) {
  return new Promise(function(resolve, reject) {
    try {
      posts.push(post)
      resolve()
    } catch (err) {
      reject(err)
    }
})
}

function getPosts() {
  let output = ''
  posts.forEach(function(post) {
    output += `<li>${post.title}</li>`
  })
  document.body.innerHTML = output
}

createPost({title: 'Post Four', body: 'This is post three.', name: 'loki'},)
  .then(getPosts)
  .catch(function (err) {
    console.log(err)
  })
