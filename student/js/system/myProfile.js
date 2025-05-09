import {
  backendURL,
  successNotification,
  errorNotification,
  token,
  userType,
  userId,
} from "../utils/utils.js";

console.log(userId);

let userDetails = {};

// LOGOUT BUTTON
const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = async () => {
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

// GET USER DETAILS
getDetails();

async function getDetails() {
  const response = await fetch(backendURL + "/api/user/profile", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    },
  });

  if (response.ok) {
    const json = await response.json();

    userDetails = json;

    // DISPLAY USER DATA TO HTML

    document.getElementById("username-header").innerHTML = json.username;
    document.getElementById("username-detail").innerHTML = json.username;
    document.getElementById("email-header").innerHTML = json.email;
    document.getElementById("email-detail").innerHTML = json.email;
    document.getElementById("firstname").innerHTML = json.firstname;
    document.getElementById("middlename").innerHTML = json.middlename;
    if (json.middlename == null) {
      document.getElementById("middlename").innerHTML = "-";
    }
    document.getElementById("lastname").innerHTML = json.lastname;
    document.getElementById("age").innerHTML = json.age;
    document.getElementById("birthdate").innerHTML = json.birthdate;
    document.getElementById("school_name").innerHTML = json.school_name;
    document.getElementById("grade_level").innerHTML = json.grade_level;
    document.getElementById("section").innerHTML = json.section;
    document.getElementById("address").innerHTML = json.address;
  } else if (!response.ok) {
    const json = await response.json();

    errorNotification("Failed to fetch user details: " + json.message);
  }
}

// EDIT/UPDATE MODAL
const btn_edit = document.getElementById("btn_edit");

let bootstrapModalInstance = null; // Store reference to the modal instance only once

btn_edit.onclick = () => {
  let modalEl = document.getElementById("personalInfoModal");

  if (!modalEl) {
    // Create modal container if not already present
    const container = document.createElement("div");
    container.innerHTML = `
      <div
        class="modal fade"
        id="personalInfoModal"
        tabindex="-1"
        aria-labelledby="personalInfoModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Update your Personal Information</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="form_update">
              <div class="modal-body">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label small text-muted">Username</label>
                      <input type="text" id="username" class="form-control" name="username" value="${
                        userDetails.username
                      }"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label small text-muted">First Name</label>
                      <input type="text" id="firstname" class="form-control" name="firstname" value="${
                        userDetails.firstname
                      }"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label small text-muted">Middle Name</label>
                      <input type="text" id="middlename" class="form-control" name="middlename" value="${
                        userDetails.middlename ? userDetails.middlename : "-"
                      }"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label small text-muted">Last Name</label>
                      <input type="text" id="lastname" class="form-control" name="lastname" value="${
                        userDetails.lastname
                      }"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label small text-muted">Age</label>
                      <input type="number" id="age" class="form-control" name="age" value="${
                        userDetails.age
                      }"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label small text-muted">Birthday</label>
                      <input type="date" id="birthdate" class="form-control" name="birthdate" value="${
                        userDetails.birthdate
                      }"/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label small text-muted">E-mail</label>
                      <input type="text" id="email" class="form-control" name="email" value="${
                        userDetails.email
                      }"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label small text-muted">Name of School</label>
                      <input type="text" id="school_name" class="form-control" name="school_name" value="${
                        userDetails.school_name
                      }"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label small text-muted">Grade Level</label>
                      <select required class="form-control" id="grade_level" name="grade_level">
                          <option value="${userDetails.grade_level}" >
                          ${userDetails.grade_level}
                        </option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                        <option value="Grade 11">Grade 11</option>
                        <option value="Grade 12">Grade 12</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label small text-muted">Section</label>
                      <input type="text" id="section" class="form-control" name="section" value="${
                        userDetails.section
                      }"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label small text-muted">Complete Address</label>
                      <input type="text" id="address" class="form-control" name="address" value="${
                        userDetails.address
                      }"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" id="submit">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    modalEl = document.getElementById("personalInfoModal");

    // Attach event listener only ONCE
    modalEl
      .querySelector("#form_update")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitButton = document.getElementById("submit");
        submitButton.disabled = true;
        submitButton.innerHTML = `
        <div class="spinner-border me-2" role="status"></div>
        <span>Saving Changes</span>
      `;

        const formData = new FormData(e.target);
        const jsonData = {};
        formData.forEach((value, key) => {
          jsonData[key] = value;
        });

        try {
          const response = await fetch(
            backendURL + "/api/user/update/" + userId,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
            }
          );

          if (response.ok) {
            alert("Account Updated Successfully!");
            bootstrapModalInstance.hide();
            getDetails();
            location.reload();
          } else {
            const errorData = await response.json();
            if (errorData.errors) {
              const errorMessages = Object.values(errorData.errors)
                .flat()
                .join("\n");
              alert(`Validation errors:\n${errorMessages}`);
            } else {
              alert(errorData.message || "Update failed. Please try again.");
            }
          }
        } catch (err) {
          alert("Something went wrong.");
        } finally {
          submitButton.disabled = false;
          submitButton.innerHTML = "Save changes";
        }
      });

    // Initialize Bootstrap modal instance once
    bootstrapModalInstance = new bootstrap.Modal(modalEl);
  }

  // Show modal
  bootstrapModalInstance.show();
};
