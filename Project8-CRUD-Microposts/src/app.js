// // * CommonJS Module Syntax
// const person = require('./commonJS')
// // * ES2015 Module Syntax
// import { test } from './ES2015module'
// import * as mod from './ES2015module'   // mod.

const http = require('./http')
const ui = require('./ui')

// * Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// * Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// * Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost)

// * Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)

// * Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit)

// ? Get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.error(err))
}

// ? Submit post
function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value
  const id = document.querySelector('#id').value
  const data = {
    title, 
    body
  }

  // Validate input
  if(title === '' || body === '') {
    ui.showAlert('Pls fill in all fields', 'alert alert-danger')
  } else {
    // Check for ID
    if (id === '') {
      // Create Post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success')
        ui.clearFields()
        getPosts()
      })
      .catch(err => console.error(err))
    } else {
      // Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post updated', 'alert alert-success')
        ui.changeFormState('add')
      })
    }
  }
}

// ? Delete post
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id

    if (confirm('Are you sure you want to delete this post?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post deleted', 'alert alert-success')
          getPosts()
        })
        .catch(error => console.log(error))
    }
  }

  e.preventDefault()
}

// ? Enable edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    const body = e.target.parentElement.previousElementSibling.textContent

    const data = {
      id,
      title,
      body
    }

    // Fill form with current post
    ui.fillForm(data)
  }

  e.preventDefault()
}

// ? Cancel edit state
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add')
  }

  e.preventDefault()
}