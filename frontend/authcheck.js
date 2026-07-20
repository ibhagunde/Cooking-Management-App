console.log("Auth check loaded on:", window.location.pathname);

async function checkSession() {

    console.log("Checking session...");

    try {

        const response = await fetch(
            "http://localhost:3000/auth/session",
            {
                credentials: "include"
            }
        );

        const data = await response.json();

        console.log("Session response:", data);

        if (!data.loggedIn) {
            window.location.href = "login.html";
        }

    }

    catch (error) {

        console.error("Session check failed:", error);

        window.location.href = "login.html";

    }

}

window.addEventListener("DOMContentLoaded", checkSession);