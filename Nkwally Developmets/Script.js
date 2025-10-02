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
// Variables
// -------------------------
let currentIndex = 0;
const images = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

// -------------------------
// Open Lightbox
// -------------------------
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "block";
  showSlide(currentIndex);
}

// -------------------------
// Close Lightbox
// -------------------------
function closeLightbox() {
  lightbox.style.display = "none";
}

// -------------------------
// Change Slide
// -------------------------
function changeSlide(n) {
  currentIndex += n;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  showSlide(currentIndex);
}

// -------------------------
// Show Slide with Fade
// -------------------------
function showSlide(index) {
  const img = images[index];

  // Reset opacity for fade effect
  lightboxImg.classList.remove("visible");

  setTimeout(() => {
    lightboxImg.src = img.src;
    lightboxCaption.innerHTML = img.alt;
    lightboxImg.classList.add("visible");
  }, 50);
}

// -------------------------
// Keyboard Navigation
// -------------------------
document.addEventListener("keydown", function(event) {
  if (lightbox.style.display === "block") {
    if (event.key === "ArrowLeft") changeSlide(-1);
    else if (event.key === "ArrowRight") changeSlide(1);
    else if (event.key === "Escape") closeLightbox();
  }
});

// -------------------------
// Swipe Support for Mobile
// -------------------------
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", function(e) {
  touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener("touchend", function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
}, false);

function handleGesture() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) changeSlide(1);
  else if (touchEndX > touchStartX + swipeThreshold) changeSlide(-1);
}
