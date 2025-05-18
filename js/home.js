//SLIDER
function slider() {
  const slides = document.querySelectorAll('.slider__slide');
  const left = document.querySelector('.slider__arrow--left');
  const right = document.querySelector('.slider__arrow--right');
  let currentSlide = 0;

  // SLIDING
  function goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${200 * (i - slide)}%)`;
    });
  }
  goToSlide(currentSlide);

  // NEXT & PREV SLIDE
  left.addEventListener('click', previous);
  right.addEventListener('click', next);

  function previous() {
    if (currentSlide == 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
  }
  function next() {
    if (currentSlide == slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
  }
}

slider();

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

// ACCORDIAN

function accordion() {
  const allQuestions = document.querySelectorAll('.faq__question');
  const allAnswers = document.querySelectorAll('.faq__answer');
  const allIcons = document.querySelectorAll('.faq__icon');

  const open = document.querySelector('.open');
  const icons = document.querySelectorAll('.faq__icon');

  open.style.maxHeight = open.scrollHeight + 'px';

  allQuestions.forEach(question => {
    // MAKE QUESTION CLICKABILE
    question.addEventListener('click', function (e) {
      const targetAnswer = this.nextElementSibling;
      const targetIcon = this.firstElementChild;
      const isOpen = targetAnswer.style.maxHeight;

      // RESET NOT ACTIVE ICONS
      allIcons.forEach(icon => {
        icon.innerHTML = '+';
      });

      allAnswers.forEach(answer => {
        answer.style.maxHeight = null;
        targetIcon.innerHTML = '-';
      });

      targetAnswer.style.maxHeight = targetAnswer.scrollHeight + 'px';

      // if (!isOpen || isOpen === "0px") {
      //   targetAnswer.style.maxHeight = targetAnswer.scrollHeight + "px";
      //   targetIcon.innerHTML = "-";
      // }

      // if (!isOpen) {
      // question.firstElementChild.innerHTML = "-";
      // targetAnswer.style.maxHeight = targetAnswer.scrollHeight + "px";
      // } else {
      // targetAnswer.style.maxHeight = targetAnswer.scrollHeight + "px";
      // }
    });
  });
}

accordion();

// REVAL SECTIONS

const observSections = function () {
  const sections = document.querySelectorAll('section');

  const revalSection = function (entries, observe) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.remove('section--hidden');
      observe.unobserve(entry.target);
    });
  };

  const sectionObserver = new IntersectionObserver(revalSection, {
    root: null,
    threshold: 0.15,
  });

  sections.forEach(sec => {
    sectionObserver.observe(sec);
    sec.classList.add('section--hidden');
  });
};

observSections();

// LAZY IMAGES
const observImages = function () {
  const images = document.querySelectorAll('img[data-src]');

  const lazyLoad = function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
      });

      observer.unobserve(entry.target);
    });
  };

  const imageObserver = new IntersectionObserver(lazyLoad, {
    root: null,
    threshold: 0,
    rootMargin: '-50px',
  });

  images.forEach(img => imageObserver.observe(img));
};

observImages();
