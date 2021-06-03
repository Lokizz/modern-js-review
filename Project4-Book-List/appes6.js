// TODO Project Book List In ES6 version
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // Add book to list
  addBookToList(book) {
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
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  // Show alerts
  showAlert(msg, className) {
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
  deleteBook(target) {
    if(target.classList.contains('delete')) {
      target.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static isbnExisted(book) {
    const books = Store.getBooks();
    let isbnExisted;

    // Check if duplicated isbn number
    for(let item of books) {
      if(item.isbn === book.isbn) {
        return isbnExisted = true;
      }
    }
    
    return isbnExisted = false;
  }

  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    const ui = new UI();

    books.forEach((book) => {
      ui.addBookToList(book);
    })
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, idx) => {
      if(book.isbn === isbn) {
        books.splice(idx, 1);
      }
    })

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event Listener for getting books from LS
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for adding book
document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate book & ui
  const book = new Book(title, author, isbn);
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    let isbnExisted = Store.isbnExisted(book);
    if(!isbnExisted) {
      ui.addBookToList(book);
      // Add to LS
      Store.addBook(book);
  
      ui.showAlert('Book added', 'success');
      ui.clearFields();
    } else {
      ui.showAlert('ISBN already existed!', 'error');
      ui.clearFields();
    }
  }
  
  e.preventDefault();
})

// Event Listener for deleting book
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  // Remove from LS
  const isbn = e.target.parentElement.previousElementSibling.textContent; 
  Store.removeBook(isbn);

  ui.showAlert('Book removed!', 'success');
});