import {
  errorNotification,
  successNotification,
  backendURL,
  setRouter,
} from "../utils/utils.js";

setRouter();

//Form Register

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button during submission
  const submitButton = document.querySelector("#form_register button");
  submitButton.disabled = true;
  submitButton.innerHTML = `
    <div class="spinner-border me-2" role="status"></div>
    <p style="padding-top: 16px">Creating Account</p>
  `;

  // Get form values
  const formData = new FormData(form_register);
  const username = formData.get("username");
  const password = formData.get("password");

  // Register the user
  const registerResponse = await fetch(backendURL + "/api/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // Added this line
    },
    body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to JSON
  });

  // If registration successful
  if (registerResponse.ok) {
    successNotification("Account Created Successfully!");
    form_register.reset();

    // Auto-login with the same credentials
    const loginResponse = await fetch(backendURL + "/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // Important for JSON data
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // If login successful
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();

      // Store authentication data
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("role", loginData.role);

      // Store user data
      sessionStorage.setItem("user", JSON.stringify(loginData.user));

      successNotification("Logged in successfully!");

      // Redirect to home page
      window.location.pathname = "/student/home.html";
    }
    // If login failed
    else {
      const errorData = await loginResponse.json();
      errorNotification(
        errorData.message || "Auto-login failed. Please log in manually."
      );
      window.location.pathname = "/login.html";
    }
  }
  // If registration failed
  else {
    const errorData = await registerResponse.json();
    errorNotification(
      errorData.message || "Registration failed. Please try again."
    );
  }

  // Re-enable button
  submitButton.disabled = false;
  submitButton.innerHTML = "Create Account";
};
