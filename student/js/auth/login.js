import {
  errorNotification,
  successNotification,
  backendURL,
  setRouter,
} from "../utils/utils.js";

setRouter();

const form_login = document.getElementById("form_login");

form_login.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button | WHILE GA LOADING
  document.querySelector("#form_login button").disabled = true;

  document.querySelector(
    "#form_login button"
  ).innerHTML = `<div class="spinner-border me-2" role="status"></div>
            <p style="padding-top: 16px">Logging In</p>`;

  // Get Values of Form (input, textarea, select) set it as form-data
  const formData = new FormData(form_login);

  document.querySelector(".fullscreen-spinner").classList.remove("d-none");

  // Fetch API user login endpoint
  const response = await fetch(backendURL + "/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (response.ok) {
    // Get response if 200-299 status code | IF OKAY
    const json = await response.json();

    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("type", json.role);
    sessionStorage.setItem("user-data", JSON.stringify(json.data));

    form_login.reset();

    successNotification("Login Successfully!");

    if (sessionStorage.getItem("type") === "Student") {
      window.location.pathname = "/student/home.html";
    } else {
      window.location.pathname = "/teacher/dashboard.html";
    }
  } else if (response.status == 422) {
    // Get response if 422 status code | IF DILI OKAY
    const json = await response.json();
    console.log(json);
    document.querySelector(".fullscreen-spinner").classList.add("d-none");
    errorNotification(json.message);
  }

  document.querySelector("#form_login button").disabled = false;
  document.querySelector("#form_login button").innerHTML = `Login`;
};
