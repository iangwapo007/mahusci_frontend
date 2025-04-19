const url = "http://mahusci-backend.test";

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

export { url, successNotification, errorNotification };
