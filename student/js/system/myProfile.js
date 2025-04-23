import { setRouter, backendURL, getLoggedUser, token } from "../utils/utils.js";

// USE ROUTER
setRouter();

// GET LOGGED USER INFO
getLoggedUser();

const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = async () => {
  const response = await fetch(backendURL + "/api/logout", {
    headers: {
      Application: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (response.ok) {
    localStorage.clear();

    window.location.pathname = "/";
  } else {
    const json = await response.json();

    alert(json.message);
  }
};
