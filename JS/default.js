const body = document.querySelector("body"),
  temaToggle = body.querySelector(".tema-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

temaToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
});

sidebarToggle.addEventListener("click", () => {
  // Check if we're on mobile (window width <= 768px)
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Mobile behavior: Toggle mobile-open class and backdrop
    sidebar.classList.toggle("mobile-open");
    body.classList.toggle("mobile-menu-open");
  } else {
    // Desktop behavior: Toggle close class
    sidebar.classList.toggle("close");
  }
});

// Close mobile menu when clicking on backdrop
body.addEventListener("click", (e) => {
  const isMobile = window.innerWidth <= 768;

  if (isMobile && sidebar.classList.contains("mobile-open")) {
    // Check if click is outside sidebar and not on toggle button
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("mobile-open");
      body.classList.remove("mobile-menu-open");
    }
  }
});

// Handle window resize - reset classes when switching between mobile/desktop
window.addEventListener("resize", () => {
  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {
    // Remove mobile classes when switching to desktop
    sidebar.classList.remove("mobile-open");
    body.classList.remove("mobile-menu-open");
  } else {
    // Remove desktop close class when switching to mobile
    sidebar.classList.remove("close");
  }
});

// Close mobile menu when clicking on menu item
const menuLinks = document.querySelectorAll(".menu-item li a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      sidebar.classList.remove("mobile-open");
      body.classList.remove("mobile-menu-open");
    }
  });
});
