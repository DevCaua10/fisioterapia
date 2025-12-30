// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  
  // Toggle icon
  const icon = mobileMenuBtn.querySelector('svg');
  if (mobileMenu.classList.contains('active')) {
    icon.innerHTML = `
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    `;
  } else {
    icon.innerHTML = `
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    `;
  }
});

// Close menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('svg');
    icon.innerHTML = `
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    `;
  });
});

// ===== TESTIMONIALS CAROUSEL =====
const track = document.getElementById('testimonials-track');
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.testimonials-dot');
const prevBtn = document.getElementById('testimonials-prev');
const nextBtn = document.getElementById('testimonials-next');

let currentSlide = 0;
let slidesPerView = 1;
let autoSlideInterval;

// Calculate slides per view based on screen width
function calculateSlidesPerView() {
  if (window.innerWidth >= 1024) {
    slidesPerView = 3;
  } else if (window.innerWidth >= 768) {
    slidesPerView = 2;
  } else {
    slidesPerView = 1;
  }
}

// Update carousel position
function updateCarousel() {
  const slideWidth = 100 / slidesPerView;
  track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Go to specific slide
function goToSlide(index) {
  const maxSlide = slides.length - slidesPerView;
  currentSlide = Math.max(0, Math.min(index, maxSlide));
  updateCarousel();
}

// Next slide
function nextSlide() {
  const maxSlide = slides.length - slidesPerView;
  currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
  updateCarousel();
}

// Previous slide
function prevSlide() {
  const maxSlide = slides.length - slidesPerView;
  currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
  updateCarousel();
}

// Auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event listeners
prevBtn.addEventListener('click', () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
    stopAutoSlide();
    startAutoSlide();
  });
});

// Handle resize
window.addEventListener('resize', () => {
  calculateSlidesPerView();
  updateCarousel();
});

// Initialize carousel
calculateSlidesPerView();
updateCarousel();
startAutoSlide();

// ===== SCROLL ANIMATIONS =====
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== FORM SUBMISSION (WhatsApp) =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const serviceSelect = document.getElementById("service");
  const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
  const message = document.getElementById("message").value;

  const whatsappMessage = `
Olá, gostaria de agendar uma avaliação.

*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone}
*Serviço:* ${serviceText}

*Mensagem:*
${message}
  `;

  const whatsappNumber = "5585996733300"; // WhatsApp da clínica (DDI + número)

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappURL, "_blank");

  contactForm.reset();
});

