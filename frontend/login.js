async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!email || !password) {
        message.innerText = "Please fill out all fields.";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.style.color = "green";
            message.innerText = "Login successful!";
            console.log(data);

            // Wait 1 second, then go to the dashboard
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        } 
        else {
            message.style.color = "red";
            message.innerText = data.error;
        }

    } catch (error) {
        console.error(error);
        message.style.color = "red";
        message.innerText = "Unable to connect to server.";
    }
}