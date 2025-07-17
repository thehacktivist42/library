const myLibrary = [];
let container = document.querySelector(".container");

function Book(title, year, author, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.year = year;
    this.author = author;
    this.description = description;
}

function addBookToLibrary(title, year, author, description) {
    let book = new Book(title, year, author, description);
    myLibrary.push(book);
}

function displayBook(book) {
    let newBook = document.createElement("div");
    newBook.classList.add("book");
    newBook.innerHTML = `
    <div class = "book-title">
        ${book.title}
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
    for (let book of library) {
        displayBook(book);
    }
}

displayAllBooks(myLibrary);

function addNewBook() {
    
}
