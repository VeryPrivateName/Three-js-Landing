// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

document.addEventListener('DOMContentLoaded', function () {
    // wait until window is loaded - meaning all images, stylesheets, js, fonts, media assets, and links
    window.addEventListener(
        'load',
        function (e) {
            const loader = document.querySelector('.loader');
            loader.className += ' hidden'; // class "loader hidden"
            const container = document.querySelector('.container');
            container.className += ' visible';
            const tl = new TimelineMax();
            const holder = document.querySelector('.holder');
            const navbar = document.querySelector('.navbar');
            const arrow = document.querySelector('.containerSVG')
            const darkbox = document.querySelector('.darkbox')
            tl
                .from(holder, 8, {
                    scale: 0.8,
                    x: -150,
                    delay: 1.2,
                    autoAlpha: 0,
                    ease: Power3.easeOut
                }, 0
                )
                .from(navbar, 8, {
                    y: -100,
                    delay: 2,
                    autoAlpha: 0,
                    ease: Power2.easeOut
                }, 0)
                .from(arrow, 6, {
                    scale: 0,
                    y: 100,
                    delay: 5,
                    autoAlpha: 0,
                    ease: Power2.easeOut
                }, 0)
                .from(darkbox, 2, {
                    x: 10,
                    y: -60,
                    delay: 0.8,
                    autoAlpha: 0,
                    ease: Power1.easeInOut
                }, 3)
        }
    );
});

let slideIndex;
slideIndex = 1;
showSlides(slideIndex);

let slideIndex2;
slideIndex2 = 1;
showSlides2(slideIndex2);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}
function plusSlides2(n) {
    showSlides2((slideIndex2 += n));
}

function currentSlide2(n) {
    showSlides2((slideIndex2 = n));
}
function showSlides(n) {
    let i;
    let slides;
    slides = document.getElementsByClassName('mySlides');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
}

function showSlides2(n) {
    let i;
    let slides;
    slides = document.getElementsByClassName('mySlides2');
    if (n > slides.length) {
        slideIndex2 = 1;
    }
    if (n < 1) {
        slideIndex2 = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex2 - 1].style.display = 'block';
}