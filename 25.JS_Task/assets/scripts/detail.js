import { getSingersById } from "./singersRequest.js";

let cardmt = document.querySelector(".cardmt");
console.log(cardmt);

let id = new URLSearchParams(location.search).get("id");
const singer = await getSingersById(id);
cardmt.innerHTML=`
<div class="card col-5">
<img src="${singer.imagelink}" class="card-img-top" alt="${singer.name}">
<div class="card-body">
  <h5 class="card-title">${singer.name}</h5>
  <p class="card-text">${singer.name} is <b> ${singer.nationality} </b></p>
  <p class="card-text">Age: ${singer.age} </p>
  <p class="card-text">Genre: ${singer.genre} </p>
  <a class="btn btn-primary home-button" href="singers.html">Home</a>
</div>
</div>
`

 