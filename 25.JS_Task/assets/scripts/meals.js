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
          <button class="btn btn-primary detail-button">Detail</button>
          <button class="btn btn-danger delete-button"><i class="fa-solid fa-trash"></i></button>
          <button class="btn btn-warning favorite-button"><i class="fa-solid fa-basket-shopping"></i></button>
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

    const sortButton = document.querySelector(".sort-by-name-button");
    sortButton.addEventListener("click", () => {
      const mealCards = document.querySelectorAll(".meal-card");
      const sortedMeals = sortMealsByName([...meals]);
      renderMealCards(sortedMeals);
    });
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
});