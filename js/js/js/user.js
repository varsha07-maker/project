const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


if (
    !loggedInUser ||
    loggedInUser.role !== "user"
) {

    window.location.href =
        "login.html";

}


document.getElementById(
    "userName"
).innerText =
    loggedInUser.name;


function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "login.html";

}