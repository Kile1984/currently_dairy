'use strict';
document.addEventListener('DOMContentLoaded', function () {
  // POPUP

  // function popup() {
  //   const play = document.querySelector('.play');
  //   const popup = document.querySelector('.popup');
  //   const popupClose = document.querySelector('.popup__close');
  //   const video = document.querySelector('.video');

  //   play.addEventListener('click', () => {
  //     popup.classList.add('popup__open');
  //   });

  //   popupClose.addEventListener('click', () => {
  //     popup.classList.remove('popup__open');
  //     video.pause();
  //     video.currentTime = 0;
  //   });
  // }

  // popup();

  // STICKY NAVIGATION

  function observingNavigation() {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    function stickyNav(entries) {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        nav.classList.add('sticky');
      } else {
        nav.classList.remove('sticky');
      }
    }

    const navObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 1,
      rootMargin: '100px',
    });

    navObserver.observe(header);
  }

  observingNavigation();
});

// TESTIMONIAL SLIDER
function sliderT() {
  const sliderContainer = document.querySelector('.testimonials__slider');
  const slides = document.querySelectorAll('.testimonials__slide');
  const dots = document.querySelector('.dots');
  let currentSlide = 0;

  // CRETAE DOTS
  function creteDots() {
    slides.forEach((_, i) => {
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );

      // first dot active
      document
        .querySelectorAll('.dots__dot')[0]
        .classList.add('dots__dot--active');
    });
  }

  // ACTIVE DOT
  function activeDot(active) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      console.log(dot.classList);
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`[data-slide="${active}"]`)
      .classList.add('dots__dot--active');
  }

  // SLIDING
  function goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${150 * (i - slide)}%)`;
    });
  }
  creteDots();
  goToSlide(currentSlide);

  // CLICK DOTS
  sliderContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activeDot(slide);
    }
  });
}

sliderT();

// HAMBURGER

const hamburger = function () {
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const close = document.querySelector('.nav__close');

  const overlayVisibility = document.querySelector('.nav__mobile-menu-overlay');

  // navList.classList.add('close');

  navToggle.addEventListener('click', function () {
    navList.classList.toggle('open');
    close.classList.toggle('open');

    overlayVisibility.classList.add('open');
  });

  close.addEventListener('click', () => {
    navList.classList.remove('open');
    close.classList.remove('open');
    overlayVisibility.classList.remove('open');
  });

  overlayVisibility.addEventListener('click', () => {
    overlayVisibility.classList.remove('open');
    navList.classList.remove('open');
    close.classList.remove('open');
  });
};

hamburger();
