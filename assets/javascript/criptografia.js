document.querySelector(".criptografar").addEventListener("click", criptografarTexto);
document.querySelector(".descriptografar").addEventListener("click", descriptografarTexto);

let erroExibido = false;

const textarea = document.querySelector(".inserir-texto");

textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
});

function mostrarElemento() {
    const aside = document.querySelector("aside");
    
    aside.innerHTML = '<div class="texto-espera"><img class="procurando" src="assets/image/espera/High quality products 1 1@2x.png" alt="Imagem de Busca"><div class="mensagem-texto"><h2 class="esperando-mensagem">Nenhuma mensagem encontrada</h2><p class="digite-texto"> Digite um texto que você deseja criptografar ou descriptografar</p></div></div>'
}

function voltaTamanho() {
    document.querySelector('.inserir-texto').style.height = 'initial';
}
function mostrarTextoEspera() {
    document.querySelector(".texto-espera").style.display = 'flex';
}
  

function copiarTexto() {
    const textoFinal = document.querySelector('.textoFinal').textContent;
    const aside = document.querySelector('aside');

    navigator.clipboard.writeText(textoFinal)
        .then(() => {
            document.querySelector('.textoFinal').value = '';

            console.log('Texto copiado para a área de transferência');
            const botao = document.querySelector('.copia');
            botao.innerHTML = 'Copiado';
            botao.classList.add('copiado');

            aside.innerHTML = '<p class="textoCopiado">Texto copiado com sucesso!</p>';
            aside.classList.remove("aside-texto-final");
            aside.classList.add("aside");
            
            setTimeout(() => {
                botao.innerHTML = 'Copiar';
                botao.classList.remove('copiado');
                mostrarElemento();
            }, 2000);
        })
        .catch(err => console.error('Erro ao copiar texto: ', err));

    document.querySelector('.textoFinal').textContent = '';
    voltaTamanho();
    mostrarTextoEspera();
}


function criptografarTexto() {
    const textoEntrada = document.querySelector(".inserir-texto").value;

    const textoEntradaNormalizado = textoEntrada.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    if (textoEntrada === "") {
        const meuTextarea = document.querySelector(".inserir-texto");
        meuTextarea.placeholder = "Por favor, crie um texto para primeiro para criptografar.";
        meuTextarea.classList.add("texto-vazio");

        const btnCriptografar = document.querySelector(".criptografar");
        btnCriptografar.classList.add('nao-enviado');

        setTimeout(() => {
            btnCriptografar.classList.remove('nao-enviado');
            meuTextarea.classList.remove("texto-vazio");
            meuTextarea.placeholder = "Digite seu texto aqui.";
        }, 1000);
        return;

    }


    const textoCriptografado = criptografar(textoEntradaNormalizado);

    const aside = document.querySelector("aside");
    aside.classList.remove("aside");
    aside.classList.add("aside-texto-final");

    aside.innerHTML = '<p class="textoFinal">'
        + textoCriptografado + '</p>' + '<button class="copia">Copiar</button>'

    const botaoCopia = document.querySelector('.copia');
    botaoCopia.addEventListener('click', copiarTexto);

    const textarea = document.querySelector('.textoFinal');
    textarea.readOnly = true;

    document.querySelector(".inserir-texto").value = "";
    voltaTamanho();
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


    if (textoCriptografado === "") {
        const meuTextarea = document.querySelector(".inserir-texto");
        meuTextarea.placeholder = "Por favor, crie um texto criptografado primeiro.";
        meuTextarea.classList.add("texto-vazio");

        const btnDescriptografar = document.querySelector(".descriptografar");
        btnDescriptografar.classList.add('nao-enviado');

        setTimeout(() => {
            btnDescriptografar.classList.remove('nao-enviado');
            meuTextarea.classList.remove("texto-vazio");
            meuTextarea.placeholder = "Digite seu texto aqui.";
        }, 1000);
        return;
    }

    const textoDescriptografado = descriptografar(textoCriptografadoNormalizado);

    const aside = document.querySelector("aside");
    aside.classList.remove("aside");
    aside.classList.add("aside-texto-final");

    aside.innerHTML = '<p class="textoFinal">'
        + textoDescriptografado + '</p>' + '<button class="copia">Copiar</button>'

    const botaoCopia = document.querySelector('.copia');
    botaoCopia.addEventListener('click', copiarTexto);

    const textarea = document.querySelector('.textoFinal');
    textarea.readOnly = true;

    document.querySelector(".inserir-texto").value = "";
    voltaTamanho();
}

function descriptografar(textoCriptografado) {
    return textoCriptografado
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}
