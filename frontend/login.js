function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "" || pass === "") {
        document.getElementById("message").innerText = "Please fill out all fields.";
        return;
    }

    // Placeholder logic
    document.getElementById("message").innerText = "Login attempt sent.";
}
