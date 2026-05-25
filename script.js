




window.addEventListener('resize', () => {
  if (window.innerWidth > 1000 && navLinks.classList.contains('mobile-menu')) {
    navLinks.classList.remove('mobile-menu');
    document.body.classList.remove('no-scroll');
  }
});


// Create Particles and Snowflakes
function createParticles() {
   const container = document.getElementById('particles');

   // Floating particles
   for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (15 + Math.random() * 20) + 's';
      particle.style.animationDelay = Math.random() * 15 + 's';
      container.appendChild(particle);
   }

   // Snowflakes - reduced by half, 25% slower
   for (let i = 0; i < 10; i++) {
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

// Fermer le menu quand on clique sur un lien nav
document.querySelectorAll('.nav-links ul li a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-menu');
    updateMobileMenuUI();
  });
});




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




document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links ul li a');
  const sections = [
    { id: 'Accueil', link: null },
    { id: 'univers', link: null },
    { id: 'gameplay', link: null },
    { id: 'personnages', link: null },
    { id: 'equipe', link: null },
    { id: 'telechargement', link: null }
  ];
  // Map links to sections
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const sectionId = href.substring(1);
      const sectionObj = sections.find(s => s.id === sectionId);
      if (sectionObj) sectionObj.link = link;
    }
  });

  function updateActiveNav() {
    let found = false;
    for (let i = 0; i < sections.length; i++) {
      const section = document.getElementById(sections[i].id);
      if (!section || !sections[i].link) continue;
      const rect = section.getBoundingClientRect();
      // Section is considered active if at least 40% visible
      const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      const ratio = visible / Math.min(window.innerHeight, rect.height);
      if (ratio > 0.4 && !found) {
        navLinks.forEach(l => l.classList.remove('active'));
        sections[i].link.classList.add('active');
        found = true;
      }
    }
    // If no section found, remove all
    if (!found) navLinks.forEach(l => l.classList.remove('active'));
  }
  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('resize', updateActiveNav);
  updateActiveNav();
});


// le titre animé "HurlePlat"
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

// ça creér les divs wrapper autour de chaque lettre
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
      time += 25;
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




























  

