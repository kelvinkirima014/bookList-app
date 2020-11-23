class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI CLASS
class UI{
    static displayBooks (){
        const storedBooks = [
            {
                title: 'Book 1',
                author: 'Kevin K',
                isbn: '62636'
            },
            {
                title: 'Book 2',
                author: 'Kevin',
                isbn: '626'
            }
        ];
        const books = storedBooks;
        books.forEach((book) => UI.addBookToList(book));
    } 
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr')
        row.innerHTML = `
        
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        
        `;
        list.appendChild(row);
        
        
        

    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}


//displayBooks

document.addEventListener('DOMContentLoaded',UI.displayBooks);

// event add a book

document.querySelector('#book-form').addEventListener('submit',(e)=> {

    //Prevent actual submit
    e.preventDefault();

    //GET form values

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
   
    //Instanciate Book 
    const book = new Book(title, author, isbn);

    // Add Book to UI

    UI.addBookToList(book);

    //Clear Fields
     UI.clearFields();
});
