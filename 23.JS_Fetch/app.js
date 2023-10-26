let userData = [];
   document.getElementById("getDataButton").addEventListener("click", function () {
       document.getElementById("tableBody").innerHTML = '<tr><td colspan="7" class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>';

       fetch("https://jsonplaceholder.typicode.com/users")
           .then(response => response.json()) 
           .then(data => {
               userData = data; 
               displayData(userData);
           })
           .catch(error => {
               console.error("Error fetching data:", error);
               document.getElementById("tableBody").innerHTML = '<tr><td colspan="7" class="text-center">Error fetching data</td></tr>';
           });
   });

   document.getElementById("sortByUsernameButton").addEventListener("click", function () {
       userData.sort((a, b) => a.name.localeCompare(b.name));
       displayData(userData);
   });

   document.getElementById("sortByIdButton").addEventListener("click", function () {
       userData.sort((a, b) => b.id - a.id);
       displayData(userData);
   });

   document.getElementById("clearTableButton").addEventListener("click", function () {
       Swal.fire({
           title: "Are you sure to clear the table?",
           icon: "warning",
           showCancelButton: true,
           confirmButtonColor: "#3085d6",
           cancelButtonColor: "#d33",
           confirmButtonText: "Yes, delete it!",
           cancelButtonText: "Cancel"
       }).then((result) => {
           if (result.isConfirmed) {
               document.getElementById("tableBody").innerHTML = '';
           }
       });
   });

   function displayData(data) {
       let tableBody = document.getElementById("tableBody");
       tableBody.innerHTML = '';

       data.forEach(user => {
           tableBody.innerHTML += `
               <tr>
                   <td class="font-weight-bold">${user.id}</td>
                   <td>${user.name}</td>
                   <td>${user.username}</td>
                   <td>${user.email}</td>
                   <td>${user.address.city}</td>
                   <td><a href="${user.website}" target="_blank" style="text-decoration: underline;">${user.website}</a></td>
                   <td><button class="btn learn-more" data-name="${user.name}" data-address="${user.address.street}" data-phone="${user.phone}">Learn More</button></td>
                </tr>
            `;
       });

       document.querySelectorAll(".learn-more").forEach(btn => {
           btn.addEventListener("click", function () {
               let name = this.getAttribute("data-name");
               let address = this.getAttribute("data-address");
               let phone = this.getAttribute("data-phone");

               Swal.fire({
                   title: `Name: ${name}`,
                   text: `Address: ${address}`,
                   confirmButtonColor: "#6563CF",
                   footer: `<p>Phone: ${phone}</p>`
               });
           });
       });
   }