//Form Register

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button | WHILE GA LOADING
  document.querySelector("#form_register button").disabled = true;

  //   document.querySelector(
  //     "#submit"
  //   ).innerHTML = `<div class="spinner-border me-2" role="status"></div>
  //                       <span class="mt-1">Loading...</span>`;

  // Get Values of Form (input, textarea, select) set it as form-data
  const formData = new FormData(form_register);

  // Fetch API user register endpoint
  const response = await fetch("http://mahusci-backend.test/api/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });
  // Get response if 200-299 status code | IF OKAY
  if (response.ok) {
    const json = await response.json();
    console.log(json);

    document.querySelector(".alert-primary").classList.remove("d-none");
    document.querySelector(".alert-primary").classList.add("d-block");

    successNotification("Account Created Successfully!");

    form_register.reset();
    // Redirect to login page
    // setTimeout(() => {
    //   window.location.pathname = "/login.html";
    // }, 5000);
  }
  // Get response if 422 status code | IF DILI OKAY
  else if (response.status == 422) {
    const json = await response.json();

    errorNotification(json.message);
  }
  // Enable Button | AFTER MAG LOADING
  document.querySelector("#form_register button").disabled = false;
};

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
