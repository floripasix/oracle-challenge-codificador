document.querySelector(".criptografar").addEventListener("click", criptografarTexto);
document.querySelector(".descriptografar").addEventListener("click", descriptografarTexto);

function esconderElemento(e) {
    if (document.querySelector('.texto-espera').style.display === 'none') {
        e.preventDefault();
    } else {
        document.querySelector('.texto-espera').style.display = 'none';
    }
}

function copiarTexto() {
    const textoFinal = document.querySelector('.textoFinal');
    textoFinal.select();
    document.execCommand('copy');
}

function criptografarTexto() {
    const textoEntrada = document.querySelector(".inserir-texto").value.toLowerCase();
    
    const hasAcento = /[áàâãéèêíïóôõöúç]/.test(textoEntrada);
    if (hasAcento) {
        alert("O texto não pode conter acentos.");
        return;
    }
    if (textoEntrada === "") {
        alert("Por favor, crie um texto criptografado primeiro.");
        return;
    }

    const textoCriptografado = criptografar(textoEntrada);

    const aside = document.querySelector("aside");
    aside.classList.remove("aside");
    aside.classList.add("aside-texto-final");

    aside.innerHTML = '<p class="textoFinal">'
        + textoCriptografado + '</p>' + '<button class="copia">Copiar</button>'

    const botaoCopia = document.querySelector('.copia');
    botaoCopia.addEventListener('click', copiarTexto);

    const textarea = document.querySelector('.textoFinal');
    textarea.readOnly = true;
}

function criptografar(texto) {
    return texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
}

function descriptografarTexto() {
    const textoCriptografado = document.querySelector(".inserir-texto").value.toLowerCase();
    if (!textoCriptografado) {
        alert("Por favor, crie um texto criptografado primeiro.");
        return;
    }
    const textoDescriptografado = descriptografar(textoCriptografado);

    const aside = document.querySelector("aside");
    aside.classList.remove("aside");
    aside.classList.add("aside-texto-final");

    aside.innerHTML = '<p class="textoFinal">'
        + textoDescriptografado + '</p>' + '<button class="copia">Copiar</button>'

    const botaoCopia = document.querySelector('.copia');
    botaoCopia.addEventListener('click', copiarTexto);

    const textarea = document.querySelector('.textoFinal');
    textarea.readOnly = true;
}

function descriptografar(textoCriptografado) {
    return textoCriptografado
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}
