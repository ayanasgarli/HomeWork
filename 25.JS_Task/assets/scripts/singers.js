import { getSingersAll, deleteSingers } from "./singersRequest.js";

function renderSingerCards(singers) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = '';

  singers.forEach((singer) => {
    const card = document.createElement("div");
    card.classList.add("col-md-3", "mb-4", "singer-card");

    const cardHtml = `
      <div class="card">
        <img src="${singer.imagelink}" class="card-img-top" alt="${singer.name}">
        <div class="card-body">
          <h5 class="card-title">${singer.name}</h5>
          <p class="card-text">${singer.name} is <b> ${singer.nationality} </b></p>
          <button class="btn btn-primary detail-button" data-detail-id="${singer.id}" >Details</button>
          <button class="btn btn-success edit-button" data-singer-id="${singer.id}"><i class="fa-solid fa-edit"></i></button>
          <button class="btn btn-danger delete-button" data-singer-id="${singer.id}"><i class="fa-solid fa-trash"></i></button>
          <i class="fa-regular fa-heart fa-2x favIcon id="${card.id}"></i>
          </div>
      </div>
    `;

    card.innerHTML = cardHtml;
    cardContainer.appendChild(card);
  });
}

function sortSingersByName(singers) {
  return singers.sort((a, b) => a.name.localeCompare(b.name));
}


const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const singerId = button.getAttribute("data-singer-id");
    const singerToEdit = singers.find((singer) => singer.id === singerId);
    
    const editSingerModal = document.getElementById("edit-singer-modal");
    editSingerModal.classList.add("show");

    const editNameInput = document.querySelector(".edit-name");
    const editNationalityInput = document.querySelector(".edit-nationality");
    const editImageLinkInput = document.querySelector(".edit-imgagelink");
    const editGenreInput = document.querySelector(".edit-genre");
    const editAgeInput = document.querySelector(".edit-age");

    editNameInput.value = singerToEdit.name;
    editNationalityInput.value = singerToEdit.nationality;
    editImageLinkInput.value = singerToEdit.imagelink;
    editGenreInput.value = singerToEdit.genre;
    editAgeInput.value = singerToEdit.age;

    const editSaveButton = document.querySelector(".edit-save-button");
    editSaveButton.addEventListener("click", () => {
      singerToEdit.name = editNameInput.value;
      singerToEdit.nationality = editNationalityInput.value;
      singerToEdit.imagelink = editImageLinkInput.value;
      singerToEdit.genre = editGenreInput.value;
      singerToEdit.age = editAgeInput.value;

      editSingerModal.classList.remove("show");
      renderSingerCards(singers);
    });
  });
});



document.addEventListener("DOMContentLoaded", async () => {
  try {
    const singers = await getSingersAll();
    renderSingerCards(singers);
  

    const searchInput = document.querySelector(".search-singer-input");

    searchInput.addEventListener("keyup", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredSingers = singers.filter((singer) =>
        singer.name.toLowerCase().includes(searchTerm)
      );
      renderSingerCards(filteredSingers);
    });
    

    const sortButton = document.querySelector(".sort-by-name-button");
    sortButton.addEventListener("click", () => {
      const singerCards = document.querySelectorAll(".singer-card");
      const sortedSingers = sortSingersByName([...singers]);
      renderSingerCards(sortedSingers);
    });

    const addNewSingerButton = document.getElementById("add-singer-button");
    const addSingerModal = document.getElementById("add-singer-modal");

    addNewSingerButton.addEventListener("click", () => {
      addSingerModal.classList.add("show");
    });



    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const singerId = button.getAttribute("data-singer-id");

        const confirmDelete = await Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete this singer?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it' 
        });

        if (confirmDelete.isConfirmed) {
          const cardToRemove = document.querySelector(`.singer-card [data-singer-id="${singerId}"]`).closest(".singer-card");
          if (cardToRemove) {
            cardToRemove.remove();
          }

          await deleteSingers(singerId);

          Swal.fire('Deleted!', 'The singer has been deleted.', 'success');
        }

      });

    });

    let favorites = JSON.parse(localStorage.getItem("cart")) || [];
    let heartButtons = document.querySelectorAll(".favIcon")
    heartButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (!JSON.parse(localStorage.getItem("cart"))) {
          localStorage.setItem("cart", JSON.stringify([{id:this.id}]));
          this.classList.replace("fa-regular", "fa-solid");
        } else {
          let cardsLocal = JSON.parse(localStorage.getItem("cart"));
          let found = cardsLocal.find((x) => x.id == this.id);
          if(found){
            found.quantity++
            this.classList.replace("fa-solid", "fa-regular");
            let updatedCat = cardsLocal.filter((x)=> x.id!= this.id)
            localStorage.setItem("cart", JSON.stringify(updatedCat))
            wishlistCount.textContent = JSON.parse(localStorage.getItem("cart")).length
          } else {
            this.classList.replace("fa-regular", "fa-solid");
            localStorage.setItem("cart", JSON.stringify([...cardsLocal, {id:this.id, quantity:1}]))
            wishlistCount.textContent = JSON.parse(localStorage.getItem("cart")).length
          }}
      });
    });

    const detailButtons = document.querySelectorAll(".detail-button");
    detailButtons.forEach((button) => {
      button.addEventListener("click", () => {
          window.location.href = `detail.html?id=${button.getAttribute("data-detail-id")}`;
      });
    });
  } catch (error) {
    console.error("Error fetching singers:", error);
  }
});
// Wishlist sayin artmasi 
wishlistCount.textContent = JSON.parse(localStorage.getItem("cart")).length;
  