//togglee menu functionality
const navElement = document.getElementById('navbar');
const menuList = document.querySelector('.navbar-list')
let isMenuopen = false;
function toggleMenu() {
    isMenuopen = !isMenuopen;
    if (isMenuopen) {
        menuList.classList.add('active');
        navElement.classList.add('active');

    }
    else {
        menuList.classList.remove('active');
        navElement.classList.remove('active');
    }
}

//sticky navbar functionality
document.querySelectorAll('.navbar-list li').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); //don't jump the section
        let targetId = this.getAttribute('data-target');
        let targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: "smooth"
            });
        }
    });
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('.header-section');
    const headerHeight = header.offsetHeight; // height of header

    if (window.scrollY > headerHeight) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});


// chapters-list functionality
document.getElementById('list a'.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        let targetId = this.getAttribute('href');
        let targetSection = document.querySelector(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth"
        })
    })
}))
//sticky chapter li 
window.addEventListener('scroll', function () {
    const list = this.document.querySelector('.chapter-section');
    if (this.window.pageYOffset >= 0) {
        list.classList.add('sticky');

    }
    else {
        list.classList.remove('sticky')
    }
})

//adjust highlighted link on section view 
window.addEventListener('scroll', function () {
    let chapterItem = this.document.querySelectorAll('chapter-item');
    let link = this.document.querySelectorAll('list a');
    chapterItem.forEach(sect => {
        let top = this.window.scrollY;
        let offset = sect.offsetTop;
        let height = sect.offsetHeight;
        let id = sect.getAttribute('id');
        if (top >= offset && top < offset + height) {
            link.forEach(links => {
                links.classList.remove('active')
            });
            this.document.querySelectorAll('list a[href*=' + id + ']').forEach(activelink => {
                activelink.classList.add('active');
            });
        };
    });
})
const carousel = document.getElementById('testimonialCards');
const cards = document.querySelectorAll('.card');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

carousel.style.cursor = 'grab';
carousel.style.transition = 'transform 0.5s ease';

// Drag events
carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('mouseleave', endDrag);
carousel.addEventListener('mousemove', drag);

carousel.addEventListener('touchstart', startDrag);
carousel.addEventListener('touchend', endDrag);
carousel.addEventListener('touchmove', drag);

// Start drag
function startDrag(e) {
    isDragging = true;
    carousel.style.cursor = 'grabbing';
    carousel.style.transition = 'none'; // no smooth animation while dragging

    startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    animationID = requestAnimationFrame(animation);
}

// Drag
function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
}

// End drag
function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.cursor = 'grab';
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;
    const cardWidth = cards[0].offsetWidth;

    if (movedBy < -100 && currentIndex < cards.length - 1) {
        currentIndex++;
    } else if (movedBy > 100 && currentIndex > 0) {
        currentIndex--;
    }

    carousel.style.transition = 'transform 0.5s ease';
    setPositionByIndex();
}

// Follow drag
function animation() {
    if (isDragging) {
        setCarouselPosition();
        requestAnimationFrame(animation);
    }
}

function setCarouselPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

// Snap card to index
function setPositionByIndex() {
    const cardWidth = cards[0].offsetWidth;
    currentTranslate = currentIndex * -cardWidth;
    prevTranslate = currentTranslate;
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

// Auto play once every 2 seconds, stop at last card
function autoPlayStep() {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        setPositionByIndex();
        setTimeout(autoPlayStep, 2000); // wait 2s before moving again
    }
}

// start autoplay (not loop, just step-by-step until last card)
setTimeout(autoPlayStep, 2000);
