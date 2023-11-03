import { getMealsAll } from "./mealsRequest.js";

function renderMealCards(meals) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ''; 

  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.classList.add("col-md-3", "mb-4", "meal-card");

    const cardHtml = `
      <div class="card">
        <img src="${meal.imagelink}" class="card-img-top" alt="${meal.name}">
        <div class="card-body">
          <h5 class="card-title">${meal.name}</h5>
          <p class="card-text">Price: <b>${meal.price}</b></p>
          <button class="btn btn-primary detail-button" data-detail-id="${meal.id}" >Details</button>
          <button class="btn btn-danger delete-button" data-meal-id="${meal.id}"><i class="fa-solid fa-trash"></i></button>
          <button id=${meal.id} class="btn btn-warning basket-button"><i class="fa-solid fa-basket-shopping"></i></button>
        </div>
      </div>
    `;

    card.innerHTML = cardHtml;
    cardContainer.appendChild(card);
  });
}

function sortMealsByName(meals) {
  return meals.sort((a, b) => a.name.localeCompare(b.name));
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const meals = await getMealsAll();
    renderMealCards(meals);



    const searchInput = document.querySelector(".search-meal-input");

    searchInput.addEventListener("keyup", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredMeals = meals.filter((meal) =>
        meal.name.toLowerCase().includes(searchTerm)
      );
      renderMealCards(filteredMeals);
    });
    const sortButton = document.querySelector(".sort-by-name-button");
    sortButton.addEventListener("click", () => {
      const mealCards = document.querySelectorAll(".meal-card");
      const sortedMeals = sortMealsByName([...meals]);
      renderMealCards(sortedMeals);
    });

    const detailButtons = document.querySelectorAll(".detail-button");
    detailButtons.forEach((button) => {
      button.addEventListener("click", () => {
          window.location.href = `mealsDetail.html?id=${button.getAttribute("data-detail-id")}`;
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const mealId = button.getAttribute("data-meal-id");

        const confirmDelete = await Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete this meal?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it' 
        });

        if (confirmDelete.isConfirmed) {
          const cardToRemove = document.querySelector(`.meal-card [data-meal-id="${mealId}"]`).closest(".meal-card");
          if (cardToRemove) {
            cardToRemove.remove();
          }

          await deleteMeals(singerId);

          Swal.fire('Deleted!', 'The meal has been deleted.', 'success');
        }

      });
    });

// basket
let basketButtons = document.querySelectorAll(".basket-button")
// console.log(basketButtons)
let arr = [] 
console.log(JSON.parse(localStorage.getItem("basket")))
if(JSON.parse(localStorage.getItem("basket"))) {
  arr = JSON.parse(localStorage.getItem("basket"))
  console.log(arr)
}
basketButtons.forEach (btn => {
  btn.addEventListener("click", function(){
    // console.log(this.id);
    // console.log(arr.find((x)=> x.id ==this.id));
    if(arr.find((x)=> x.id ==this.id)){
      let elem=arr.find((x)=> x.id ==this.id)
      elem.count=elem.count+1

      localStorage.setItem("basket", JSON.stringify(arr))
    }else{
      let obj = {id:this.id, count:1}
      arr.push(obj)
      localStorage.setItem("basket", JSON.stringify(arr))
    }
  })
})

//end basket



  } catch (error) {
    console.error("Error fetching meals:", error);
  }
});

