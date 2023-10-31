let basketTableBody = document.getElementById("basketTableBody");
let basket = JSON.parse(localStorage.getItem('basket')) || [];

function displayBasket() {
    basketTableBody.innerHTML = "";
    basket.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td><img src="${item.coverImg}" alt="${item.name}" width="50"></td>
            <td>${item.price}$</td>
            <td>${item.totalPrice}$</td>
            <td>
                <button class="increase-button" data-index="${index}">Increase</button>
                <span>${item.quantity}</span>
                <button class="decrease-button" data-index="${index}" ${item.quantity === 1 ? 'disabled' : ''}>Decrease</button>
            </td>
            <td>
                <button class="delete-button" data-index="${index}">Delete</button>
            </td>
        `;
        basketTableBody.appendChild(row);
    });
}

displayBasket();

basketTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('increase-button')) {
        let index = event.target.dataset.index;
        basket[index].quantity += 1;
        basket[index].totalPrice = basket[index].quantity * basket[index].price;
        localStorage.setItem('basket', JSON.stringify(basket));
        displayBasket();
    }
});

basketTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('decrease-button')) {
        let index = event.target.dataset.index;
        basket[index].quantity -= 1;
        basket[index].totalPrice = basket[index].quantity * basket[index].price;
        if (basket[index].quantity === 0) {
            basket.splice(index, 1);
        }
        localStorage.setItem('basket', JSON.stringify(basket));
        displayBasket();
    }
});


basketTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        let index = event.target.dataset.index;
        Swal.fire({
            title: 'Delete Item',
            text: 'Are you sure you want to remove this item from the basket?',
            icon: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                basket.splice(index, 1);
                localStorage.setItem('basket', JSON.stringify(basket));
                displayBasket();
                Swal.fire('Item Deleted!', '', 'success');
            }
        });
    }
});
