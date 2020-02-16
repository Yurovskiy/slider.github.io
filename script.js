'use strict';

const slider = document.querySelector('.slider-list');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

const size = document.querySelector('.slide').clientWidth;
let direction = 0;

// buttons
nextBtn.onclick = function() {
    slider.style.transform = 'translateX(' + (-size) + 'px)';
    direction = 1;
};

prevBtn.onclick = function() {
    direction = -1;
    slider.style.transform = 'translateX(' + (size) + 'px)';
};

// after transition event
slider.addEventListener('transitionend', function() {
    let slides = document.querySelectorAll('.slide');

    if (direction < 0) {
        for (let i = 0; i > direction; i--){
            slider.prepend(slides[slides.length+i-1]);
        }
    } else  if (direction > 0) {
        for (let i = 0; i < direction; i++){
            slider.append(slides[i]);
        }
    }
    // remove class active from dots
    dots.forEach((dot, i)=> {
        dot.classList.remove('active');
    });

    slides = document.querySelectorAll('.slide');
    let currentSliderId = slides[0].id.split('_')[1];
    // add class to dots
    dots[currentSliderId - 1].classList.add('active');

    // re-init transition
    slider.style.transition = 'none';
    slider.style.transform = 'translate(0)';
    setTimeout(() => {
        slider.style.transition = 'transform 0.5s ease-in-out';
    },0)
});
// dots
dots.forEach((dot, i)=> {
    dot.addEventListener('click', ()=>{
        const slides = document.querySelectorAll('.slide');

        let currentSliderId = slides[0].id.split('_')[1];
        let destSliderId = i+1;
        direction = destSliderId - currentSliderId;
        let transWidth = direction * size;

        slider.style.transform = `translateX(${-transWidth}px)`;
    })
});