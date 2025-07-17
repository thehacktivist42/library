const myLibrary = [];
let container = document.querySelector(".container");
let newBookContainer = document.querySelector(".new-book-container");
let newBookDialog = document.querySelector('dialog');

function Book(title, year, author, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.year = year;
    this.author = author;
    this.description = description;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(book) {
    let newBook = document.createElement("div");
    newBook.classList.add("book");
    newBook.innerHTML = `
    <div class = "book-title">
        ${book.title}
    </div>
    <div class = "book-id">
        <b>ID:</b> ${book.id}
    </div>
    <div class = "book-author">
        <b>Author:</b> ${book.author}
    </div>
    <div class = "book-year">
        <b>Release Year:</b> ${book.year}
    </div>
    <div class = "book-description">
        ${book.description}
    </div>
    `
    container.appendChild(newBook);
}

function displayAllBooks(library) {
    container.innerHTML = '';
    for (let book of library) {
        displayBook(book);
    }
}

displayAllBooks(myLibrary);

function NewBook() {
    newBookDialog.showModal();
}

const submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click', addNewBook, false);

function addNewBook(event) {
    event.preventDefault();
    title = document.querySelector('.title').value;
    author = document.querySelector('.author').value;
    year = document.querySelector('.year').value;
    description = document.querySelector('#description').value;
    let book = new Book(title, year, author, description);
    addBookToLibrary(book);
    displayAllBooks(myLibrary);
    newBookDialog.close();
    
}
