




window.addEventListener('resize', () => {
  if (window.innerWidth > 1000 && navLinks.classList.contains('mobile-menu')) {
    navLinks.classList.remove('mobile-menu');
    updateMobileMenuUI();
  }
  updateMobileMenuUI();
});


// Create Particles and Snowflakes
function createParticles() {
   const container = document.getElementById('particles');

   // Floating particles
   for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (15 + Math.random() * 20) + 's';
      particle.style.animationDelay = Math.random() * 15 + 's';
      container.appendChild(particle);
   }

   // Snowflakes - reduced by half, 25% slower
   for (let i = 0; i < 20; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = '✦';
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = (12.5 + Math.random() * 18.75) + 's';
      snowflake.style.animationDelay = Math.random() * 10 + 's';
      snowflake.style.fontSize = (0.5 + Math.random() * 1) + 'rem';
      snowflake.style.opacity = 0.2 + Math.random() * 0.4;
      container.appendChild(snowflake);
   }
}



const menuHamburger = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");
const closeBtn = document.querySelector(".mobile-menu-close");

function updateMobileMenuUI() {
  const isOpen = navLinks.classList.contains('mobile-menu');
  if (closeBtn) closeBtn.style.display = isOpen ? 'flex' : 'none';
  document.body.classList.toggle('no-scroll', isOpen);
}

menuHamburger.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-menu');
  updateMobileMenuUI();
});

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    navLinks.classList.remove('mobile-menu');
    updateMobileMenuUI();
  });
}




//  zoom : l'image de la planète avance vers l'écran 
function updateBackgroundZoom() {
   const planete = document.getElementById('bg-planete');
   const section1 = document.querySelector('.section-1');
   if (!planete || !section1) return;
   const scrollY = window.scrollY || window.pageYOffset;
   const section1Top = section1.offsetTop;
   const section1Height = section1.offsetHeight;
   // Zoom de 1 à 1.35 sur toute la section 1
   let progress = Math.min(1, Math.max(0, (scrollY - section1Top) / section1Height));
   let scale = 1 + progress * 0.75;
   planete.style.transform = `scale(${scale})`;
}

window.addEventListener('scroll', updateBackgroundZoom);
window.addEventListener('resize', updateBackgroundZoom);
// Gère l'affichage progressif des backgrounds selon la section
function updateBackgrounds() {
   const planete = document.getElementById('bg-planete');
   const fond = document.getElementById('bg-fond');
   const section1 = document.querySelector('.section-1');
   if (!planete || !fond || !section1) return;

   const scrollY = window.scrollY || window.pageYOffset;
   const section1Top = section1.offsetTop;
   const section1Height = section1.offsetHeight;

   // Utilise le même progress que le zoom (0 = haut section 1, 1 = bas section 1)
   let progress = Math.min(1, Math.max(0, (scrollY - section1Top) / section1Height));

   let planeteOpacity = 1 - progress * 1.2; 
   let fondOpacity = (progress - 0.7) / 0.3; // commence à apparaître à 70% du scroll section 1 t'a capté
   planeteOpacity = Math.max(0, Math.min(1, planeteOpacity));
   fondOpacity = Math.max(0, Math.min(1, fondOpacity));
   planete.style.opacity = planeteOpacity;
   fond.style.opacity = fondOpacity;
}

window.addEventListener('scroll', updateBackgrounds);
window.addEventListener('resize', updateBackgrounds);



document.addEventListener('DOMContentLoaded', () => {
   updateBackgroundZoom();
   createParticles();
   updateBackgrounds();
});
















// le texte animé "Hurle Plat"
const text = "HurlePlat"; 

const createLetterArray = (string) => {
  return string.split("");
};

const createLetterLayers = (array) => {
  return array.map((letter) => {
    let layer = "";
   
    for (let i = 1; i <= 2; i++) {
      
      if (letter == " ") {
        layer += '<span class="space"></span>';
      } else {
        layer += '<span class="letter-span letter-' + i + '">' + letter + "</span>";
      }
    }
    return layer;
  });
};

// ça crée les divs wrapper autour de chaque lettre
const createLetterContainers = (array) => {
  return array.map((item) => {
    let container = "";
    container += '<div class="wrapper">' + item + "</div>";
    return container;
  });
};

// utilisation des fonctions pour créer le HTML
const outputLayers = new Promise(function (resolve, reject) {
  document.getElementById("text").innerHTML = createLetterContainers(
    createLetterLayers(createLetterArray(text))
  ).join("");
  resolve();
});

// adapte la taille des wrappers puis anime les lettres
const spans = Array.prototype.slice.call(document.getElementsByClassName("letter-span"));
outputLayers
  .then(() => {
    return spans.map((span) => {
      setTimeout(() => {
        span.parentElement.style.width = span.offsetWidth + "px";
        span.parentElement.style.height = span.offsetHeight + "px";
      }, 250);
    });
  })
  .then(() => {
    // puis anime les lettres
    let time = 250;
    return spans.map((span) => {
      time += 75;
      setTimeout(() => {
        span.parentElement.style.top = "0px";
      }, time);
    });
  });




// Masquer les flèches quand on atteint la fin de la section

