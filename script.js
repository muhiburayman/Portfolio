/* ===============================
   MOBILE MENU
================================ */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

  navMenu.classList.toggle("open");

  const icon = menuToggle.querySelector("i");

  if (navMenu.classList.contains("open")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }

});


document.querySelectorAll(".nav-link").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("open");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

  });

});


/* ===============================
   NAVBAR SCROLL EFFECT
================================ */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


/* ===============================
   ACTIVE NAVIGATION
================================ */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let currentSection = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {

      currentSection = section.getAttribute("id");

    }

  });


  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {

      link.classList.add("active");

    }

  });

});


/* ===============================
   TYPING ANIMATION
================================ */

const roles = [
  "CSE Student",
  "Digital Marketing Specialist",
  "Graphics Designer",
  "Freelancer"
];

const typingText = document.getElementById("typingText");

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeAnimation() {

  const currentRole = roles[roleIndex];


  if (!deleting) {

    typingText.textContent =
      currentRole.substring(0, characterIndex + 1);

    characterIndex++;


    if (characterIndex === currentRole.length) {

      deleting = true;

      setTimeout(typeAnimation, 1600);

      return;

    }


  } else {

    typingText.textContent =
      currentRole.substring(0, characterIndex - 1);

    characterIndex--;


    if (characterIndex === 0) {

      deleting = false;

      roleIndex++;

      if (roleIndex === roles.length) {
        roleIndex = 0;
      }

    }

  }


  const speed = deleting ? 40 : 80;

  setTimeout(typeAnimation, speed);

}


typeAnimation();


/* ===============================
   DARK / LIGHT MODE
================================ */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");


const savedTheme = localStorage.getItem("portfolioTheme");


if (savedTheme === "light") {

  document.body.classList.add("light-mode");

  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");

}


themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");


  if (document.body.classList.contains("light-mode")) {

    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");

    localStorage.setItem("portfolioTheme", "light");

  } else {

    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");

    localStorage.setItem("portfolioTheme", "dark");

  }

});


/* ===============================
   SCROLL REVEAL
================================ */

const revealElements = document.querySelectorAll(
  ".section-heading, .about-text, .stat-card, .timeline-item, .skill-category, .training-card, .service-card, .projects-placeholder, .contact-content, .contact-card"
);


revealElements.forEach(element => {

  element.classList.add("reveal");

});


const observer = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


revealElements.forEach(element => {

  observer.observe(element);

});


/* ===============================
   CURRENT YEAR
================================ */

document.getElementById("currentYear").textContent =
  new Date().getFullYear();
