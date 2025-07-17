
let dummyBook = new Book(
    "The Fault in our Stars",
    2014,
    "John Green",
    "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
    "Read"
)

const myLibrary = [dummyBook];
let container = document.querySelector(".container");
let newBookContainer = document.querySelector(".new-book-container");
let newBookDialog = document.querySelector('dialog');

function Book(title, year, author, description, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.year = year;
    this.author = author;
    this.description = description;
    this.status = status;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(book) {
    let newBook = document.createElement("div");
    newBook.classList.add("book");
    switch (book.status) {
        case "Read":
            newBook.classList.add("read");
            break;
        case "Not Read":
            newBook.classList.add("not-read");
            break;
        case "Reading":
            newBook.classList.add("reading");
            break;
        default:
            newBook.classList.add("unknown");
    }
    newBook.innerHTML = `
    <div class = "book-container">
        <div class = "book-title">
            ${book.title}
        </div>
        <div class = "book-status">
            <b>Status:</b> ${book.status}
        </div>
        <br>
        <div class = "book-author">
            <b>Author:</b> ${book.author}
        </div>
        <div class = "book-year">
            <b>Release Year:</b> ${book.year}
        </div>
        <br>
        <div class = "book-description">
            ${book.description}
        </div>
        <br>
    </div>
    <div class = "book-id">
        ID: ${book.id}
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
    description = document.querySelector('.description').value;
    let status = getStatus();
    let book = new Book(title, year, author, description, status);
    addBookToLibrary(book);
    displayAllBooks(myLibrary);
    newBookDialog.close();
    
}

function closeDialog() {
    newBookDialog.close();
}

function getStatus() {
    const radioButtons = document.getElementsByName("status");
    let status = "Unknown"
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            status = radioButtons[i].value;
            break;
        }
    }
    return status;
}
