document.addEventListener("DOMContentLoaded", function () {
    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Animación de revelación para las secciones
    gsap.utils.toArray(".content-section").forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });
    });

    // Animación de las tarjetas de educación
    gsap.utils.toArray(".catalog-card").forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });
    });

    // --- Sticky Navigation Handling ---
    const navPanel = document.querySelector(".nav-panel");
    if (navPanel) {
        const navOffsetTop = navPanel.offsetTop;

        function checkSticky() {
            if (window.scrollY >= navOffsetTop) {
                navPanel.classList.add("sticky");
                gsap.to(navPanel, { backgroundColor: "#6C63FF", duration: 0.3 });
            } else {
                navPanel.classList.remove("sticky");
                gsap.to(navPanel, { backgroundColor: "transparent", duration: 0.3 });
            }
        }
        window.addEventListener("scroll", checkSticky);
        checkSticky();
    }

    // --- Education and Certificates Carousels ---
    function initializeCarousel(carouselContainer, dotsContainer, intervalTime) {
        const carousel = carouselContainer.querySelector(".carousel");
        const slides = Array.from(carousel.children);
        let currentSlide = 0;

        // Crear puntos de navegación
        if (dotsContainer) {
            dotsContainer.innerHTML = "";
            slides.forEach((_, index) => {
                const dot = document.createElement("span");
                dot.addEventListener("click", () => {
                    currentSlide = index;
                    updateCarousel(carousel, slides, currentSlide, dotsContainer);
                });
                dotsContainer.appendChild(dot);
            });
        }

        // Actualizar carrusel
        function updateCarousel(carousel, slides, currentSlide, dotsContainer) {
            const slideWidth = slides[0].offsetWidth;
            gsap.to(carousel, {
                x: -currentSlide * slideWidth,
                duration: 0.5,
                ease: "power2.out",
            });

            if (dotsContainer) {
                dotsContainer.querySelectorAll("span").forEach((dot, index) => {
                    dot.classList.toggle("active", index === currentSlide);
                });
            }
        }

        // Auto-scroll
        let interval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel(carousel, slides, currentSlide, dotsContainer);
        }, intervalTime);

        // Pausar al hacer hover
        carouselContainer.addEventListener("mouseenter", () => clearInterval(interval));
        carouselContainer.addEventListener("mouseleave", () => {
            interval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel(carousel, slides, currentSlide, dotsContainer);
            }, intervalTime);
        });

        // Inicializar
        updateCarousel(carousel, slides, currentSlide, dotsContainer);
    }

    // Inicializar carruseles
    const educationCarouselContainer = document.querySelector(".education-carousel-container");
    const educationDotsContainer = educationCarouselContainer?.querySelector(".carousel-dots");
    if (educationCarouselContainer) {
        initializeCarousel(educationCarouselContainer, educationDotsContainer, 5000);
    }

    const certificatesCarouselContainer = document.querySelector(".certificates-carousel-container");
    const certificatesDotsContainer = certificatesCarouselContainer?.querySelector(".carousel-dots");
    if (certificatesCarouselContainer) {
        initializeCarousel(certificatesCarouselContainer, certificatesDotsContainer, 5000);
    }

    // --- Modal para certificados ---
    const certificateCards = document.querySelectorAll(".certificate-card");
    const modal = document.querySelector(".modal");
    const modalContent = modal?.querySelector(".modal-content img");
    const closeModal = modal?.querySelector(".close-modal");

    if (certificateCards && modal && modalContent && closeModal) {
        certificateCards.forEach((card) => {
            card.addEventListener("click", () => {
                const imgSrc = card.querySelector("img").src;
                modalContent.src = imgSrc;
                gsap.to(modal, { opacity: 1, visibility: "visible", duration: 0.3 });
                gsap.from(".modal-content", { y: 50, opacity: 0, duration: 0.5 });
            });
        });

        closeModal.addEventListener("click", () => {
            gsap.to(modal, { opacity: 0, visibility: "hidden", duration: 0.3 });
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                gsap.to(modal, { opacity: 0, visibility: "hidden", duration: 0.3 });
            }
        });
    }

    // --- Sidepanel Nav Style ---
    const sidepanelNav = document.querySelector(".sidepanel-nav");
    if (sidepanelNav) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                sidepanelNav.classList.add("scrolled");
            } else {
                sidepanelNav.classList.remove("scrolled");
            }
        });
    }
});

// 
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
  
      carousels.forEach(carousel => {
          const inner = carousel.querySelector('.carousel-inner');
          const slides = Array.from(inner.children);
          let currentSlide = 0;
          const slideWidth = slides[0].offsetWidth;
  
  
           function updateCarousel() {
               inner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
           }
  
           function moveToSlide(index) {
              if (index >= 0 && index < slides.length) {
                currentSlide = index;
                updateCarousel();
                updateDots();
              }
           }
  
  
          const dotsContainer = carousel.nextElementSibling;
            if (dotsContainer && dotsContainer.classList.contains('carousel-dots')) {
              slides.forEach((_, index) => {
                  const dot = document.createElement('span');
                  dot.addEventListener('click', () => moveToSlide(index));
                  dotsContainer.appendChild(dot);
              });
          }
  
         function updateDots() {
            const dots = carousel.nextElementSibling.querySelectorAll('span');
            dots.forEach((dot, index) => {
              if (index === currentSlide) {
                  dot.classList.add('active');
              } else {
                dot.classList.remove('active');
              }
             });
         }
         updateCarousel();
         updateDots();
      });
  
  
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
      card.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('open');
        }
      });
    });
  
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        const modal = this.closest('.modal');
        if (modal) {
          modal.classList.remove('open');
        }
        event.stopPropagation();
      });
    });
      window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
          event.target.classList.remove('open');
        }
      });
  });


//
