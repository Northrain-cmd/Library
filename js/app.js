$(document).foundation();
let myLibrary=[];
function Book(title,author,pages,year,isRead){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.year=year;
    this.isRead=isRead;
    this.info=function(){
        return title+' by '+author+' , '+pages+" "+isRead
    }
}
function addBookToLibrary(title,author,pages,year,isRead){
    let book= new Book(title,author,pages,year,isRead);
    myLibrary.push(book);
}
addBookToLibrary("Lord of The Rings","J.R.Tolkien",423,1954,true);
addBookToLibrary("The Catcher in the Rye","J.D.Salinger",234,1951,false);
function formSubmit(){
    console.log("Form Submitted")
    addBookToLibrary(form.title.value,form.author.value,form.pages.value,form.year.value,form.isRead.checked);
    update();
    console.log(myLibrary);
}
const form=document.querySelector("form");
form.addEventListener('submit',formSubmit);
const cardContainer=document.querySelector(".card-container");
function addCard(book,index){
    cardContainer.innerHTML+=`<div class="cell small-12 medium-4 large-3 card" data-closable>
        <div class="card-divider" style="position: relative;">
        ${book.author}
        <button class="close-button" aria-label="Close alert" type="button" data-close data-card="${index}">
        <span aria-hidden="true">&times;</span>
      </button>
        </div>
        <div class="card-section">
        <h4>${book.title}</h4>
        <p>${book.pages} Pages</p>
        <p>${book.isRead?"Read":"Not Read Yet"}</p>
        </div>
    </div>`;
}
function render(){
    myLibrary.forEach((book,index)=>{
        addCard(book,index);
    })
}

function update(){
    let book=myLibrary[myLibrary.length-1];
    addCard(book,(myLibrary.length-1));
    }
render();
const removeButtons=document.querySelectorAll(".close-button");
removeButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        console.log(button.getAttribute("data-card"));
        let index=button.getAttribute("data-card");
        myLibrary.splice(index,1);
        console.log(myLibrary)
    });
})