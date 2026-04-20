document.addEventListener('DOMContentLoaded', () => {
  
  // ---------- ПАНОРАМНАЯ КАРУСЕЛЬ ----------
  const slidesContainer = document.getElementById('gallerySlides');
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('galleryDots');

  let currentIndex = 0;
  const totalSlides = slides.length;
  const visibleSlides = 3;
  let interval;
  const INTERVAL_TIME = 3000;

  function createDots() {
    dotsContainer.innerHTML = '';
    const dotsCount = Math.ceil(totalSlides / visibleSlides);
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('gallery-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToGroup(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots(groupIndex) {
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === groupIndex));
  }

  function goToGroup(groupIndex) {
    const maxGroup = Math.ceil(totalSlides / visibleSlides) - 1;
    if (groupIndex < 0) groupIndex = maxGroup;
    if (groupIndex > maxGroup) groupIndex = 0;

    currentIndex = groupIndex * visibleSlides;
    const slideWidth = slides[0].offsetWidth + 10;
    slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots(groupIndex);
  }

  function nextGroup() {
    const maxGroup = Math.ceil(totalSlides / visibleSlides) - 1;
    const currentGroup = Math.floor(currentIndex / visibleSlides);
    goToGroup(currentGroup + 1);
  }

  function prevGroup() {
    const currentGroup = Math.floor(currentIndex / visibleSlides);
    goToGroup(currentGroup - 1);
  }

  function startAutoSlide() {
    if (interval) clearInterval(interval);
    interval = setInterval(nextGroup, INTERVAL_TIME);
  }

  function stopAutoSlide() { clearInterval(interval); }

  if (slides.length > 0) {
    createDots();
    startAutoSlide();

    nextBtn.addEventListener('click', () => {
      nextGroup();
      stopAutoSlide();
      startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
      prevGroup();
      stopAutoSlide();
      startAutoSlide();
    });

    const slider = document.querySelector('.gallery-slider');
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    window.addEventListener('resize', () => {
      const slideWidth = slides[0].offsetWidth + 10;
      slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    });
  }

  // ---------- ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРЕЙ ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#get') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});