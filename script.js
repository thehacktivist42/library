let dummyBook = new Book(
    "The Fault in our Stars",
    2014,
    "John Green",
    "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
    "Read"
)

const myLibrary = [];
let container = document.querySelector(".container");
let newBookContainer = document.querySelector(".new-book-container");
let newBookDialog = document.querySelector('.new-book-dialog');
let changeStatusDialog = document.querySelector('.status-change');

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
            <b>Status:</b> <a class = "status-${book.status}">${book.status}</a> &nbsp•&nbsp <a class = "change-status" onclick = "changeStatus('${book.id}')">Change</a>
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
const statusButton = document.querySelector('#status-button');
statusButton.addEventListener('click', (book) => submitStatus(book), false);

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
    changeStatusDialog.close();
}

function getStatus(radioName = "status") {
    const radioButtons = document.getElementsByName(radioName);
    let status = "Unknown"
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            status = radioButtons[i].value;
            break;
        }
    }
    return status;
}

let currentBook = null;

function changeStatus(id) {
    currentBook = myLibrary.find(b => b.id === id);
    if (!currentBook) return;
    changeStatusDialog.showModal();
    document.querySelector(".change-status-title").innerHTML = `Change status for <i>${currentBook.title}</i>`;
    const radios = changeStatusDialog.querySelectorAll('input[name="change-status"]');
    radios.forEach(radio => {
        radio.checked = (radio.value === currentBook.status);
    });
}

const statusForm = changeStatusDialog.querySelector('form');
statusForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitStatus();
});

function submitStatus() {
    if (!currentBook) return;
    let status = getStatus("change-status");
    currentBook.status = status;
    displayAllBooks(myLibrary);
    changeStatusDialog.close();
}