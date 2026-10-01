// ========================================
// GET USERS
// ========================================

let users =
    JSON.parse(localStorage.getItem("users")) || [];


// ========================================
// SIGNUP
// ========================================

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const role =
            document.getElementById("role").value;


        if (password !== confirmPassword) {

            document.getElementById("message").innerText =
                "Passwords do not match.";

            return;
        }


        if (!role) {

            document.getElementById("message").innerText =
                "Please select an account type.";

            return;
        }


        // Check duplicate email

        const existingUser =
            users.find(user => user.email === email);


        if (existingUser) {

            document.getElementById("message").innerText =
                "This email is already registered.";

            return;
        }


        // Create new account

        const newUser = {

            name: name,
            email: email,
            password: password,
            role: role

        };


        users.push(newUser);


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        document.getElementById("message").innerText =
            "Account created successfully!";


        setTimeout(function() {

            window.location.href = "login.html";

        }, 1000);

    });

}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const users =
            JSON.parse(localStorage.getItem("users")) || [];


        const user =
            users.find(account =>
                account.email === email &&
                account.password === password
            );


        if (!user) {

            document.getElementById("loginMessage").innerText =
                "Invalid email or password.";

            return;
        }


        // Save logged-in account

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );


        // Redirect based on role

        if (user.role === "artist") {

            window.location.href =
                "artist-dashboard.html";

        } else {

            window.location.href =
                "user-dashboard.html";

        }

    });

}