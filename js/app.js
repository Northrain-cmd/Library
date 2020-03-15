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

function formSubmit(){
    console.log("Form Submitted");
    addBookToLibrary(form.title.value,form.author.value,form.pages.value,form.year.value,form.isRead.checked);
    update();
}

function addCard(book){
    cardContainer.innerHTML+=`<div class="cell small-12 medium-6 large-3 card" data-closable>
    <div class="card-divider align-middle" style="position: relative">
        ${book.author}
        <i class="fa fa-gear"></i>
        <button class="close-button" aria-label="Close alert" type="button" data-close>
        <span aria-hidden="true">&times;</span>
      </button>
        </div>
        <div class="card-section">
        <h4>${book.title}</h4>
        <p>${book.pages} Pages</p>
        <p>Published in ${book.year}</p>
        <p>${book.isRead?"Read":"Not Read Yet"}</p>
        </div>
    </div>`;
    
}

function render(){
    myLibrary.forEach((book)=>{
        addCard(book);
        addBtnListeners();
    })
}

function update(){
    let book=myLibrary[myLibrary.length-1];
    addCard(book);
    addBtnListeners();
    }

    function edit(e){
        e.preventDefault();
        console.log("Hi");

    }


function addBtnListeners(){
    let removeButtons=document.querySelectorAll(".close-button");
    removeButtons.forEach((button,index)=>{
            button.addEventListener("click",(e)=>{
                let removeTitle=e.target.parentElement.parentElement.nextElementSibling.firstElementChild.textContent;
                myLibrary.forEach((book,index,self)=>{
                    if(book.title!==removeTitle) return book
                    else self.splice(index,1)
    
                });
                console.table(myLibrary);
            })
        })
    let editButtons=document.querySelectorAll(".fa-gear");
    editButtons.forEach(button=>button.classList.remove("disabled"));
    editButtons.forEach((button,index)=>{
        button.addEventListener("click",(e)=>{
            Array.from(editButtons).splice(index,1);
            editButtons.forEach(button=>button.classList.add("disabled")); 
            let book=myLibrary.find(book=>{
                return book.title===e.target.parentElement.nextElementSibling.firstElementChild.textContent;
            })
            console.log(book);
            e.target.parentElement.parentElement.innerHTML=`
            <div class="grid-container">
            <form autocomplete="off" onSubmit='return false' class="form-edit">
            <div class="grid-x grid-padding-x align-middle align-center form-grid">
            <div class="small-12 medium-10  cell">
              <label>Title
                <input type="text" value='${book.title}' name="title" placeholder="Book Title" required>
              </label>
            </div>
            <div class="small-12 medium-10 cell">
              <label>Author
                <input type="text" value='${book.author}' name="author" placeholder="Book Author" required>
              </label>
            </div>
            <div class="small-4 cell  move">
              <label>Pages
                <input type="number" value='${book.pages}' name="pages" min="1" required>
              </label>
            </div>
            <div class="small-5 cell">
              <label>Year
                <input type="number" value='${book.year}' name="year" min="1" required>
              </label>
            </div>
            <div class="small-3 medium-2 cell move  text-left readField ">
            <fieldset style="display:flex; justify-content:center">
              <input type="checkbox" name="isRead" id="isReadButton"><label for="isReadButton">Read</label>
            </fieldset>
            </div>
            <button type="submit" class="edit-save small-12 medium-8 large-6 button large submit-button">Save</button>
            </div>
          </form>
          </div>`;
          const editForm=document.querySelector(".form-edit");
          editForm.addEventListener('submit',(e)=>{
                book.title=editForm.title.value;
                book.author=editForm.author.value;
                book.pages=editForm.pages.value;
                book.year=editForm.year.value;
                book.isRead=editForm.isRead.checked;
                    console.table(myLibrary);
                e.target.parentElement.parentElement.innerHTML=`
                <div class="card-divider align-middle" style="position: relative">
                    ${book.author}
                    <i class="fa fa-gear"></i>
                    <button class="close-button" aria-label="Close alert" type="button" data-close>
                    <span aria-hidden="true">&times;</span>
                </button>
                    </div>
                    <div class="card-section">
                    <h4>${book.title}</h4>
                    <p>${book.pages} Pages</p>
                    <p>Published in ${book.year}</p>
                    <p>${book.isRead?"Read":"Not Read Yet"}</p>
                    </div>
                `;
               
               
                addBtnListeners();
               
          })
         

        })
       
    })
    }

    


addBookToLibrary("Lord of The Rings","J.R.Tolkien",423,1954,true);
addBookToLibrary("The Catcher in the Rye","J.D.Salinger",234,1951,false);

const cardContainer=document.querySelector(".card-container");
const form=document.querySelector("form");
form.reset();

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    formSubmit(); 
})

render();

