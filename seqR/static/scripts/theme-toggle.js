const toggleButton = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

if (initialTheme) {
    htmlElement.setAttribute('data-theme', initialTheme);
    updateButtonText(initialTheme);
}

toggleButton.addEventListener('click', () => {
    let currentTheme = htmlElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Switch the attribute and save to localStorage
    htmlElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateButtonText(targetTheme);
});

function updateButtonText(currentTheme) {
    const newCta = currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    toggleButton.innerText = newCta;
    toggleButton.setAttribute('aria-label', newCta);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newSystemTheme);
        updateButtonText(newSystemTheme);
    }
});