document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector(".form");
    
        form.addEventListener("click", function (event) {
            if (event.target.type === "button") {
                event.preventDefault();
    
                const email = document.getElementById("form2Example17").value;
                const password = document.getElementById("form2Example27").value;
    
                const apiUrl = 'http://localhost:3000/users?email=' + email;
    
                axios.get(apiUrl)
                    .then(response => {
                        const user = response.data[0];
    
                        if (user && user.password === password) {
                            Swal.fire({
                                title: "Login Successful",
                                text: "You are now logged in.",
                                icon: "success",
                            });
                        } 
                        else {
                            Swal.fire({
                                title: "Incorrect Email or Password",
                                text: "Please check your email and password and try again.",
                                icon: "error",
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            title: "Error",
                            text: "An error occurred while logging in.",
                            icon: "error",
                        });
                    });
            }
        });
    });
    
    

