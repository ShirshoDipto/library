let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}


function addBookToLibrary(title, author, pages, isRead, e) {
    e.preventDefault();
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBook(newBook, myLibrary.length-1);

    // remove the form element
    bookDescriptions.removeChild(theForm);
    theForm = undefined;

    // console.log(myLibrary);
}


function displayBook(bookToDisplay, dataValue) {

    const bookCard = document.createElement('div');
    bookCard.classList.toggle('book-card');
    bookCard.setAttribute('data-value', dataValue);
    allBooks.appendChild(bookCard);

    const bookTitle = document.createElement('div');
    bookTitle.classList.toggle('book-title');
    bookTitle.textContent = bookToDisplay.title;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement('div');
    bookAuthor.classList.toggle('book-author');
    bookAuthor.textContent = bookToDisplay.author;
    bookCard.appendChild(bookAuthor);

    const bookPages = document.createElement('div');
    bookPages.classList.toggle('book-pages');
    bookPages.textContent = `Pages: ${bookToDisplay.pages}`;
    bookCard.appendChild(bookPages);

    const readAndDelete = document.createElement('div');
    readAndDelete.classList.toggle('read-and-delete');
    bookCard.appendChild(readAndDelete);

    const readStatus = document.createElement('button');
    readStatus.setAttribute('data-value', dataValue);
    readStatus.setAttribute('id', 'read-status');
    if (bookToDisplay.isRead) {
        readStatus.textContent = "Read";
        readStatus.classList.add('read-status-yes');
    }
    else {
        readStatus.textContent = "Not Read";
        readStatus.classList.add('read-status-no');
    }
    readAndDelete.appendChild(readStatus);

    const deleteBook = document.createElement('button');
    deleteBook.classList.toggle('delete-book');
    deleteBook.setAttribute('data-value', dataValue);
    deleteBook.textContent = "delete";
    readAndDelete.appendChild(deleteBook);

    // console.log(bookCard);
}


function buildUpform(e) {

    // this creates the form
    theForm = document.createElement('form');
    bookDescriptions.appendChild(theForm);
    theForm.setAttribute('action', '#');
    theForm.setAttribute('id', 'form');


    const title = document.createElement('div');
    title.classList.toggle('title');
    theForm.appendChild(title);


    const author = document.createElement('div');
    author.classList.toggle('author');
    theForm.appendChild(author);


    const pages = document.createElement('div');
    pages.classList.toggle('pages');
    theForm.appendChild(pages);


    const isRead = document.createElement('div');
    isRead.classList.toggle('isRead');
    theForm.appendChild(isRead);


    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title';

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('name', 'title');
    titleInput.required = true;

    title.appendChild(titleLabel);
    title.appendChild(titleInput);

    
    const authorLabel = document.createElement('label');
    authorLabel.setAttribute('for', 'author');
    authorLabel.textContent = 'Author';

    const authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('id', 'author');
    authorInput.setAttribute('name', 'author');
    authorInput.required = true;

    author.appendChild(authorLabel);
    author.appendChild(authorInput);



    const pagesLabel = document.createElement('label');
    pagesLabel.setAttribute('for', 'pages');
    pagesLabel.textContent = 'Total Pages';

    const pagesInput = document.createElement('input');
    pagesInput.setAttribute('type', 'text');
    pagesInput.setAttribute('id', 'pages');
    pagesInput.setAttribute('name', 'pages');
    pagesInput.required = true;

    pages.appendChild(pagesLabel);
    pages.appendChild(pagesInput);



    const readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'read');
    readLabel.textContent = 'Have you read the book';
    
    const readInput = document.createElement('input');
    readInput.setAttribute('type', 'checkbox');
    readInput.setAttribute('id', 'read');
    readInput.setAttribute('name', 'read');

    isRead.appendChild(readLabel);
    isRead.appendChild(readInput);



    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Add Book';
    theForm.appendChild(submitButton);

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.toggle('cancel');
    theForm.appendChild(cancelButton);


    theSubmitButton = submitButton;
    theTitle = titleInput;
    theAuthor = authorInput;
    thePages = pagesInput;
    theRead = readInput;
}


function changeReadStatus(readButton) {
    const index = parseInt(readButton.getAttribute('data-value'));

    if (myLibrary[index].isRead === true) {
        myLibrary[index].isRead = false;
        readButton.textContent = 'Not Read';
        readButton.classList.remove('read-status-yes');
        readButton.classList.add('read-status-no');
    }
    else {
        myLibrary[index].isRead = true;
        readButton.textContent = 'Read';
        readButton.classList.remove('read-status-no');
        readButton.classList.add('read-status-yes');
    }
    // console.log(myLibrary);
}


function deleteAndUpdateDoms(theDom) {

    const index = theDom.getAttribute('data-value');
    const elementToDelete = document.querySelector(`div[data-value='${index}']`);
    allBooks.removeChild(elementToDelete);

    myLibrary.splice(index, 1);

    const remainingBooks = Array.from(document.querySelectorAll('.book-card'));
    const remainingStatusButton = Array.from(document.querySelectorAll('#read-status'));
    const remainingDeleteButton = Array.from(document.querySelectorAll('.delete-book'));

    for (let i = 0; i < myLibrary.length; i++) {
        remainingBooks[i].setAttribute('data-value', `${i}`);
        remainingStatusButton[i].setAttribute('data-value', `${i}`);
        remainingDeleteButton[i].setAttribute('data-value', `${i}`);
    }
    console.log(allBooks);
    console.log(myLibrary);
}


function takeEvents(e) {

    if ((e.target.classList.value === 'newBook' || e.target.getAttribute('src') === 'plus-thick.png' || e.target.textContent === 'NEW BOOK') && theForm === undefined) {
        buildUpform(e);
    }

    else if (e.target.getAttribute('type') === 'submit') {
        if (theTitle.value.length === 0 || theAuthor.value.length === 0 || thePages.value.length === 0) {
            alert("Please fill out the required options");
        }
        else {
            addBookToLibrary(theTitle.value, theAuthor.value, thePages.value, theRead.checked, e);
        }
    }

    else if (e.target.classList.value === 'cancel') {
        bookDescriptions.removeChild(theForm);
        theForm = undefined;
    }

    else if (e.target.classList.value === 'read-status-yes' || e.target.classList.value === 'read-status-no') {
        changeReadStatus(e.target);
    }

    else if (e.target.classList.value === 'delete-book') {
        deleteAndUpdateDoms(e.target);
    }
}


// main function

let theSubmitButton;
let theTitle;
let theAuthor;
let thePages;
let theRead;
let theForm;



const allBooks = document.querySelector('.all-books');
const addBooks = document.querySelector('add-books');
const bookDescriptions = document.querySelector(".book-descriptions");
const newBook = document.querySelector(".newBook");
// let insideButton = Array.from(document.querySelectorAll('.newBook > *'));
// insideButton.push(newBook);
// console.log(insideButton);

document.addEventListener('click', takeEvents);
// insideButton.forEach(element => {
//     element.addEventListener('click', takeEvents, {capture: true});
// });



// ######################## TEMPLATES FOR MY HTML #########################
