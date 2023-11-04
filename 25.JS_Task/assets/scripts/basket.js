import { BASE_URL } from "./mealsRequest.js";

let basketListCount = document.querySelector(".basketListCount");

document.addEventListener("DOMContentLoaded", function () {
  let baskets = [];
  let tbody = document.querySelector("#tbody");

  baskets = JSON.parse(localStorage.getItem("basket"));
  if (baskets) {
    axios.get(BASE_URL + `/meals`).then((result) => {
      let meals = result.data;
      console.log(meals);

      tbody.innerHTML = "";
      baskets.forEach((basketMeal) => {
        let meal = meals.find((meal) => meal.id == basketMeal.id);
        console.log(meal);
        tbody.innerHTML += `
                <tr>
                        <td class="basketId">${meal.id}</td>
                        <td class="basketName">${meal.name}</td>
                        <td class="basketImage"><img width="50" height="45" src="${meal.imagelink}"></img></td> 
                        <td class="basketPrice">${meal.price}</td>
                        <td class="basketQuantity">1</td>
                        <td class="basketTotal">${meal.price}</td>
                        <td><button type="button" class="btn btn-success increase">+</button></td>
                        <td><button type="button" class="btn btn-danger decrease">-</button></td>
                        <td><button type="button" class="btn btn-danger remove" data-id="${meal.id}"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>
                `;
//deleting
        let deleteButtons = document.querySelectorAll(".remove");
        let arr = [];
        if (JSON.parse(localStorage.getItem("basket"))) {
            arr = JSON.parse(localStorage.getItem("basket"))
        }
        deleteButtons.forEach((btn) => {
          btn.addEventListener("click", function () {
            //UI Silmek
            this.parentElement.parentElement.remove();

            //LocalStorage Silmek
            if (!JSON.parse(localStorage.getItem("basket"))) {
              localStorage.setItem("basket", JSON.stringify([{ id: this.getAttribute("data-id") }]));
            } else {
              let cardsLocal = JSON.parse(localStorage.getItem("basket"));
              let found = cardsLocal.find((x) => x.id == this.getAttribute("data-id"));
              if (found) {
                let updatedBasket = cardsLocal.filter((x) => x.id != this.getAttribute("data-id"));
                localStorage.setItem("basket", JSON.stringify(updatedBasket));
                basketListCount.textContent = updatedBasket.length;
              } else {
                localStorage.setItem(
                  "basket",
                  JSON.stringify([...cardsLocal, { id: this.getAttribute("data-id"), count: 1 }])
                );
                basketListCount.textContent = parseInt(basketListCount.textContent) + 1; 
              }
            }
          });
        });


//increasing
        let increaseButtons = document.querySelectorAll(".increase"); 
        increaseButtons.forEach((btn) => {
            btn.addEventListener("click", function(){
                let mealId = this.parentElement.parentElement.querySelector(".basketId").textContent;
                let currentBasket = JSON.parse(localStorage.getItem("basket"));
                let foundItem = currentBasket.find((x) => x.id === mealId);
                if (foundItem) {
                    foundItem.count++;
                    localStorage.setItem('basket', JSON.stringify(currentBasket));
                    this.parentElement.previousElementSibling.previousElementSibling.textContent = foundItem.count;
//totalPrice
                    let priceElement = this.parentElement.parentElement.querySelector(".basketPrice");
                    let totalElement = this.parentElement.parentElement.querySelector(".basketTotal");
                    let mealPriceIn$ = parseInt(priceElement.textContent); 
                    totalElement.textContent = (foundItem.count * mealPriceIn$) + " $"; 
                }
            });
        });

//decreasing
            let decreaseButtons = document.querySelectorAll(".decrease"); 
            decreaseButtons.forEach((btn) => {
                btn.addEventListener("click", function(){
                    let mealId = this.parentElement.parentElement.querySelector(".basketId").textContent;
                    let currentBasket = JSON.parse(localStorage.getItem("basket"));
                    let foundItem = currentBasket.find((x) => x.id === mealId);
                    if (foundItem && foundItem.count > 1) {
                        foundItem.count--; 
                        localStorage.setItem('basket', JSON.stringify(currentBasket));
                        this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent = foundItem.count;
//totalPrice
                        let priceElement = this.parentElement.parentElement.querySelector(".basketPrice");
                        let totalElement = this.parentElement.parentElement.querySelector(".basketTotal");
                        let mealPriceIn$ = parseInt(priceElement.textContent); 
                        totalElement.textContent = (foundItem.count * mealPriceIn$) + "$";
                    }
                });
            });

      });
    });
  }
});
