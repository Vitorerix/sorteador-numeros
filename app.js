function sortear(){
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

    if (isNaN(quantidade) || isNaN(de) || isNaN(ate)) {
        alert('Por favor, preencha todos os campos com números válidos.');
        return;
    }

    if (!correcao(de, ate)) {
        return;
    }

    if (quantidade > (ate - de + 1)) {
        alert(`A quantidade de números a sortear (${quantidade}) é maior do que o intervalo de números disponíveis (${ate - de + 1}). Por favor, ajuste os valores.`);
        return;
    }

    let sorteados = [];
    let numero;

    for (let i = 0; i < quantidade; i++) {
        numero = obterNumeroAleatorio(de, ate);
        while (sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(de, ate);
        }
        sorteados.push(numero);
    }
    
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados: ${sorteados} </label>`;
    
    alterarStatusBotao('sortear');
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterarStatusBotao(contexto) {
    let botaoReiniciar = document.getElementById('btn-reiniciar');
    let botaoSortear = document.getElementById('btn-sortear');

    if (contexto === 'sortear') {
        botaoReiniciar.classList.remove('container__botao-desabilitado');
        botaoReiniciar.classList.add('container__botao');
        
        botaoSortear.classList.remove('container__botao');
        botaoSortear.classList.add('container__botao-desabilitado');
    } else if (contexto === 'reiniciar') {
        botaoReiniciar.classList.remove('container__botao');
        botaoReiniciar.classList.add('container__botao-desabilitado');

        botaoSortear.classList.remove('container__botao-desabilitado');
        botaoSortear.classList.add('container__botao');
    }
}

function reiniciar() {
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>';

    alterarStatusBotao('reiniciar');
}

function correcao(de, ate) {
    if (de >= ate) {
        alert(`Campo "Do número" (${de}) deve ser inferior ao campo "Até o número". Verifique`);
        return false;
    }
    return true;
}

window.onload = function() {
    reiniciar();
};
