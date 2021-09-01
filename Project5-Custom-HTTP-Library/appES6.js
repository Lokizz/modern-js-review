const http = new EasyHTTP()

// * Get post
http.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => console.log(data))
  .catch(err => console.error(err))

// * Create post
const post = {
  title: "Custom Post",
  body: "This is a custom post."
}
http.post('https://jsonplaceholder.typicode.com/posts', post)
  .then(data => console.log(data))
  .catch(err => console.error(err))

// * Update post
const updatedPost = {
  title: 'Updated post',
  body: 'This is a updated post...'
}
http.put('https://jsonplaceholder.typicode.com/posts/1', updatedPost)
  .then(data => console.log(data))
  .catch(err => console.error(err))

// * Delete post
http.delete('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => console.log(data))
  .catch(err => console.error(err))