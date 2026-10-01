// ========================================
// CHECK ADMIN
// ========================================

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


if (
    !loggedInUser ||
    loggedInUser.role !== "admin"
) {

    window.location.href =
        "login.html";

}


// ========================================
// GET DATA
// ========================================

let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];


let artworks =
    JSON.parse(
        localStorage.getItem("artworks")
    ) || [];


// ========================================
// COUNTS
// ========================================

const userCount =
    users.filter(
        user => user.role === "user"
    ).length;


const artistCount =
    users.filter(
        user => user.role === "artist"
    ).length;


document.getElementById(
    "userCount"
).innerText = userCount;


document.getElementById(
    "artistCount"
).innerText = artistCount;


document.getElementById(
    "artworkCount"
).innerText =
    artworks.length;


// ========================================
// DISPLAY ARTWORKS
// ========================================

function displayAdminArtworks() {

    const container =
        document.getElementById(
            "adminArtworkContainer"
        );


    container.innerHTML = "";


    if (artworks.length === 0) {

        container.innerHTML =
            "<p>No artworks available.</p>";

        return;
    }


    artworks.forEach(function(art) {

        const card =
            document.createElement("div");

        card.className =
            "art-card";


        card.innerHTML = `

            <img
                src="${art.image}"
                alt="${art.title}"
            >

            <div class="art-info">

                <h3>
                    ${art.title}
                </h3>

                <p>
                    ${art.description}
                </p>

                <p>
                    Artist: ${art.artist}
                </p>

                <h4>
                    ₹${art.price}
                </h4>

                <button
                    class="delete-btn"
                    onclick="removeArtwork('${art.id}')"
                >
                    Remove Artwork
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ========================================
// REMOVE ARTWORK
// ========================================

function removeArtwork(id) {

    const confirmation =
        confirm(
            "Remove this artwork from ArtVerse?"
        );


    if (!confirmation) return;


    artworks =
        artworks.filter(
            art => art.id !== id
        );


    localStorage.setItem(
        "artworks",
        JSON.stringify(artworks)
    );


    document.getElementById(
        "artworkCount"
    ).innerText =
        artworks.length;


    displayAdminArtworks();


    alert(
        "Artwork removed successfully."
    );

}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "login.html";

}


// ========================================
// LOAD
// ========================================

displayAdminArtworks();