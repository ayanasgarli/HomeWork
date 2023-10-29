
const bookContainer = document.getElementById("bookContainer");
const BASE_URL = "http://localhost:3000";
let books = []; 

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
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${book.coverImg}" alt="${book.name}" />
            <h2 class="book-title">${book.name}</h2>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Page Count:</strong> ${book.pageCount}</p>
            <p>${book.description}</p>
            <button class="edit-button" data-book-id="${book.id}">Edit</button>
            <button class="delete-button" data-book-id="${book.id}">Delete</button>
        `;
        bookContainer.appendChild(card);
    });

    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");

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
    const bookId = event.target.getAttribute("data-book-id");

    Swal.fire({
        title: "Edit Book",
        html: `
            <input id="editName" class="swal2-input" placeholder="Name">
            <input id="editAuthor" class="swal2-input" placeholder="Author">
            <input id="editDescription" class="swal2-input" placeholder="Description">
        `,
        showCancelButton: true,
        confirmButtonText: "Submit",
    }).then((result) => {
        if (result.isConfirmed) {
            const editedBook = {
                name: document.getElementById("editName").value,
                author: document.getElementById("editAuthor").value,
                description: document.getElementById("editDescription").value,
            };

            updateBook(bookId, editedBook); 
        }
    });
}

function openDeleteModal(event) {
    const bookId = event.target.getAttribute("data-book-id");

    deleteBook(bookId); 
}

function handleSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".card");
    let found = false;

    cards.forEach((card) => {
        const title = card.querySelector(".book-title").textContent.toLowerCase();
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

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearch);

function sortBooksByYear(books) {
    return books.sort((a, b) => b.year - a.year);
}


function updateBookDisplay(books) {
    displayBooks(books);
}

const sortByYearButton = document.getElementById("sortByYearButton");
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

const genreFilter = document.getElementById("genreFilter");
genreFilter.addEventListener("change", () => {
    const selectedGenre = genreFilter.value;
    const filteredBooks = filterBooksByGenre(selectedGenre);
    updateBookDisplay(filteredBooks);
});

function openAddBookModal() {
    const addBookModal = document.getElementById("addBookModal");
    addBookModal.style.display = "block";
}

const closeAddBookModalButton = document.getElementById("closeAddBookModal");
closeAddBookModalButton.addEventListener("click", () => {
    closeModal();
});

function closeModal() {
    const addBookModal = document.getElementById("addBookModal");
    addBookModal.style.display = "none";
}

const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", () => openAddBookModal());

function handleAddBookFormSubmit(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const pageCount = parseInt(document.getElementById("pageCount").value, 10);
    const coverImage = document.getElementById("coverImage").value;
    const author = document.getElementById("author").value;
    const year = parseInt(document.getElementById("year").value, 10);
    const description = document.getElementById("description").value;
    const genre = document.getElementById("genre").value;

    const errors = validateInput(name, pageCount, coverImage, author, year, genre);

    if (errors.length === 0) {
        const newBook = {
            name,
            pageCount,
            coverImg: coverImage,
            author,
            year,
            description,
            genre,
        };

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
    const errors = [];

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
    const errorList = document.getElementById("errorList");
    errorList.innerHTML = "";

    errors.forEach((error) => {
        const errorItem = document.createElement("li");
        errorItem.textContent = error;
        errorList.appendChild(errorItem);
    }
    )
}

const addBookForm = document.getElementById("addBookForm");
addBookForm.addEventListener("submit", handleAddBookFormSubmit);

