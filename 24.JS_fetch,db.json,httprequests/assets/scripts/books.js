let bookContainer = document.getElementById("bookContainer");
let BASE_URL = "http://localhost:3000";
let books = []; 
let basketCount = document.querySelector('.basket-count');

fetch(BASE_URL + "/books")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error!: ${response.status}`);
        }
        return response.json();
    })
    .then((books) => {
        displayBooks(books);
    })
    .catch((error) => {
        console.error("Error fetching books:", error);
    });

function displayBooks(books) {
    bookContainer.innerHTML = "";
    books.forEach((book) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${book.coverImg}" alt="${book.name}" />
            <h2 class="book-title">${book.name}</h2>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Page Count:</strong> ${book.pageCount}</p>
            <p>${book.description}</p>
            <button class="edit-button" data-book-id="${book.id}"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-button" data-book-id="${book.id}"><i class="fa-solid fa-trash"></i></button>
            <button class="info-button" data-book-id="${book.id}"><i class="fa-solid fa-circle-info"></i></i></button>
            <button class="add-basket-button" data-book-id="${book.id}"><i class="fa-solid fa-basket-shopping"></i></button>

        `;
        bookContainer.appendChild(card);
    });

    let editButtons = document.querySelectorAll(".edit-button");
    let deleteButtons = document.querySelectorAll(".delete-button");
    let infoButtons = document.querySelectorAll(".info-button");
    let addBasketBtns = document.querySelectorAll(".add-basket-button");

    addBasketBtns.forEach((button)=>{
        button.addEventListener('click', function(){
            fetch(BASE_URL+`/books/${this.id}`)
            .then((res)=>res.json())
            .then((book)=>{
                if(JSON.parse(localStorage.getItem(`basket`))===null) {
                    book.quantity = 1;
                    localStorage.setItem('basket', JSON.stringify([book]))
                    basketCount.textContent = JSON.parse(localStorage.getItem('basket')).length;
                }
                else{
                    let card = JSON.parse(localStorage.getItem('basket'));
                    let found = card.find((x)=> x.id==book.id);
                    if(found) {
                        found.quantity++;
                        localStorage.setItem('basket',JSON.stringify([...card]));
                    }
                    else{
                        book.quantity = 1;
                        localStorage.setItem('basket',JSON.stringify([...card,product]));
                        basketCount.textContent = JSON.parse(localStorage.getItem('basket')).length;
                    }
                }
            })

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'The book added to cart',
                showConfirmButton: false,
                timer: 1500
              })
        })
    }
    )
    


    
    infoButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let bookId = event.target.getAttribute("data-book-id");
            let book = books.find((b) => b.id === parseInt(bookId));
            if (book) {
                window.location.href = `detail.html?bookId=${book.id}`;
            }
        });
    });

    editButtons.forEach((button) => {
        button.addEventListener("click", (e) => openEditModal(e));
    });

    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => openDeleteModal(e));
    });
}

function updateBook(bookId, updatedBook) {
    fetch(BASE_URL + `/books/${bookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            loadBooks(); 
            Swal.fire("Success", "Book updated successfully!", "success");
        })
        .catch((error) => {
            console.error("Error updating book:", error);
            Swal.fire("Error", "Failed to update book", "error");
        });
}

function deleteBook(bookId) {
    Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this book?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(BASE_URL + `/books/${bookId}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(() => {
                    loadBooks();
                    Swal.fire("Success", "Book deleted successfully!", "success");
                })
                .catch((error) => {
                    console.error("Error deleting book:", error);
                    Swal.fire("Error", "Failed to delete book", "error");
                });
        }
    });
}

function openEditModal(event) {
    let bookId = event.target.getAttribute("data-book-id");

    Swal.fire({
        title: "Edit Book",
        html: `
            <input id="editName" class="swal2-input" placeholder="Name">
            <input id="editGenre" class="swal2-input" placeholder="Genre">
            <input id="editPrice" class="swal2-input" placeholder="Price">
            <input id="editPageCount" class="swal2-input" placeholder="Page Count">
            <input id="editCoverImg" class="swal2-input" placeholder="Cover Image">
            <input id="editAuthor" class="swal2-input" placeholder="Author">
            <input id="editYear" class="swal2-input" placeholder="Year">
            <input id="editDescription" class="swal2-input" placeholder="Description">
        `,
        showCancelButton: true,
        confirmButtonText: "Submit",
    }).then((result) => {
        if (result.isConfirmed) {
            let editedBook = {
                name: document.getElementById("editName").value,
                genre: document.getElementById("editGenre").value,
                price: document.getElementById("editPrice").value,
                pageCount: document.getElementById("editPageCount").value,
                coverImg: document.getElementById("editCoverImg").value,
                author: document.getElementById("editAuthor").value,
                year: document.getElementById("editYear").value,
                description: document.getElementById("editDescription").value,
            };

            updateBook(bookId, editedBook); 
        }
    });
}

