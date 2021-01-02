let slidePosition = 0;
const slides = document.getElementsByClassName('carousel__item');
const totalSlides = slides.length;

document.getElementById('carousel__button--next')
.addEventListener('click', function() {
    moveToNext();
});

document.getElementById('carousel__button--prev')
.addEventListener('click', function() {
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
    console.log("NEXT");
    if (slidePosition === totalSlides - 1) {
        //display le bouton de validation du form
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    updateSlidePosition();
}

function moveToPrev() {
    console.log("PREV");
    if (slidePosition != 0) {
        slidePosition--;
    } else {
        slidePosition = 0;
    }
    updateSlidePosition();
}