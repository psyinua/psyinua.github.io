// Невелика інтерактивність сайту: мобільне меню та автоматичний рік у футері.
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();



// ===== КАРУСЕЛЬ СЕРТИФІКАТІВ =====

const certificateTrack = document.getElementById('certificateTrack');

if (certificateTrack) {

    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');

    prevButton.addEventListener('click', () => {
        certificateTrack.scrollBy({
            left: -250,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        certificateTrack.scrollBy({
            left: 250,
            behavior: 'smooth'
        });
    });

    // Перевірка наявності фотографій
    const certificateItems = document.querySelectorAll('.certificate-item');

    certificateItems.forEach(item => {
        const img = item.querySelector('img');

        img.addEventListener('load', () => {
            item.classList.add('has-photo');
        });

        img.addEventListener('error', () => {
            img.style.display = 'none';
        });

        if (img.complete && img.naturalWidth > 0) {
            item.classList.add('has-photo');
        }
    });

    // Збільшення фотографій
    const lightbox = document.getElementById('photoLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeButton = document.querySelector('.lightbox-close');

    certificateItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');

            if (!img.naturalWidth) return;

            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeButton.focus();
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxImage.src = '';
        document.body.style.overflow = '';
    }

    closeButton.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}
