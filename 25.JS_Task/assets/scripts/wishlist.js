
//wishlist js starts here
import axios from "axios";
import { API_BASE_URL } from "./singersRequest.js";
document.addEventListener("DOMContentLoaded", function() {
    let favorites = [];

    let tbody = document.querySelector("#tbody");
    
    favorites = JSON.parse(localStorage.getItem("cart"));
    console.log(favorites);
    if(favorites) {
        axios.get(API_BASE_URL + `/singers`).then((result) => {
            let singers = result.data;
            console.log(singers);

            tbody.innerHTML = "";
            favorites.forEach((favCard) => {
                let singer = singers.find((singer) => singer.id == favCard.id);
                console.log(singer);
                tbody.innerHTML += `
                <tr>
                <th scope= "row">${singer.name}</th>
                <td>${singer.name}<td>
                <td class=""img-box><img src="${singer.imagelink}" alt="${singer.name}"></td>
                <td>${singer.age}</td>
                <td>${singer.genre}</td>
                <td><button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"> </td>
                </tr>
                `;
                let deleteButtons = document.querySelectorAll(".delete-btn");
                deleteButtons.forEach((btn) => {
                    btn.addEventListener("click", function () {
                        // UI'dan silmek
                        this.parentElement.parentElement.remove();

                        // Local'dan silmek
                        if(!JSON.parse(localStorage.getItem("cart"))) {
                            localStorage.setItem("cart", JSON.stringify([{ id: this.id }]));
                        }
                        else {
                            let cardsLocal = JSON.parse(localStorage.getItem("cart"));
                            let found = cardsLocal.find((x) => x.id == this.id);
                            if (found) {
                                let updatedCat = cardsLocal.filter((x) => x.id != this.id);
                                localStorage.setItem("cart",JSON.stringify(updatedCat));
                                wishlistCount.textContent = JSON.parse(
                                    localStorage.getItem("cart")).length;
                            }
                            else{
                                localStorage.setItem("cart", JSON.stringify([...cardsLocal, { id:this.id, quantity: 1 }]));
                                wishlistCount.textContent = JSON.parse(localStorage.getItem("cart")).length;
                            }
                        }
                    });
                });
            });
        });
    } else{}
});

wishlistCount.textContent = JSON.parse(localStorage.getItem("cart")).length;

