// Toggle Menu Functionality
function toggleMenu() {
    const menu = document.querySelector('.dropdown-content');
    const hamburger = document.querySelector('.hamburger-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    hamburger.classList.toggle('active');
}

// Close Menu on Outside Click
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
