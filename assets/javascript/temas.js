const themeButtonDark = document.querySelector('.temas-dark');
const themeButtonWhite = document.querySelector('.temas-white');
const html = document.querySelector('html');

// verifica se há um tema salvo no localStorage
if (localStorage.getItem('theme')) {
  html.classList.add(localStorage.getItem('theme'));
}

themeButtonDark.addEventListener('click', () => {
  html.classList.add('dark-theme');
  html.classList.remove('light-theme');
  localStorage.setItem('theme', 'dark-theme');
});

themeButtonWhite.addEventListener('click', () => {
  html.classList.add('light-theme');
  html.classList.remove('dark-theme');
  localStorage.setItem('theme', 'light-theme');
});