document.addEventListener('DOMContentLoaded', () => {
  const arrows = document.querySelector('.arrows');
  const sentinel = document.querySelector('.arrows-sentinel');
  if (!arrows || !sentinel) return;


  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const ratio = entry.intersectionRatio; 

      const opacity = 1 - ratio;
      arrows.style.opacity = opacity.toFixed(3);

      
      if (opacity <= 0.05) {
        arrows.style.pointerEvents = 'none';
      } else {
        arrows.style.pointerEvents = '';
      }
    });
  }, {
    root: null,           
    threshold: thresholds,
    rootMargin: '0px 0px -20% 0px'
  });

  observer.observe(sentinel);
});













/*

// Intersection Observer pour faire apparaître les titres de sections

const observerOptions = {
  threshold: 0.2,     // au moins 20% visible
  rootMargin: '-300px' // apparait "plus tard" (décale le seuil vers le bas)
};



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    const rect = entry.boundingClientRect;
    const vh = window.innerHeight || document.documentElement.clientHeight;

    if (entry.isIntersecting) {
      // Il entre dans le viewport (selon threshold/rootMargin) → révéler
      el.classList.add('visible');
      return;
    }

    // Ici: pas intersectant. Décidons si on retire 'visible' ou on laisse.
    // On NE retire que s'il n'est plus du tout à l'écran :
    // - entièrement au-dessus: bottom <= 0
    // - entièrement en dessous: top >= viewport height
    const fullyAbove = rect.bottom <= 0;
    const fullyBelow = rect.top >= vh;

    if (fullyAbove || fullyBelow) {
      el.classList.remove('visible');
    }
    // Sinon (proche du viewport mais pas assez pour threshold),
    // on garde l'état actuel pour éviter les clignotements.
  });
}, observerOptions);

// Observer tous les titres
document.querySelectorAll('.section-title').forEach(title => {
  // État initial (masqué) : à adapter à ton CSS
  title.classList.remove('visible');
  observer.observe(title);
});


*/


// Animation des texte dans l'univers 
const ACTIVATE_RATIO   = 0.80; 
const DEACTIVATE_RATIO = 0.22;

let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
let ticking = false;

function update() {
  const sections = document.querySelectorAll('.vorn-section .vorn-content');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const vh = window.innerHeight;

  const goingDown = scrollTop > lastScrollTop;
  const goingUp   = scrollTop < lastScrollTop;

  const activatePoint   = vh * ACTIVATE_RATIO;   
  const deactivatePoint = vh * DEACTIVATE_RATIO; 

  sections.forEach(section => {
    const sectionTopInViewport = section.getBoundingClientRect().top;

    // Descente 
    if (goingDown) {
      
      if (sectionTopInViewport < activatePoint && !section.classList.contains('vorn-active')) {
        section.classList.add('vorn-active');
        section.classList.remove('vorn-inactive');
      }

    
      if (sectionTopInViewport < deactivatePoint && !section.classList.contains('vorn-inactive')) {
        section.classList.add('vorn-inactive');
        section.classList.remove('vorn-active');
      }
    }

    //  Montée
    if (goingUp) {

      if (sectionTopInViewport >= deactivatePoint && sectionTopInViewport < activatePoint) {
        if (!section.classList.contains('vorn-active')) {
          section.classList.add('vorn-active');
          section.classList.remove('vorn-inactive');
        }
      }

      if (sectionTopInViewport >= activatePoint && !section.classList.contains('vorn-inactive')) {
        section.classList.add('vorn-inactive');
        section.classList.remove('vorn-active');
      }
    }
  });

  lastScrollTop = Math.max(scrollTop, 0);
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

document.addEventListener('scroll', onScroll, { passive: true });

window.addEventListener('resize', () => requestAnimationFrame(update));








document.addEventListener('DOMContentLoaded', () => {

    // les screenshots mais ça marche pas trop bien encore
    const screenshotImgs = document.querySelectorAll('.screenshots-grid .screenshot img');
    const lightbox = document.getElementById('lightbox');
    const lbImage = lightbox ? lightbox.querySelector('.lightbox__image') : null;
    const lbCaption = lightbox ? lightbox.querySelector('.lightbox__caption') : null;
    const btnClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;
    const btnPrev = lightbox ? lightbox.querySelector('.lightbox__prev') : null;
    const btnNext = lightbox ? lightbox.querySelector('.lightbox__next') : null;
    let currentIndex = 0;

    const images = Array.from(screenshotImgs).map(img => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || '',
        caption: img.getAttribute('data-caption') || img.getAttribute('alt') || ''
    }));

    function openLightbox(index) {
        if (!lightbox || !lbImage) return;
        currentIndex = (index + images.length) % images.length;
        lbImage.src = images[currentIndex].src;
        lbImage.alt = images[currentIndex].alt;
        lbCaption.textContent = images[currentIndex].caption;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        if (btnClose) btnClose.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
    }

    function showPrev() { openLightbox((currentIndex - 1 + images.length) % images.length); }
    function showNext() { openLightbox((currentIndex + 1) % images.length); }
    screenshotImgs.forEach((img, i) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(i));
    });

    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    if (btnPrev) btnPrev.addEventListener('click', showPrev);
    if (btnNext) btnNext.addEventListener('click', showNext);


    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});





















  

