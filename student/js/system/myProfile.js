import { setRouter, backendURL } from "../utils/utils.js";

setRouter();

const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = async () => {
  const response = await fetch(backendURL + "/api/logout", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (response.status === 200) {
    localStorage.clear();

    const json = await response.json();

    window.location.pathname = "/";
  } else {
    const json = await response.json();

    alert(json.message);
  }
};
