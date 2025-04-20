function setRouter() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
    case "/register.html":
      if (localStorage.getItem("token")) {
        window.location.pathname = "/student/home.html";
      }
      break;
    case "/student/home.html":
    case "/student/lecture.html":
    case "/student/lessons.html":
    case "/student/myLearnings.html":
    case "/student/myProfile.html":
    case "/student/quiz.html":
      if (!localStorage.getItem("token")) {
        window.location.pathname = "/index.html";
      }
      break;
    default:
      break;
  }
}

export { setRouter };
