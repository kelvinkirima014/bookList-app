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
        
        const books = Store.getBooks();
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
        
        
        

    };

    static deleteBooks(elem){
        if(elem.classList.contains('delete')){
            elem.parentElement.parentElement.remove();
        }


    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className =`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
         container.insertBefore(div, form);

         // Remove after 3.5 Secs 
         setTimeout(() =>document.querySelector('.alert')
         .remove(), 3500);

    }


    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    };

};

//Store Class: To handle Storage
class Store{
  static  getBooks(){
      let books;
      if(localStorage.getItem('books')=== null){
          books = [];
      }else{
          books = JSON.parse(localStorage.getItem('books'));
      }
      return books;

    };
  static  addBooks(book){
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));

    };
  static  removeBooks(isbn){
      const books = Store.getBooks();
      books.forEach((book, index)=>{
          if(book.isbn === isbn){
              books.splice(index,1);
          }
      });
      localStorage.setItem('books',JSON.stringify(books));

    };

};


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

    //Validation 
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please enter all fields','danger');
      
    }else{

            //Instanciate Book 
    const book = new Book(title, author, isbn);

    // Add Book to UI

    UI.addBookToList(book);

    //Add Book to local storage
    
    Store.addBooks(book);

    //Show success after adding Book

    UI.showAlert('Book added successfully','success');

  

  

    //Clear Fields
     UI.clearFields();

    };
   

});
//Event Remove a Book

document.querySelector('#book-list').addEventListener('click',(e)=>{

     // Removes Book from UI
        UI.deleteBooks(e.target)

        //Removing book from Store

        Store.removeBooks
        (e.target.parentElement.previousElementSibling.textContent);

          //Show delete message after deleting Book

        UI.showAlert('Book Deleted','info');


});