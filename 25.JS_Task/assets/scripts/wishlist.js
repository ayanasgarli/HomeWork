import { BASE_URL } from "./singersRequest.js";

document.addEventListener("DOMContentLoaded", function () {
    let favorites = [];

    let tbody = document.querySelector("#tbody");

    favorites = JSON.parse(localStorage.getItem("cart"));
    console.log(favorites);
    if (favorites) {
        axios.get(BASE_URL + `/singers`).then((result) => {
            let singers = result.data;
            console.log(singers);

            tbody.innerHTML = "";
            favorites.forEach((favCard) => {
                let singer = singers.find((singer) => singer.id == favCard.id);
                console.log(singer);
                tbody.innerHTML += `
                <tr>
                <th scope="row">${singer.id}</th>
                <td>${singer.name}</td>
                <td class="img-box"><img src="${singer.imagelink}" alt="${singer.name}"></td>
                <td>${singer.age}</td>
                <td>${singer.genre}</td>
                <td><button type="button" class="btn btn-danger delete-btn"><i class="fa-solid fa-trash"></i></td>
                </tr>
                `;

                let deleteButtons = document.querySelectorAll(".delete-btn");
                deleteButtons.forEach((btn) => {
                    btn.addEventListener("click", function () {
                        // UI'dan silmek
                        this.parentElement.parentElement.remove();

                        // Local'dan silmek
                        if (!JSON.parse(localStorage.getItem("cart"))) {
                            localStorage.setItem("cart", JSON.stringify([{ id: this.id }]));
                        } else {
                            let cardsLocal = JSON.parse(localStorage.getItem("cart"));
                            let found = cardsLocal.find((x) => x.id == this.id);
                            if (found) {
                                let updatedCart = cardsLocal.filter((x) => x.id != this.id);
                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                wishlistCount.textContent = JSON.parse(
                                    localStorage.getItem("cart")).length;
                            } else {
                                localStorage.setItem("cart", JSON.stringify([...cardsLocal, { id: this.id, quantity: 1 }]));
                                wishlistCount.textContent = JSON.parse(localStorage.getItem("cart")).length;
                            }
                        }
                    });
                });
            });
        });
    } else { }
});

const wishlistCount = document.getElementById("wishlistCount");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
// wishlistCount.textContent = cart.length;

