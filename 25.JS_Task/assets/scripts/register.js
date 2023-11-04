document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstName = document.getElementById("form3Example1").value;
        const lastName = document.getElementById("form3Example2").value;
        const email = document.getElementById("form3Example3").value;
        const username = document.getElementById("form3Example5").value;
        const password = document.getElementById("form3Example4").value;
        const balance = document.getElementById("form3Example6").value;

        // Regex email
        const emailPattern = /^\S+@\S+\.\S+$/;
        // Regex password 
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!email.match(emailPattern)) {
            Swal.fire({
                title: "Email Error",
                text: "Please enter a valid email address.",
                icon: "error",
            });
        } 
        else if (!password.match(passwordPattern)) {
            Swal.fire({
                title: "Password Error",
                text: "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.",
                icon: "error",
            });
        } 
        else {
            axios.get('http://localhost:3000/users?email=' + email)
                .then(response => {
                    if (response.data.length > 0) {
                        Swal.fire({
                            title: "Email Exists",
                            text: "The email address is already registered. Please use another email or log in.",
                            icon: "error",
                        });
                    } else {
                        axios.post('http://localhost:3000/users', {
                            firstName,
                            lastName,
                            email,
                            username,
                            password,
                            balance
                        })
                        .then(response => {
                            Swal.fire({
                                title: "Registration Successful",
                                text: "You are now registered.",
                                icon: "success",
                            });
                        })
                        .catch(error => {
                            console.error(error);
                            Swal.fire({
                                title: "Error",
                                text: "An error occurred while registering.",
                                icon: "error",
                            });
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while checking email availability.",
                        icon: "error",
                    });
                });
        }
    });
});

