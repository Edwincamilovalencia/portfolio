// Función para inicializar Intersection Observers
function initializeIntersectionObservers() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const catalogCards = document.querySelectorAll('.catalog-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); //Se agrega para que se ejecute una sola vez la animacion
            } else {
                entry.target.classList.remove('visible'); //Se remueve la clase para que la animacion se ejecute cada vez que se haga scroll
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => observer.observe(item));
    catalogCards.forEach(card => observer.observe(card));
}

// Función para manejar la navegación pegajosa
function handleStickyNav() {
    const navPanel = document.querySelector('.nav-panel');
    if (!navPanel) return;
    const navOffsetTop = navPanel.offsetTop;

    function checkSticky() {
        if (!navPanel.offsetParent) return; // Añade esta línea para verificar que el elemento tenga un padre
        if (window.scrollY >= navOffsetTop) {
            navPanel.classList.add('sticky');
            navPanel.style.top = 0;
        } else {
            navPanel.classList.remove('sticky');
            navPanel.style.top = null;
        }
    }

    window.addEventListener('scroll', checkSticky);
    checkSticky();
}
// Función principal al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar ScrollReveal
    window.sr = ScrollReveal();
    sr.reveal('.content-section', {
        duration: 1000,
        delay: 200,
        easing: 'ease-in-out',
        reset: false,
        origin: 'bottom',
        distance: '50px'
    });

    // Manejar la navegación pegajosa
    handleStickyNav();

    initializeIntersectionObservers();

});


document.addEventListener('DOMContentLoaded', function() {
    const splitTextContainers = document.querySelectorAll('.split-text-container');
  
    splitTextContainers.forEach(container => {
        const text = container.dataset.text;
        if (text) {
          const letters = text.split('');
          container.innerHTML = ''; // clear content
  
          letters.forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter === ' ' ? ' ' : letter; // Non-breaking space
            letterSpan.classList.add('split-letter');
            container.appendChild(letterSpan);
            letterSpan.style.transitionDelay = `${index * 50}ms`;
         });
  
        //Observer to set the inView class
            const observer = new IntersectionObserver(
              ([entry]) => {
              if (entry.isIntersecting) {
                 container.classList.add('inView');
                observer.unobserve(container);
              }
            },
              { threshold: 0.1, rootMargin: '-100px' }
          );
           observer.observe(container)
        }
      });
  });

 // set header height for styling
 document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
  
    document.documentElement.style.setProperty('--headerHeight', `${headerHeight}px`);
  
    const navContainer = document.querySelector('.nav-container');
        const contenedorAbout = document.querySelector('.contenedorAbout');

        const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
               navContainer.classList.add('sticky');
          }else {
               navContainer.classList.remove('sticky');
          }
        },
        { threshold: 0, rootMargin: '-'+headerHeight + 'px 0px 0px 0px'}
    );
     observer.observe(contenedorAbout)
  });

  document.addEventListener('DOMContentLoaded', function () {
    // Carrusel de educación
    const educationCarousel = document.querySelector('.education-carousel');
    const educationSlides = document.querySelectorAll('.education-carousel .carousel-slide');
    const educationDotsContainer = document.querySelector('.education-dots');
    let educationCurrentIndex = 0;
    const educationSlideWidth = educationSlides[0].offsetWidth + 20;

    function updateEducationCarousel() {
        educationCarousel.style.transform = `translateX(-${educationCurrentIndex * educationSlideWidth}px)`;
        updateEducationDots();
    }
    function createEducationDots() {
        educationSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => {
                educationCurrentIndex = index;
                updateEducationCarousel();
            });
            educationDotsContainer.appendChild(dot);
        });
        updateEducationDots();
    }
    function updateEducationDots() {
        const dots = educationDotsContainer.querySelectorAll('span');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === educationCurrentIndex);
        });
    }

    createEducationDots();

    // Carrusel de certificados
    const certificatesCarousel = document.querySelector('.certificates-carousel');
    const certificatesSlides = document.querySelectorAll('.certificates-carousel .carousel-slide');
    const certificatesDotsContainer = document.querySelector('.certificates-dots');
    let certificatesCurrentIndex = 0;
    const certificatesSlideWidth = certificatesSlides[0].offsetWidth + 20;

    function updateCertificatesCarousel() {
        certificatesCarousel.style.transform = `translateX(-${certificatesCurrentIndex * certificatesSlideWidth}px)`;
        updateCertificatesDots();
    }
    function createCertificatesDots() {
        certificatesSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => {
                certificatesCurrentIndex = index;
                updateCertificatesCarousel();
            });
            certificatesDotsContainer.appendChild(dot);
        });
        updateCertificatesDots();
    }
    function updateCertificatesDots() {
        const dots = certificatesDotsContainer.querySelectorAll('span');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === certificatesCurrentIndex);
        });
    }
    createCertificatesDots();

    // Modales (corregido y simplificado)
    const modalButtons = document.querySelectorAll('.certificate-card');
    const modals = document.querySelectorAll('.modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    modalButtons.forEach(button => {
        button.addEventListener('click', function () {
          const modalId = this.getAttribute('data-modal');
           const modal = document.getElementById(modalId);
             if (modal) {
                  modal.style.display = 'block';
               }
        });
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                 modal.style.display = 'none';
            }
        });
    });
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});