function openDeleteModal(event) {
    let bookId = event.target.getAttribute("data-book-id");
    deleteBook(bookId); 
}



function handleSearch() {
    let searchInput = document.getElementById("searchInput");
    let searchTerm = searchInput.value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    let found = false;

    cards.forEach((card) => {
        let title = card.querySelector(".book-title").textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = "block"; 
            found = true;
        } else {
            card.style.display = "none"; 
        }
    });

    if (!found) {
        document.getElementById("noDataMessage").style.display = "block";
    } else {
        document.getElementById("noDataMessage").style.display = "none";
    }
}

let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearch);

function sortBooksByYear(books) {
    return books.sort((a, b) => b.year - a.year);
}


function updateBookDisplay(books) {
    displayBooks(books);
}

let sortByYearButton = document.getElementById("sortByYearButton");
sortByYearButton.addEventListener("click", () => {
    books = sortBooksByYear(books);
    displayBooks(books);
});

function filterBooksByGenre(genre) {
    if (genre === "all") {
        return books; 
    } else {
        return books.filter((book) => book.genre === genre);
    }
}

function updateBookDisplay(books) {
    displayBooks(books);
}

let genreFilter = document.getElementById("genreFilter");
genreFilter.addEventListener("change", () => {
    let selectedGenre = genreFilter.value;
    let filteredBooks = filterBooksByGenre(selectedGenre);
    updateBookDisplay(filteredBooks);
});

function openAddBookModal() {
    let addBookModal = document.getElementById("addBookModal");
    addBookModal.style.display = "block";
}

let closeAddBookModalButton = document.getElementById("closeAddBookModal");
closeAddBookModalButton.addEventListener("click", () => {
    closeModal();
});

function closeModal() {
    let addBookModal = document.getElementById("addBookModal");
    addBookModal.style.display = "none";
}

let addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", () => openAddBookModal());

function handleAddBookFormSubmit(event) {
    event.preventDefault(); 

    let name = document.getElementById("name").value;
    let pageCount = parseInt(document.getElementById("pageCount").value, 10);
    let coverImage = document.getElementById("coverImage").value;
    let author = document.getElementById("author").value;
    let year = parseInt(document.getElementById("year").value, 10);
    let description = document.getElementById("description").value;
    let genre = document.getElementById("genre").value;

    let errors = validateInput(name, pageCount, coverImage, author, year, genre);

    if (errors.length === 0) {
        let newBook = {name, pageCount, coverImg: coverImage, author, year, description, genre,};

        fetch(BASE_URL + "/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                loadBooks(); 
                closeModal();
                Swal.fire("Success", "Book added successfully!", "success");
            })
            .catch((error) => {
                console.error("Error adding book:", error);
                Swal.fire("Error", "Failed to add book", "error");
            });
    } else {
        displayValidationErrors(errors);
    }
}

function validateInput(name, pageCount, coverImage, author, year, genre) {
    let errors = [];

    if (name.length < 3) {
        errors.push("Name must be at least 3 characters long");
    }

    if (pageCount < 1 || pageCount > 700) {
        errors.push("Page Count must be between 1 and 700");
    }

    if (coverImage.trim() === "") {
        errors.push("Cover Image is required");
    }

    if (author.trim() === "") {
        errors.push("Author is required");
    }

    if (year < 0 || year > new Date().getFullYear()) {
        errors.push("Year must be between 0 and the current year");
    }

    if (genre === "none") {
        errors.push("Please select a genre");
    }

    return errors;
}

function displayValidationErrors(errors) {
    let errorList = document.getElementById("errorList");
    errorList.innerHTML = "";

    errors.forEach((error) => {
        let errorItem = document.createElement("li");
        errorItem.textContent = error;
        errorList.appendChild(errorItem);
    }
    )
}

const addBookForm = document.getElementById("addBookForm");
addBookForm.addEventListener("submit", handleAddBookFormSubmit);





