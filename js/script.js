
const imgsArr = [
    'img/01.jpg',
    'img/02.jpg',
    'img/03.jpg',
    'img/04.jpg',
    'img/05.jpg'
];

const sliderWrapper = document.querySelector('.slider-wrapper .imgs');
const dotsWrapper = document.querySelector('.dots-wrapper');

imgsArr.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'slide';

    const dot = document.createElement('span');
    dot.className = 'dot';

    dot.addEventListener('click', () => {
        index = i;
        prepareCurrentSlide(index);
    });

    if (localStorage.getItem('active_slide')) {
        if (localStorage.getItem('active_slide') == i) {
            div.classList.add('active');
            dot.classList.add('active');
        }
    } else {
        if (i === 0) {
            div.classList.add('active');
            dot.classList.add('active');
        }
    }

    const img = document.createElement('img');
    img.src = src;

    div.appendChild(img);
    sliderWrapper.appendChild(div);

    dotsWrapper.appendChild(dot);
})

const prev = document.getElementById('btn-prev'),
    next = document.getElementById('btn-next'),
    slides = document.querySelectorAll('.slide'),
    dots = document.querySelectorAll('.dot');


let index = localStorage.getItem('active_slide')
    ? localStorage.getItem('active_slide')
    : 0;

const activeSlide = n => {
    for (slide of slides) {
        slide.classList.remove('active');
    }

    slides[n].classList.add('active');
}

const activeDot = n => {
    for (dot of dots) {
        dot.classList.remove('active');
    }
    dots[n].classList.add('active');
}

const prepareCurrentSlide = () => {
    activeSlide(index);
    activeDot(index);
    localStorage.setItem('active_slide', index);
}

const prevSlide = () => {
    if(index === 0) {
        index = slides.length - 1;
        prepareCurrentSlide(index);
    } else {
        prepareCurrentSlide(--index);
    }
}

const nextSlide = () => {
    if (index === slides.length - 1) {
        index = 0
        prepareCurrentSlide(index);
    } else {
        prepareCurrentSlide(++index);
    }
}


prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case "ArrowLeft":
            prevSlide();
            break;
        case "ArrowRight":
            nextSlide();
            break;
        case "Escape":
            window.close();
            break;
        default:
            break;
    }
})

let slideInterval = setInterval(() => { nextSlide() }, 2000);

let playing = true;

const actionButton = document.getElementById('toggle');

if (localStorage.getItem('playing') && localStorage.getItem('playing') === 'pause') {
    actionButton.textContent = 'play';
    clearInterval(slideInterval);
}

function pauseSlideshow() {
    localStorage.setItem('playing', 'pause');
    actionButton.textContent = 'play';
    playing = false;
    clearInterval(slideInterval);
}


function playSlideshow() {
    localStorage.setItem('playing', 'play');
    actionButton.textContent = 'pause';
    playing = true;
    slideInterval = setInterval(() => { nextSlide() }, 2000);
}


actionButton.onclick = function() {
    if(playing) {
        pauseSlideshow();
    } else {
        playSlideshow();
    }
};
