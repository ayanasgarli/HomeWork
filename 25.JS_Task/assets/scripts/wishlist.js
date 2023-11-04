import { BASE_URL } from "./singersRequest.js";

document.addEventListener("DOMContentLoaded", function () {
    let wishList = [];
    let tableBody = document.querySelector("#table-body");
    wishList = JSON.parse(localStorage.getItem("favorites"));
    if (wishList) {
        axios.get(BASE_URL + "/singers").then((res) => {
            let singers = res.data
            console.log(singers);
            tableBody.innerHTML = "";
            wishList.forEach(wish => {
                let singer = singers.find((singer) => singer.id == wish.id);
                tableBody.innerHTML += `
            <tr>
            <td class="wishListId">${singer.id}</td>
            <td class="wishListName">${singer.name}</td>
            <td class="wishListImage"><img style="width: 70px;"src="${singer.imagelink}" alt=""></td>
            <td class="wishListPrice">${singer.age}</td>
            <td class="wishListNationality">${singer.nationality}</td>
            <td class="wishListGenre">${singer.genre}</td>
            <td><button type="button" class="btn btn-danger delete" data-id="${singer.id}"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;

            let deleteBtn = document.querySelectorAll(".delete");
            let arr = [];
            if (JSON.parse(localStorage.getItem("favorites"))) {
                arr = JSON.parse(localStorage.getItem("favorites"));
            }
            deleteBtn.forEach((deletebtn) => {
                deletebtn.addEventListener("click", function () {
                    const singerId = this.getAttribute("data-id");
                    arr = arr.filter((favoritesItem) => favoritesItem.id != singerId);
                    localStorage.setItem("favorites", JSON.stringify(arr));
                    const table = this.closest("tr");
                    if (table) {
                        table.remove();
                    }
                });
            });
            });
        })
    }
})

