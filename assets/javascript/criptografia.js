const campoMensagem = document.querySelector('.campo-mensagem');
const inserirTexto = document.querySelector(".inserir-texto");
const campoMensagemTextoFinal = document.querySelector(".campo-mensagem-texto-final");
const textoFinal = document.querySelector(".textoFinal");
const botaoCopia = document.querySelector('.copia');

let erroExibido = false;

document.querySelector(".criptografar").addEventListener("click", criptografarTexto);
document.querySelector(".descriptografar").addEventListener("click", descriptografarTexto);

inserirTexto.addEventListener("input", () => {
    inserirTexto.style.height = "auto";
    inserirTexto.style.height = `${inserirTexto.scrollHeight}px`;
});

function mostrarElemento() {
    campoMensagem.innerHTML = '<div class="texto-espera"><img class="procurando" src="assets/img/espera/meninaesperando.png" alt="Imagem de Busca"><div class="mensagem-texto"><h2 class="esperando-mensagem">Nenhuma mensagem encontrada</h2><p class="digite-texto"> Digite um texto que você deseja criptografar ou descriptografar</p></div></div>'
}

function voltaTamanhoMain() {
    document.querySelector('.inserir-texto').style.height = 'initial';
}



function mostrarTextoEspera() {
    document.querySelector(".texto-espera").style.display = 'flex';
}


function copiarTexto() {
    const textoFinal = document.querySelector('.textoFinal').textContent;
    const botaoCopia = document.querySelector('.copia');

    navigator.clipboard.writeText(textoFinal)
        .then(() => {
            botaoCopia.innerHTML = 'Copiado';
            botaoCopia.classList.add('copiado');

            campoMensagem.innerHTML = '<p class="textoCopiado">Texto copiado com sucesso!</p>';
            campoMensagem.classList.remove("campo-mensagem-texto-final");
            campoMensagem.classList.add("campo-mensagem");

            setTimeout(() => {
                botaoCopia.innerHTML = 'Copiar';
                botaoCopia.classList.remove('copiado');
                mostrarElemento();
            }, 2000);
        })
        .catch(err => console.error('Erro ao copiar texto: ', err));

        inserirTexto
    
    voltaTamanhoMain();
    mostrarTextoEspera();
}


function criptografarTexto() {
    const textoEntrada = document.querySelector(".inserir-texto").value;

    const textoEntradaNormalizado = textoEntrada.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const regex = /^[a-zA-Z0-9\s.,;:'"()!?]*$/;
    if (!regex.test(textoEntrada)) {
        campoMensagem.innerHTML = '<p class="textoRegra">O texto não pode conter caracteres especiais nem letras acentuadas!</p>';

        setTimeout(() => {
            mostrarElemento();
        }, 2000)
        return;
    }

    if (textoEntrada === "") {
        inserirTexto.placeholder = "Por favor, crie um texto para primeiro criptografar.";
        inserirTexto.classList.add("texto-vazio");

        const btnCriptografar = document.querySelector(".criptografar");
        btnCriptografar.classList.add('nao-enviado');

        setTimeout(() => {
            btnCriptografar.classList.remove('nao-enviado');
            inserirTexto.classList.remove("texto-vazio");
            inserirTexto.placeholder = "Digite seu texto aqui.";
        }, 1000);
        return;

    }

    const textoCriptografado = criptografar(textoEntradaNormalizado);

    campoMensagem.classList.remove("campo-mensagem");
    campoMensagem.classList.add("campo-mensagem-texto-final");

    campoMensagem.innerHTML = '<p class="textoFinal">'
        + textoCriptografado + '</p>' + '<button class="copia">Copiar</button>'

    const botaoCopia = document.querySelector('.copia');
    botaoCopia.addEventListener('click', copiarTexto);

    document.querySelector(".inserir-texto").value = "";
    inserirTexto.value = "";
    voltaTamanhoMain();
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
    const textoCriptografado = document.querySelector(".inserir-texto").value;

    const textoCriptografadoNormalizado = textoCriptografado.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const regex = /^[a-zA-Z0-9\s.,;:'"()!?]*$/;
    if (!regex.test(textoCriptografado)) {
        campoMensagem.innerHTML = '<p class="textoRegra">O texto não pode conter caracteres especiais nem letras acentuadas!</p>';

        setTimeout(() => {
            mostrarElemento();
        }, 2000)
        return;
    }

    if (textoCriptografado === "") {
        inserirTexto.placeholder = "Por favor, crie um texto criptografado primeiro.";
        inserirTexto.classList.add("texto-vazio");

        const btnDescriptografar = document.querySelector(".descriptografar");
        btnDescriptografar.classList.add('nao-enviado');

        setTimeout(() => {
            btnDescriptografar.classList.remove('nao-enviado');
            inserirTexto.classList.remove("texto-vazio");
            inserirTexto.placeholder = "Digite seu texto aqui.";
        }, 1000);
        return;
    }

    const textoDescriptografado = descriptografar(textoCriptografadoNormalizado);

    campoMensagem.classList.remove("campo-mensagem");
    campoMensagem.classList.add("campo-mensagem-texto-final");

    campoMensagem.innerHTML = '<p class="textoFinal">'
        + textoDescriptografado + '</p>' + '<button class="copia">Copiar</button>'

    const botaoCopia = document.querySelector('.copia');
    botaoCopia.addEventListener('click', copiarTexto);

    document.querySelector(".inserir-texto").value = "";
    inserirTexto.value = "";
    voltaTamanhoMain();
}

function descriptografar(textoCriptografado) {
    return textoCriptografado
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}
