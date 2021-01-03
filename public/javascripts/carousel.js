let slidePosition = 0;
const slides = document.getElementsByClassName('carousel__item');
const validate = document.getElementsByClassName('login');
const swiperNext = document.getElementsByClassName('carousel__button--next');
const swiperPrev = document.getElementsByClassName('carousel__button--prev');
const totalSlides = slides.length;

//document.getElementsByClassName('carousel__button--next')
swiperNext[0].addEventListener('click', function() {
    moveToNext();
});

//document.getElementsByClassName('carousel__button--prev')
swiperPrev[0].addEventListener('click', function() {
    moveToPrev();
});

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove('carousel__item--visible');
        slide.classList.add('carousel__item--hidden');
    }
    slides[slidePosition].classList.add('carousel__item--visible');
}

function moveToNext() {
    if (slidePosition === totalSlides - 2) {
        validate[0].classList.remove('login--hidden');
        validate[0].classList.remove('login--visible');
        swiperNext[0].classList.add('login--hidden');
    } else {
        swiperPrev[0].classList.remove('login--hidden');
        slidePosition++;
    }
    updateSlidePosition();
}

function moveToPrev() {
    if (slidePosition != 0) {
        slidePosition--;
    }
    updateSlidePosition();
}