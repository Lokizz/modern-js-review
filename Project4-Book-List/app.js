// TODO Project Book List in ES5
// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');

  // Create tr element
  const tr = document.createElement('tr');
  // Insert cols
  tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `; 
  // Append the row to the list
  list.appendChild(tr);
}

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Show alerts
UI.prototype.showAlert = function(msg, className) {
  // Get the ui vars needed
  const container = document.querySelector('.container'),
        form = document.getElementById('book-form');

  // Create alert div
  const div = document.createElement('div');
  // Add class name
  div.classList.add('alert', className);
  // Append text node
  div.appendChild(document.createTextNode(msg));

  // Insert the alert element
  container.insertBefore(div, form);

  // Disappear after 3s
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 2000);
}

// Delete book
UI.prototype.deleteBook = function(target) {
  if(target.classList.contains('delete')) {
    target.parentElement.parentElement.remove();
  }
}


// Event Listener -- adding book submit
document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Clear fields
    ui.clearFields();

    ui.showAlert('Book Added!', 'success');
  }

  e.preventDefault();
})

// Event listener -- delete book from list
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})