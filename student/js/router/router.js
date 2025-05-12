const token = sessionStorage.getItem("token");
const userType = sessionStorage.getItem("type");

console.log(window.location.pathname);

function setRouter() {
  const path = window.location.pathname;

  try {
    switch (path) {
      case "/":
      case "/index.html":
      case "/register.html":
      case "/teacher_register.html":
        if (token) {
          if (userType === "Student") {
            window.location.pathname = "/student/home.html";
          } else if (userType === "Teacher") {
            window.location.pathname = "/teacher/dashboard.html";
          }
        }
        break;

      case "/student/home.html":
      case "/student/lessons.html":
      case "/student/myLearnings.html":
      case "/student/myProfile.html":
      case "/student/selectedLesson.html":
      case "/student/sequence-player.html":
        if (!token || userType !== "Student") {
          // Fixed logical condition
          window.location.pathname = "/index.html";
        }
        break;

      case "/teacher/dashboard.html":
      case "/teacher/lessons.html":
      case "/teacher/assessments.html":
      case "/teacher/create-assessment.html":
      case "/teacher/create-lesson.html":
      case "/teacher/edit-lesson.html":
      case "/teacher/manage-sequence.html":
      case "/teacher/sequence-builder.html":
      case "/teacher/curriculum-sequence.html":
        if (!token || userType !== "Teacher") {
          // Fixed logical condition
          window.location.pathname = "/index.html";
        }
        break;

      default:
        // Optionally handle unknown routes
        if (token) {
          if (userType === "Student") {
            window.location.pathname = "/student/home.html";
          } else if (userType === "Teacher") {
            window.location.pathname = "/teacher/dashboard.html";
          }
        } else {
          window.location.pathname = "/index.html";
        }
        break;
    }
  } catch (error) {
    console.error("Routing error:", error);
    // Fallback to index if there's an error
    window.location.pathname = "/index.html";
  }
}

export { setRouter };
