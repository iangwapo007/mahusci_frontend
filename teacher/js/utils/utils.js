import { setRouter } from "../router/router.js";

setRouter();

document
  .getElementById("btn_logout")
  .addEventListener("click", async function () {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      document.querySelector(".fullscreen-spinner").classList.remove("d-none");

      const response = await fetch(
        `https://mahusci.rubenianinternational.com/public/api/logout`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        sessionStorage.clear();
        window.location.href = "/index.html";
      } else {
        const error = await response.json();
        alert(error.message || "Logout failed");
      }
    } catch (error) {
      alert("Network error during logout");
    }
  });
