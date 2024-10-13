function toggleMenu() {
const menu = document.querySelector('.dropdown-content');
const hamburger = document.querySelector('.hamburger-menu');
menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
hamburger.classList.toggle('active');
}

function closeMenu(event) {
const menu = document.querySelector('.dropdown-content');
const hamburger = document.querySelector('.hamburger-menu');
const isClickInsideMenu = menu.contains(event.target) || hamburger.contains(event.target);
if (!isClickInsideMenu) {
menu.style.display = 'none';
hamburger.classList.remove('active');
}
}
document.addEventListener('click', closeMenu);

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    
    const logo = document.getElementById('logo');
    if (document.body.classList.contains('dark-mode')) {
        logo.src = '../images/logo-dark.png';
    } else {
        logo.src = '../images/logo-light.png';
    }

    // Save the theme preference to localStorage
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}


// Optional: Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme === 'dark' ? 'dark-mode' : 'light-mode');
        const logo = document.getElementById('logo');
        logo.src = savedTheme === 'dark' ? '../images/logo-dark.png' : '../images/logo-light.png';
    }
});












let currentPosition = 0;
const sliderWrapper = document.getElementById('sliderWrapper');
const standardCardWidth = 300 + 8; // 300px width + 4px margin on both sides
const halfCardWidth = 150 + 8; // Half the width + 4px margin on both sides
let isMoving = false;
let autoSlideInterval;
let startX, endX;

// Update slider width based on card types
function updateSliderWidth() {
    const cards = document.querySelectorAll('.cardss, .emptyhalfcard');
    let totalWidth = 0;
    cards.forEach(card => {
        if (card.classList.contains('emptyhalfcard')) {
            totalWidth += halfCardWidth;
        } else {
            totalWidth += standardCardWidth;
        }
    });
    sliderWrapper.style.width = `${totalWidth}px`;
}

// Generalized function to move the slider
function moveSlider(direction) {
    if (isMoving) return;
    isMoving = true;

    // Determine max move left
    const maxVisibleCards = 3; // Show at most 3 cards at a time
    const totalCards = document.querySelectorAll('.cardss, .emptyhalfcard').length;
    const maxMoveLeft = -(totalCards - maxVisibleCards) * standardCardWidth; // Adjust as needed

    // Move based on direction
    if (direction === 'right') {
        if (currentPosition > maxMoveLeft) {
            currentPosition -= (standardCardWidth); // Use appropriate width
        } else {
            currentPosition = 0; // Bounce back to the start
        }
    } else if (direction === 'left') {
        if (currentPosition < 0) {
            currentPosition += (standardCardWidth); // Use appropriate width
        } else {
            currentPosition = maxMoveLeft; // Bounce back to the end
        }
    }

    sliderWrapper.style.transform = `translateX(${currentPosition}px)`;

    setTimeout(() => {
        isMoving = false;
    }, 500); // 1000 is 1 second (CSS transition time)
}

// Move slider to the right
function moveRight() {
    moveSlider('right');
}

// Move slider to the left
function moveLeft() {
    moveSlider('left');
}

// Start the automatic sliding
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveRight();
    }, 2000); // Interval for auto-slide
}

// Stop the automatic sliding
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Touch events
sliderWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

sliderWrapper.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        moveRight();
    } else if (endX - startX > 50) {
        moveLeft();
    }
});

// Function to adjust cards based on screen width
function adjustCards() {
    const screenWidth = window.innerWidth;

    // Handle cardssDEL based on screen size
    if (screenWidth > 1000) {
        // Remove cardssDEL cards
        document.querySelectorAll('.cardssDEL').forEach(card => card.remove());
        // Ensure emptyhalfcard is visible
        if (!document.querySelector('.emptyhalfcard')) {
            const emptyHalfCard = document.createElement('div');
            emptyHalfCard.className = 'cardss emptyhalfcard';
            sliderWrapper.insertBefore(emptyHalfCard, sliderWrapper.firstChild); // Insert at the beginning
        }
    } else {
        // Reinsert cardssDEL if needed
        const existingCards = Array.from(sliderWrapper.children);
        if (!existingCards.some(card => card.classList.contains('cardssDEL'))) {
            const numEmptyCards = 2; // Number of cards to reinsert
            const emptyCards = document.createDocumentFragment();
            for (let i = 0; i < numEmptyCards; i++) {
                const emptyCard = document.createElement('div');
                emptyCard.className = 'cardss cardssDEL';
                emptyCards.appendChild(emptyCard);
            }
            sliderWrapper.appendChild(emptyCards);
        }

        // Remove emptyhalfcard if screen is smaller
        document.querySelectorAll('.emptyhalfcard').forEach(card => card.remove());
    }

    // Update slider width after adjustments
    updateSliderWidth();
}

// Initial setup
updateSliderWidth();
startAutoSlide();

// Adjust cards when the page loads and on window resize
adjustCards();
window.addEventListener('resize', adjustCards);



