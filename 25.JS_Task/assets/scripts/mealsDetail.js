import { getMealsById } from "./mealsRequest.js";

let cardmt = document.querySelector(".cardmt");
console.log(cardmt);

let id = new URLSearchParams(location.search).get("id");
const meal = await getMealsById(id);
cardmt.innerHTML=`
<div class="card col-5">
<img src="${meal.imagelink}" class="card-img-top" alt="${meal.name}">
<div class="card-body">
  <h5 class="card-title">${meal.name}</h5>
  <p class="card-text"><b>Price</b>: ${meal.price} </p>
  <p class="card-text"><b>Ingredients</b>: ${meal.ingredients} </p>
  <a class="btn btn-primary home-button" href="meals.html">Home</a>
</div>
</div>

`