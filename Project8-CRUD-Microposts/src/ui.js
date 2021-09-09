class UI {
  constructor() {
    this.post = document.querySelector('#posts')
    this.titleInput = document.querySelector('#title')
    this.bodyInput = document.querySelector('#body')
    this.idInput = document.querySelector('#id')
    this.postSubmit = document.querySelector('.post-submit')
    this.formEnd = document.querySelector('.form-end')
  }

  showPosts(posts) {
    let output = ''

    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `
    })
    this.post.innerHTML = output
  }

  showAlert(msg, className) {
    // Make sure only show one alert
    this.clearAlert()

    const div = document.createElement('div')
    div.className = className
    div.textContent = msg
    const container = document.querySelector('.postContainer')
    const posts = document.querySelector('#posts')
    // Insert alert div
    container.insertBefore(div, posts)

    setTimeout(() => {
      this.clearAlert()
    }, 3000)
  }

  fillForm(data) {
    this.idInput.value = data.id
    this.titleInput.value = data.title
    this.bodyInput.value = data.body

    this.changeFormState('edit')
  }

  changeFormState(type) {
    // Remove cancel btn if it exists
    if (document.querySelector('.post-cancel')) {
      document.querySelector('.post-cancel').remove()
    }
    
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post'
      this.postSubmit.classList.add('btn-warning')
      this.postSubmit.classList.remove('btn-primary')

      // Create cancel button
      const cancelBtn = document.createElement('button')
      cancelBtn.className = 'post-cancel btn btn-block btn-light'
      cancelBtn.textContent = 'Cancel Edit'

      // Insert cancel button
      document.querySelector('.card-form').insertBefore(cancelBtn, this.formEnd)
    } else {
      this.postSubmit.textContent = 'Post It'
      this.postSubmit.classList.remove('btn-warning')
      this.postSubmit.classList.add('btn-primary')

      // Remove cancel btn if it exists
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove()
      }

      // Clear ID from hidden field
      this.clearFields()
    }
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert')

    if (currentAlert) {
      currentAlert.remove()
    }
  }

  clearIdInput() {
    this.idInput.value = ''
  }

  clearFields() {
    this.titleInput.value = ''
    this.bodyInput.value = ''
  }
}

const ui = new UI()
module.exports = ui