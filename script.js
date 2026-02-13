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

const projectTrack = document.getElementById("project-carousel-track");
const projectSlides = projectTrack
  ? Array.from(projectTrack.querySelectorAll(".project-slide"))
  : [];
const projectPrevBtn = document.getElementById("project-prev-btn");
const projectNextBtn = document.getElementById("project-next-btn");
const projectDetailsCard = document.getElementById("project-details-card");
const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");
const projectHighlights = document.getElementById("project-highlights");
const projectStack = document.getElementById("project-stack");
const projectGithub = document.getElementById("project-github");
const projectLive = document.getElementById("project-live");

const fallbackProject = {
  title: "Project coming soon",
  description: "Details available soon.",
  highlights: [],
  stack: [],
  githubUrl: "",
  liveUrl: "",
};

const projects = [
  {
    title: "Node Auth API",
    description:
      "API REST sécurisée avec authentification JWT, routes protégées et base Supabase.",
    highlights: [
      "Hashing des mots de passe avec bcrypt",
      "Authentification JWT via middleware Bearer",
      "Routes protégées pour les opérations sensibles",
      "Rate limiting sur endpoints d’auth et API",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Postman",
    ],
    githubUrl: "https://github.com/Mhd-bnt/node-supabase-auth-api",
    liveUrl: "",
  },
  {
    title: "Omnifood",
    description:
      "Landing page vitrine axée sur une interface claire, responsive et structurée en composants.",
    highlights: [
      "Mise en page responsive avec Grid et Flexbox",
      "Composants UI réutilisables pour sections et cartes",
      "Navigation claire avec hiérarchie visuelle cohérente",
      "Interactions JavaScript simples pour améliorer l’expérience",
      "Structure sémantique HTML avec bases d’accessibilité",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Mhd-bnt/Projet-Dev-Web/tree/main",
    liveUrl: "",
  },
  {
    title: "One Chair",
    description:
      "Page vitrine minimaliste centrée sur la présentation produit et la lisibilité du contenu.",
    highlights: [
      "Composition responsive orientée produit",
      "Section hero et blocs contenu alignés proprement",
      "Typographie et contrastes travaillés pour la lecture",
      "Utilisation de CSS moderne pour espacements et alignements",
      "Structure HTML claire et facilement maintenable",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Mhd-bnt/Projet-Dev-Web/tree/main",
    liveUrl: "",
  },
  {
    title: "The Code Magazine",
    description:
      "Page éditoriale statique conçue pour pratiquer une mise en page article propre et structurée.",
    highlights: [
      "Hiérarchie visuelle claire pour titres, contenu et blocs latéraux",
      "Organisation HTML sémantique orientée article",
      "Styles CSS cohérents pour typographie et rythmes verticaux",
      "Mise en page simple et lisible sur plusieurs tailles d’écran",
      "Approche structurée des sections et éléments de contenu",
    ],
    stack: ["HTML", "CSS"],
    githubUrl: "https://github.com/Mhd-bnt/Projet-Dev-Web/tree/main",
    liveUrl: "",
  },
];

let currentProjectIndex = 0;

function setProjectLinkState(linkElement, url, defaultLabel, missingLabel) {
  if (!linkElement) return;

  const labelElement = linkElement.querySelector("span");
  const hasUrl = Boolean(url);

  if (hasUrl) {
    linkElement.href = url;
    linkElement.classList.remove("is-disabled");
    linkElement.removeAttribute("aria-disabled");
    linkElement.removeAttribute("tabindex");
    if (labelElement) labelElement.textContent = defaultLabel;
    return;
  }

  linkElement.removeAttribute("href");
  linkElement.classList.add("is-disabled");
  linkElement.setAttribute("aria-disabled", "true");
  linkElement.setAttribute("tabindex", "-1");
  if (labelElement) labelElement.textContent = missingLabel;
}

function updateProjectCard(index) {
  if (
    !projectDetailsCard ||
    !projectTitle ||
    !projectDescription ||
    !projectStack
  ) {
    return;
  }

  const project = projects[index] || fallbackProject;

  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;

  if (projectHighlights) {
    projectHighlights.innerHTML = "";
    project.highlights.forEach((highlight) => {
      const highlightItem = document.createElement("li");
      highlightItem.textContent = highlight;
      projectHighlights.appendChild(highlightItem);
    });
  }

  projectStack.innerHTML = "";
  project.stack.forEach((tech) => {
    const stackItem = document.createElement("li");
    stackItem.className = "project-chip";
    stackItem.textContent = tech;
    projectStack.appendChild(stackItem);
  });

  setProjectLinkState(projectGithub, project.githubUrl, "GitHub", "GitHub");
  setProjectLinkState(projectLive, project.liveUrl, "Live", "Soon");

  projectDetailsCard.classList.remove("is-updating");
  requestAnimationFrame(() => {
    projectDetailsCard.classList.add("is-updating");
  });
}

projectDetailsCard?.addEventListener("animationend", () => {
  projectDetailsCard.classList.remove("is-updating");
});

function goToProject(index) {
  if (!projectTrack || projectSlides.length === 0) return;

  const totalSlides = projectSlides.length;
  currentProjectIndex = ((index % totalSlides) + totalSlides) % totalSlides;
  projectTrack.style.transform = `translateX(-${currentProjectIndex * 100}%)`;
  updateProjectCard(currentProjectIndex);
}

projectPrevBtn?.addEventListener("click", () =>
  goToProject(currentProjectIndex - 1),
);
projectNextBtn?.addEventListener("click", () =>
  goToProject(currentProjectIndex + 1),
);

if (projectSlides.length > 0) {
  goToProject(0);
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
