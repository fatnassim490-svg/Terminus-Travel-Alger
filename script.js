// ---- Configuration Tailwind (couleurs, polices, ombres personnalisées) ----
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071426',
          900: '#0b1f3a',
          800: '#0f2c50',
          700: '#153a68',
        },
        sunset: {
          400: '#ffb648',
          500: '#f7931e',
          600: '#e97a12',
        },
        azur: {
          400: '#3fc1c9',
          500: '#20a4b0',
        }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -10px rgba(7, 20, 38, 0.25)',
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {

  // Initialise les icônes Lucide
  lucide.createIcons();

  // ---- Menu burger mobile ----
  const btnMenu = document.getElementById('btn-menu');
  const menuMobile = document.getElementById('menu-mobile');
  const iconOpen = document.getElementById('icon-menu-open');
  const iconClose = document.getElementById('icon-menu-close');

  function toggleMenu() {
    const isOpen = menuMobile.classList.toggle('open');
    iconOpen.classList.toggle('hidden', isOpen);
    iconClose.classList.toggle('hidden', !isOpen);
  }
  btnMenu.addEventListener('click', toggleMenu);

  // Ferme le menu mobile au clic sur un lien
  document.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuMobile.classList.remove('open');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });

  // ---- Fade-in au scroll (Intersection Observer) ----
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // ---- Validation + soumission simulée du formulaire de devis ----
  const formDevis = document.getElementById('form-devis');
  const erreurForm = document.getElementById('erreur-form');
  const modalSucces = document.getElementById('modal-succes');
  const modalSuccesBox = document.getElementById('modal-succes-box');
  const btnFermerModal = document.getElementById('btn-fermer-modal');

  function emailValide(valeur) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur);
  }

  formDevis.addEventListener('submit', function (e) {
    e.preventDefault();
    erreurForm.classList.add('hidden');

    const nom = document.getElementById('nom').value.trim();
    const telephone = document.getElementById('telephone').value.trim();
    const email = document.getElementById('email').value.trim();
    const destination = document.getElementById('destination').value;
    const voyageurs = document.getElementById('voyageurs').value;

    if (!nom || !telephone || !email || !destination || !voyageurs) {
      erreurForm.textContent = 'Merci de remplir tous les champs obligatoires (marqués d\'un *).';
      erreurForm.classList.remove('hidden');
      return;
    }
    if (!emailValide(email)) {
      erreurForm.textContent = 'Merci de saisir une adresse email valide.';
      erreurForm.classList.remove('hidden');
      return;
    }

    // Simulation d'envoi réussi (pas de backend réel)
    ouvrirModalSucces();
    formDevis.reset();
  });

  function ouvrirModalSucces() {
    modalSucces.classList.remove('hidden');
    modalSucces.classList.add('flex');
    requestAnimationFrame(() => {
      modalSucces.classList.remove('opacity-0');
      modalSuccesBox.classList.remove('scale-95');
    });
  }

  function fermerModalSucces() {
    modalSucces.classList.add('opacity-0');
    modalSuccesBox.classList.add('scale-95');
    setTimeout(() => {
      modalSucces.classList.add('hidden');
      modalSucces.classList.remove('flex');
    }, 300);
  }

  btnFermerModal.addEventListener('click', fermerModalSucces);
  modalSucces.addEventListener('click', (e) => {
    if (e.target === modalSucces) fermerModalSucces();
  });

  // ---- Navbar : ombre renforcée au scroll ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-2xl');
    } else {
      navbar.classList.remove('shadow-2xl');
    }
  });

});
