const myLibrary = [];

function Book(title, year, author) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.year = year;
    this.author = author;
}

function addBookToLibrary(title, year, author) {
    let book = new Book(title, year, author);
    myLibrary.push(book);
}

function displayBooks(library) {
    
}

