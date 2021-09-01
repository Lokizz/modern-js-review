const http = new easyHTTP()

// * Get Posts
http.get('https://jsonplaceholder.typicode.com/posts/1', function (err, res) {
  if (err) {
    console.error(err)
  } else {
    console.log(res)
  }
})

// * Post Post
// const data = {
//   title: 'Custom Post',
//   body: 'This is a custom post'
// }

// http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, post) {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log(post)
//   }
// })

// * Update Post
const data = {
  title: 'Modified Post',
  body: 'This is a post modified by the PUT request.'
}

http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(err, post) {
  if (err) {
    console.error(err)
  } else {
    console.log(post)
  }
})

// * Delete Post
http.delete('https://jsonplaceholder.typicode.com/posts/1', function(err, res) {
  if (err) {
    console.error(err)
  } else {
    console.log(res)
  }
})