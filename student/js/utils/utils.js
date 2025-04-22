import { setRouter } from "../router/router.js";

setRouter();

const backendURL = "http://mahusci-backend.test";
const token = localStorage.getItem("token");
const userType = localStorage.getItem("type");

// Success and Error Notification
function successNotification(message = "") {
  document.querySelector(".alert-primary").classList.remove("d-none");
  document.querySelector(".alert-primary").classList.add("d-block");
  document.querySelector(".alert-primary").innerHTML = message;

  setTimeout(() => {
    document.querySelector(".alert-primary").classList.remove("d-block");
    document.querySelector(".alert-primary").classList.add("d-none");
  }, 5000);
}

function errorNotification(message = "") {
  document.querySelector(".alert-danger").classList.remove("d-none");
  document.querySelector(".alert-danger").classList.add("d-block");
  document.querySelector(".alert-danger").innerHTML = message;

  setTimeout(() => {
    document.querySelector(".alert-danger").classList.remove("d-block");
    document.querySelector(".alert-danger").classList.add("d-none");
  }, 5000);
}

// GET LOGGED USER INFO

async function getLoggedUser() {
  const response = await fetch(backendURL + "/api/user/profile", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  });
  if (response.ok) {
    const json = await response.json();

    // APPLY USER DATA TO HTML(DESKTOP VIEW)
    document.getElementById("username-desktop").innerHTML = json.username;
    document.getElementById("role-level-desktop").innerHTML =
      json.role + " | " + json.grade_level;

    // APPLY USER DATA TO HTML(MOBILE VIEW)
    document.getElementById("username-mobile").innerHTML = json.username;
    document.getElementById("role-level-mobile").innerHTML =
      json.role + " | " + json.grade_level;
  } else {
    const json = await response.json();

    alert(json.message);
  }
}

export {
  backendURL,
  successNotification,
  errorNotification,
  setRouter,
  getLoggedUser,
  token,
  userType,
};
