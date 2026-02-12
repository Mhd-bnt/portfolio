// NAV-BAR

window.addEventListener("scroll", function () {
  if (
    document.body.scrollTop > 350 ||
    document.documentElement.scrollTop > 350
  ) {
    document.getElementById("nav").style.boxShadow =
      "rgb(136, 136, 136) 0px 0.1rem 1rem";
  } else {
    document.getElementById("nav").style.boxShadow = "none";
  }
});

// CAROUSSEL

const panels = document.querySelectorAll(".panel");
panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}
// OPEN-NAV MOBILE NAVIGATION
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".nav-bar");
const navLinks = document.querySelector(".main-nav");

btnNav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});
navLinks.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});
