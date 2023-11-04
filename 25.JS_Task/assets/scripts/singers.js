import { getSingersAll, deleteSingers } from "./singersRequest.js";
let favoriteArr = JSON.parse(localStorage.getItem("favorites")) || [];
function renderSingerCards(singers) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = '';


  singers.forEach((singer) => {
    setupFavoriteButtons();
    const card = document.createElement("div");
    card.classList.add("col-md-3", "mb-4", "singer-card");

    const cardHtml = `
      <div class="card" id="${singer.id}">
        <img src="${singer.imagelink}" class="card-img-top" alt="${singer.name}">
        <div class="card-body">
          <h5 class="card-title">${singer.name}</h5>
          <p class="card-text">${singer.name} is <b> ${singer.nationality} </b></p>
          <button class="btn btn-primary detail-button" data-detail-id="${singer.id}" >Details</button>
          <button class="btn btn-danger delete-button" data-singer-id="${singer.id}"><i class="fa-solid fa-trash"></i></button>
          <a href="#" class="btn btn-outline-danger heart" data-id="${singer.id}">
          <i class="fa-regular fa-heart ${favoriteArr.some(fav => fav.id === singer.id) ? "fa-solid" : ""}"></i>
        </a>
          </div>
      </div>
    `;

    card.innerHTML = cardHtml;
    cardContainer.appendChild(card);
  });
}


function setupFavoriteButtons() {
  const heartButtons = document.querySelectorAll(".heart");
  heartButtons.forEach((heart) => {
    heart.addEventListener("click", () => {
      const singerId = heart.getAttribute("data-id");
      let icon = heart.querySelector("i");
      const isFavorite = icon.classList.contains("fa-solid");

      if (!isFavorite) {
        icon.classList.add("fa-solid");
        favoriteArr.push({ id: singerId });
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: `Added to Favorites`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        icon.classList.remove("fa-solid");
        favoriteArr = favoriteArr.filter((fav) => fav.id !== singerId);
      }

      localStorage.setItem("favorites", JSON.stringify(favoriteArr));
    });
  });
}

function sortSingersByName(singers) {
  return singers.sort((a, b) => a.name.localeCompare(b.name));
}


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


