// small script to add .active to current nav link
(function(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".main-nav a");
  links.forEach(a=>{
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });
})();

// -------------------------
// Hamburger Button Toggle
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
});


// -------------------------
// Lightbox (only if gallery exists)
// -------------------------
const images = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");

if (images.length && lightbox) {
  let currentIndex = 0;
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "block";
    showSlide(currentIndex);
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  function changeSlide(n) {
    currentIndex += n;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    showSlide(currentIndex);
  }

  function showSlide(index) {
    const img = images[index];
    lightboxImg.classList.remove("visible");
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxCaption.innerHTML = img.alt;
      lightboxImg.classList.add("visible");
    }, 50);
  }

    // Attach controls
  document.querySelector(".close")?.addEventListener("click", closeLightbox);
  document.querySelector(".prev")?.addEventListener("click", () => changeSlide(-1));
  document.querySelector(".next")?.addEventListener("click", () => changeSlide(1));

  

  // Close & navigation
  document.querySelector(".close")?.addEventListener("click", closeLightbox);
  document.querySelector(".prev")?.addEventListener("click", () => changeSlide(-1));
  document.querySelector(".next")?.addEventListener("click", () => changeSlide(1));

  // Background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard
  document.addEventListener("keydown", function(event) {
    if (lightbox.style.display === "block") {
      if (event.key === "ArrowLeft") changeSlide(-1);
      else if (event.key === "ArrowRight") changeSlide(1);
      else if (event.key === "Escape") closeLightbox();
    }
  });

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) changeSlide(1);
    else if (touchEndX > touchStartX + 50) changeSlide(-1);
  });
}

// Hide header once user scrolls away from top, show again only at top
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
});