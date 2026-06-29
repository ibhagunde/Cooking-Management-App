function register() {
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();
    const msg = document.getElementById("message");

    if (!email || !pass || !confirm) {
        msg.innerText = "Please fill out all fields.";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        msg.innerText = "Enter a valid email.";
        return;
    }

    if (pass.length < 6) {
        msg.innerText = "Password must be at least 6 characters.";
        return;
    }

    if (pass !== confirm) {
        msg.innerText = "Passwords do not match.";
        return;
    }

    // Placeholder success message
    msg.style.color = "green";
    msg.innerText = "Registration attempt sent.";
}
