const themeButtonDark = document.querySelector('.temas-dark');
const themeButtonWhite = document.querySelector('.temas-white');
const html = document.querySelector('html');

themeButtonDark.addEventListener('click', () => {
  html.classList.add('dark-theme');
  html.classList.remove('light-theme');
});

themeButtonWhite.addEventListener('click', () => {
  html.classList.add('light-theme');
  html.classList.remove('dark-theme');
});