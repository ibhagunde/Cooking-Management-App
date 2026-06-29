function editProfile() {
    const newName = prompt("Enter new name:", "User");
    const newEmail = prompt("Enter new email:", "user@example.com");

    if (newName && newEmail) {
        document.querySelector(".info").innerHTML = `
            <p><strong>Name:</strong> ${newName}</p>
            <p><strong>Email:</strong> ${newEmail}</p>
        `;
        document.getElementById("message").innerText = "Profile updated (frontend only).";
    }
}

function goBack() {
    window.location.href = "dashboard.html";
}
