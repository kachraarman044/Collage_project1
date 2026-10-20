const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function nextSlide() { 
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}
setInterval(nextSlide, 5020);