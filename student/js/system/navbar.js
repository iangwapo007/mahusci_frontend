import { backendURL, token, userType } from "../utils/utils.js";

// GET LOGGED USER INFO

async function getLoggedUser() {
  const response = await fetch(backendURL + "/api/user/profile", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + token,
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

getLoggedUser();

// LOGOUT FUNCTIONALITY FOR MOBILE
const btn_logout_mobile = document.getElementById("btn_logout_mobile");

btn_logout_mobile.onclick = async () => {
  const response = await fetch(backendURL + "/api/logout", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    },
  });

  if (response.ok) {
    const json = await response.json();

    localStorage.removeItem("token");
    localStorage.removeItem("type");

    window.location.href = "/index.html";
  } else if (!response.ok) {
    const json = await response.json();

    errorNotification(json.message);
  }
};

// LOGOUT FUNCTIONALITY FOR DESKTOP
const btn_logout_desktop = document.getElementById("btn_logout_desktop");

btn_logout_desktop.onclick = async () => {
  const response = await fetch(backendURL + "/api/logout", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    },
  });

  if (response.ok) {
    const json = await response.json();

    localStorage.removeItem("token");
    localStorage.removeItem("type");

    window.location.href = "/index.html";
  } else if (!response.ok) {
    const json = await response.json();

    errorNotification(json.message);
  }
};
