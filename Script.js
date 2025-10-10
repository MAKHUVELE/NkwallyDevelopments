// =========================================
// Active Navigation Link
// =========================================
(function(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".main-nav a");
  links.forEach(a=>{
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });
})();

// =========================================
// Hamburger Button Toggle
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
});

// =========================================
// Backend Integration Functions
// =========================================

// Fetch Contact Information from Backend
async function loadContactInfo() {
  try {
    const response = await fetch('/api/contact');
    const data = await response.json();
    
    // Update contact info on the page if elements exist
    const phoneElement = document.querySelector('.contact-info p');
    const emailElement = document.querySelectorAll('.contact-info p')[1];
    
    if (phoneElement) {
      phoneElement.textContent = data.phone;
    }
    if (emailElement) {
      emailElement.textContent = data.email;
    }
    
    console.log('✅ Contact info loaded from backend:', data);
  } catch (error) {
    console.error('❌ Error loading contact info:', error);
    // Fallback: Keep existing hardcoded contact info
  }
}

// Fetch and Display Visit Count
async function loadVisitCount() {
  try {
    const response = await fetch('/api/visits');
    const data = await response.json();
    console.log('👥 Total visits:', data.count);
    
    // Optional: Display visit count in footer or elsewhere
    const visitCounter = document.createElement('div');
    visitCounter.className = 'visit-counter';
    visitCounter.textContent = `Visits: ${data.count}`;
    document.querySelector('.site-footer')?.appendChild(visitCounter);
  } catch (error) {
    console.error('❌ Error loading visit count:', error);
  }
}

// Fetch Gallery Images from Backend
async function loadGallery() {
  try {
    const response = await fetch('/api/gallery');
    const images = await response.json();
    
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
      // Clear existing images
      galleryGrid.innerHTML = '';
      
      // Add images from backend
      images.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt;
        imgElement.title = img.description;
        imgElement.onclick = () => openLightbox(index);
        galleryGrid.appendChild(imgElement);
      });
      
      // Update the global images array for lightbox
      window.galleryImages = images;
      console.log('✅ Gallery loaded from backend:', images.length, 'images');
      
      // Reinitialize lightbox with new images
      initializeLightbox();
    }
  } catch (error) {
    console.error('❌ Error loading gallery:', error);
    // Fallback: Use existing static images
    initializeLightbox();
  }
}

// Fetch Team Members from Backend
async function loadTeam() {
  try {
    const response = await fetch('/api/team');
    const team = await response.json();
    
    const teamGrid = document.querySelector('.team-grid');
    if (teamGrid) {
      // Clear existing team cards
      teamGrid.innerHTML = '';
      
      // Add team members from backend
      team.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
          <div class="team-photo"><img src="${member.image}" alt="${member.name}"></div>
          <div class="team-name">${member.name}<br><span class="team-role">${member.role}</span></div>
        `;
        teamGrid.appendChild(card);
      });
      
      console.log('✅ Team loaded from backend:', team.length, 'members');
    }
  } catch (error) {
    console.error('❌ Error loading team:', error);
    // Fallback: Keep existing static team members
  }
}

// =========================================
// Lightbox Functionality
// =========================================
let images = [];
let currentIndex = 0;
const lightbox = document.getElementById("lightbox");

function initializeLightbox() {
  // Use backend images if available, otherwise use DOM elements
  if (window.galleryImages && window.galleryImages.length > 0) {
    images = window.galleryImages;
  } else {
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    images = Array.from(galleryImages);
  }
}

function openLightbox(index) {
  currentIndex = index;
  if (lightbox) {
    lightbox.style.display = "block";
    showSlide(currentIndex);
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.style.display = "none";
  }
}

function changeSlide(n) {
  currentIndex += n;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  showSlide(currentIndex);
}

function showSlide(index) {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  if (lightboxImg && images[index]) {
    const img = images[index];
    lightboxImg.classList.remove("visible");
    setTimeout(() => {
      lightboxImg.src = img.src || img;
      if (lightboxCaption) {
        lightboxCaption.innerHTML = img.alt || img.description || '';
      }
      lightboxImg.classList.add("visible");
    }, 50);
  }
}

// Setup lightbox event listeners
if (lightbox) {
  // Close & navigation buttons
  document.querySelector(".close")?.addEventListener("click", closeLightbox);
  document.querySelector(".prev")?.addEventListener("click", () => changeSlide(-1));
  document.querySelector(".next")?.addEventListener("click", () => changeSlide(1));

  // Background click to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", function(event) {
    if (lightbox.style.display === "block") {
      if (event.key === "ArrowLeft") changeSlide(-1);
      else if (event.key === "ArrowRight") changeSlide(1);
      else if (event.key === "Escape") closeLightbox();
    }
  });

  // Swipe support for mobile
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

// =========================================
// Header Scroll Behavior
// =========================================
const header = document.querySelector(".site-header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
  });
}

// =========================================
// Initialize Everything When Page Loads
// =========================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Initializing Nkwally Developments website...');
  
  // Initialize lightbox if gallery exists
  if (document.querySelector('.gallery-grid')) {
    initializeLightbox();
  }
  
  // Backend integration - load dynamic content if APIs exist
  try {
    // Load contact info on index page
    if (document.querySelector('.contact-info')) {
      loadContactInfo();
    }
    
    // Load gallery on services page (will override static images if API works)
    if (document.querySelector('.gallery-grid')) {
      loadGallery();
    }
    
    // Load team on about page
    if (document.querySelector('.team-grid')) {
      loadTeam();
    }
    
    // Track visits on all pages
    loadVisitCount();
    
  } catch (error) {
    console.log('ℹ️ Backend not available, using static content');
  }
  
  console.log('✅ Website initialization complete');
});