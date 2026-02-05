const carousel = document.querySelector('.eras-carousel');
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const indicators = document.querySelectorAll('.carousel-indicators button');

let currentIndex = 0;

function updateCarousel() {
  const activeSlide = slides[currentIndex];

  const carouselRect = carousel.getBoundingClientRect();
  const slideRect = activeSlide.getBoundingClientRect();

  const carouselCenter = carouselRect.width / 2;
  const slideCenter = activeSlide.offsetLeft + slideRect.width / 2;

  const offset = slideCenter - carouselCenter;
  track.style.transform = `translateX(${-offset}px)`;

  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'near', 'far');

    if (index === currentIndex) {
      slide.classList.add('active');
    } else if (Math.abs(index - currentIndex) === 1) {
      slide.classList.add('near');
    } else if (Math.abs(index - currentIndex) >= 2) {
      slide.classList.add('far');
    }
  });

  indicators.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

indicators.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
  });
});

window.addEventListener('resize', updateCarousel);
updateCarousel();