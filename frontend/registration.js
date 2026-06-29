async function register() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();
    const msg = document.getElementById("message");

    // Reset message color
    msg.style.color = "red";

    // Validation
    if (!username || !email || !pass || !confirm) {
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

    try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: pass
            })
        });

        const data = await response.json();

        if (response.ok) {
            msg.style.color = "green";
            msg.innerText = "Registration successful!";
            console.log(data);

            // Optional: clear the form
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("confirm").value = "";

        } else {
            msg.style.color = "red";
            msg.innerText = data.error;
        }

    } catch (error) {
        console.error(error);
        msg.style.color = "red";
        msg.innerText = "Unable to connect to server.";
    }
}