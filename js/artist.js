// ========================================
// CHECK ARTIST LOGIN
// ========================================

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


if (
    !loggedInUser ||
    loggedInUser.role !== "artist"
) {

    window.location.href =
        "login.html";

}


// Show artist name

document.getElementById(
    "artistName"
).innerText = loggedInUser.name;


// ========================================
// GET ARTWORKS
// ========================================

let artworks =
    JSON.parse(
        localStorage.getItem("artworks")
    ) || [];


// ========================================
// DISPLAY ARTIST'S ARTWORKS
// ========================================

function displayMyArtworks() {

    const container =
        document.getElementById(
            "artistArtworkContainer"
        );


    container.innerHTML = "";


    const myArtworks =
        artworks.filter(
            art =>
                art.artistEmail ===
                loggedInUser.email
        );


    if (myArtworks.length === 0) {

        container.innerHTML =
            "<p>You haven't added any artwork yet.</p>";

        return;
    }


    myArtworks.forEach(function(art) {

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

                <h4>
                    ₹${art.price}
                </h4>

                <div class="admin-buttons">

                    <button
                        class="edit-btn"
                        onclick="editArtwork('${art.id}')"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteArtwork('${art.id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


// ========================================
// ADD ARTWORK
// ========================================

function addArtwork() {

    const title =
        document.getElementById(
            "artTitle"
        ).value.trim();


    const description =
        document.getElementById(
            "artDescription"
        ).value.trim();


    const price =
        document.getElementById(
            "artPrice"
        ).value;


    const imageInput =
        document.getElementById(
            "artImage"
        );


    if (
        !title ||
        !description ||
        !price ||
        !imageInput.files[0]
    ) {

        alert(
            "Please fill all fields and select an image."
        );

        return;
    }


    const file =
        imageInput.files[0];


    const reader =
        new FileReader();


    reader.onload = function(event) {

        const newArtwork = {

            id: Date.now().toString(),

            title: title,

            description: description,

            price: price,

            artist:
                loggedInUser.name,

            artistEmail:
                loggedInUser.email,

            image:
                event.target.result

        };


        artworks.push(newArtwork);


        localStorage.setItem(
            "artworks",
            JSON.stringify(artworks)
        );


        alert(
            "Your artwork has been added!"
        );


        // Clear fields

        document.getElementById(
            "artTitle"
        ).value = "";


        document.getElementById(
            "artDescription"
        ).value = "";


        document.getElementById(
            "artPrice"
        ).value = "";


        document.getElementById(
            "artImage"
        ).value = "";


        displayMyArtworks();

    };


    reader.readAsDataURL(file);

}


// ========================================
// EDIT ARTWORK
// ========================================

function editArtwork(id) {

    const index =
        artworks.findIndex(
            art =>
                art.id === id &&
                art.artistEmail ===
                loggedInUser.email
        );


    if (index === -1) {

        alert("Artwork not found.");

        return;
    }


    const artwork =
        artworks[index];


    const newTitle =
        prompt(
            "Enter artwork title:",
            artwork.title
        );


    if (newTitle === null) return;


    const newDescription =
        prompt(
            "Enter description:",
            artwork.description
        );


    if (newDescription === null) return;


    const newPrice =
        prompt(
            "Enter price:",
            artwork.price
        );


    if (newPrice === null) return;


    artwork.title =
        newTitle;

    artwork.description =
        newDescription;

    artwork.price =
        newPrice;


    localStorage.setItem(
        "artworks",
        JSON.stringify(artworks)
    );


    displayMyArtworks();


    alert(
        "Artwork updated successfully!"
    );

}


// ========================================
// DELETE ARTWORK
// ========================================

function deleteArtwork(id) {

    const index =
        artworks.findIndex(
            art =>
                art.id === id &&
                art.artistEmail ===
                loggedInUser.email
        );


    if (index === -1) {

        alert("Artwork not found.");

        return;
    }


    const confirmation =
        confirm(
            "Do you want to delete this artwork?"
        );


    if (!confirmation) return;


    artworks.splice(index, 1);


    localStorage.setItem(
        "artworks",
        JSON.stringify(artworks)
    );


    displayMyArtworks();


    alert(
        "Artwork deleted successfully!"
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
// LOAD ARTWORKS
// ========================================

displayMyArtworks();