const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        if (this.read) {
            return this.title + " by " + this.author + ", " + pages + " pages, read."
        }
        else {
            return this.title + " by " + this.author + ", " + pages + " pages, not read yet."
        }
    }
};

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(newBook.info());
    displayLibrary();
};

function displayLibrary() {
    const libraryDiv = document.getElementById("library");

    while (libraryDiv.firstChild) {
        libraryDiv.removeChild(libraryDiv.firstChild);
    }

    for (let book of myLibrary) {
        const newPar = document.createElement("p");
        const newDiv = document.createElement("div");
        libraryDiv.appendChild(newDiv);
        newDiv.appendChild(newPar);
        newPar.textContent = book.info();

        const removeBtn = document.createElement("button");
        newDiv.appendChild(removeBtn);
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            displayLibrary();
        })

        if (!book.read) {
            const readBtn = document.createElement("button");
            newDiv.appendChild(readBtn);
            readBtn.textContent = "Mark as Read";
            readBtn.addEventListener("click", () => {
                book.read = true;
                displayLibrary();
            })
        }
    }
};

const form = document.getElementById("book_form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    let read;
    if (formData.get("read") === "true") {
        read = true;
    } else {
        read = false;
    }
    addBookToLibrary(formData.get("title"), formData.get("author"), formData.get("pages"), read);
    form.reset();
});
