// NAV-BAR

const nav = document.getElementById("nav");

window.addEventListener("scroll", function () {
  if (!nav) return;

  if (window.scrollY > 350) {
    nav.style.boxShadow = "0px 0.1rem 1rem var(--color-shadow)";
  } else {
    nav.style.boxShadow = "none";
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

btnNav?.addEventListener("click", function () {
  nav?.classList.toggle("nav-open");
});

nav?.addEventListener("click", function (event) {
  if (!nav.classList.contains("nav-open")) return;

  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest(".btn-mobile-nav")) return;

  nav.classList.remove("nav-open");
});

// THEME TOGGLE
const themeToggle = document.getElementById("theme-toggle");
const themeToggleIcon = themeToggle?.querySelector("ion-icon");

function updateThemeToggleIcon() {
  if (!themeToggleIcon) return;

  const iconName = document.body.classList.contains("dark-mode")
    ? "sunny-outline"
    : "moon-outline";
  themeToggleIcon.setAttribute("name", iconName);
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  updateThemeToggleIcon();
}

applyTheme(localStorage.getItem("theme") || "light");

themeToggle?.addEventListener("click", function () {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  updateThemeToggleIcon();
});
