const token = localStorage.getItem("token");
const userType = localStorage.getItem("type");

function setRouter() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
    case "/register.html":
      if (token) {
        if (userType === "student") {
          window.location.pathname = "/student/home.html";
        } else {
          window.location.pathname = "/teacher/home.html";
        }
      }
      break;
    case "/student/home.html":
    case "/student/lecture.html":
    case "/student/lessons.html":
    case "/student/myLearnings.html":
    case "/student/myProfile.html":
    case "/student/quiz.html":
      if (!token) {
        window.location.pathname = "/index.html";
      }
      break;
    default:
      break;
  }
}

export { setRouter };
