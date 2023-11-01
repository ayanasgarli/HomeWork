// import { getSingersAll } from "./singersRequest.js";

// function renderSingerCards(singers) {
//   const cardContainer = document.getElementById("card-container");
//   cardContainer.innerHTML = ''; 

//   singers.forEach((singer) => {
//     const card = document.createElement("div");
//     card.classList.add("col-md-3", "mb-4", "singer-card");

//     const cardHtml = `
//       <div class="card">
//         <img src="${singer.imagelink}" class="card-img-top" alt="${singer.name}">
//         <div class="card-body">
//           <h5 class="card-title">${singer.name}</h5>
//           <p class="card-text">${singer.name} is ${singer.nationality}</p>
//           <button class="btn btn-primary detail-button">Detail</button>
//           <button class="btn btn-danger delete-button"><i class="fa-solid fa-trash"></i></button>
//           <button class="btn btn-warning favorite-button"><i class="fa-regular fa-heart"></i></button>
//         </div>
//       </div>
//     `;

//     card.innerHTML = cardHtml;
//     cardContainer.appendChild(card);
//   });
// }

// function sortSingersByName(singers) {
//   return singers.sort((a, b) => a.name.localeCompare(b.name));
// }

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const singers = await getSingersAll();
//     renderSingerCards(singers);

//     const sortButton = document.querySelector(".sort-by-name-button");
//     sortButton.addEventListener("click", () => {
//       const singerCards = document.querySelectorAll(".singer-card");
//       const sortedSingers = sortSingersByName([...singers]);
//       renderSingerCards(sortedSingers);
//     });

//   } catch (error) {
//     console.error("Error fetching singers:", error);
//   }  
// });



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
          <p class="card-text">${singer.name} is ${singer.nationality}</p>
          <button class="btn btn-primary detail-button">Detail</button>
          <button class="btn btn-danger delete-button" data-singer-id="${singer.id}"><i class="fa-solid fa-trash"></i></button>
          <button class="btn btn-warning favorite-button"><i class="fa-regular fa-heart"></i></button>
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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const singers = await getSingersAll();
    renderSingerCards(singers);

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
          cardColor: '#fff',
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
  } catch (error) {
    console.error("Error fetching singers:", error);
  }
});
