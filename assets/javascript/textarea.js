function autoResize() {
    const textInicio = document.querySelector('.inserir-texto');

    textInicio.style.height = 'auto';
    textInicio.style.height = textInicio.scrollHeight + 'px';
}

const textInicio = document.querySelector('.inserir-texto');
textInicio.addEventListener('input', autoResize);
