async function loadProfile() {

    try {

        const response = await fetch(
            "http://localhost:3000/auth/profile",
            {
                credentials: "include"
            }
        );

        const user = await response.json();

        document.querySelector(".info").innerHTML = `
            <p><strong>Name:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;

    }

    catch (error) {

        console.error(error);

    }

}

function editProfile() {
    const newName = prompt("Enter new name:", "User");
    const newEmail = prompt("Enter new email:", "user@example.com");

    if (newName && newEmail) {
        document.querySelector(".info").innerHTML = `
            <p><strong>Name:</strong> ${newName}</p>
            <p><strong>Email:</strong> ${newEmail}</p>
        `;
        document.getElementById("message").innerText = "Profile updated.";
    }
}

function goBack() {
    window.location.href = "dashboard.html";
}


loadProfile();