let theSubmitButton;
let theTitle;
let theAuthor;
let thePages;
let theRead;


const bookDescriptions = document.querySelector(".book-descriptions");
let theForm;


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

    // remove the form element
    bookDescriptions.removeChild(theForm);
    theForm = undefined;

    console.log(myLibrary);
}


function bringUpForm(e) {

    if (e.target.classList.value === 'newBook' && theForm === undefined) {

        e.target.removeEventListener('click', bringUpForm);
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
        pagesLabel.textContent = 'total pages';

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
        submitButton.textContent = 'add book';
        theForm.appendChild(submitButton);

        const cancelButton = document.createElement('button');
        cancelButton.setAttribute('type', 'button');
        cancelButton.textContent = 'cancel';
        cancelButton.classList.toggle('cancel')
        theForm.appendChild(cancelButton);


        theSubmitButton = submitButton;
        theTitle = titleInput;
        theAuthor = authorInput;
        thePages = pagesInput;
        theRead = readInput;
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
}






// main function
const newBook = document.querySelector(".newBook");

document.addEventListener('click', bringUpForm);




/* <form action="#" id="form">
<div class="title">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" required>
</div>
<div class="author">
    <label for="author">Author</label>
    <input type="text" id="author" name="author" required>
</div>
<div class="pages">
    <label for="pages">Pages #</label>
    <input type="number" id="pages" name="pages" required>
</div>
<div class="title">
    <label for="read">Have you read the book?</label>
    <input type="checkbox" id="read" name="read" value="read">
</div>
<button type="submit">add book</button>
</form> */