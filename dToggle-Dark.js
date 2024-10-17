// Toggle Dark Mode and Update Logo
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


// Apply Saved Theme on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme === 'dark' ? 'dark-mode' : 'light-mode');
        const logo = document.getElementById('logo');
        logo.src = savedTheme === 'dark' ? '../images/logo-dark.png' : '../images/logo-light.png';
    }
});
