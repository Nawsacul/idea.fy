

document.addEventListener('DOMContentLoaded', () => {
    // Função para trocar de tela
    function trocaTela(telaAtual, telaNova) {
        document.querySelector(`.${telaAtual}`).style.display = 'none';
        document.querySelector(`.${telaNova}`).style.display = 'flex';
    }

    const barraDeProgresso = document.querySelectorAll('.carrinho__barra-individual');
    const botaoAvancarPrimeiraTela = document.querySelector('.botao__avancar-primeira-tela');
    const botaoVoltarPrimeiraTela = document.querySelector('.botao__voltar-primeira-tela');


    const barraProgresso = document.querySelector('.carrinho__barra-progresso');
    const textoSegundaEscolha = document.querySelector('.carrinho__segunda-escolha-texto');
    const secaoPrimeiraEscolha = document.querySelector('.carrinho__primeira-escolha');

    // Event listener para o botão "Avançar" da primeira tela
    botaoAvancarPrimeiraTela.addEventListener('click', function () {
        // Verifica se todas as caixas de seleção requeridas estão marcadas
        // ...
        // Move a barra de progresso para abaixo do texto da segunda escolha
        textoSegundaEscolha.parentNode.insertBefore(barraProgresso, textoSegundaEscolha);

        // Troca para a segunda tela
        trocaTela('carrinho__primeira-escolha', 'carrinho__segunda-escolha');
        barraDeProgresso[1].classList.add('ativo');
        if (barraDeProgresso[1].classList.contains('removido')) {
            barraDeProgresso[1].classList.remove('removido');
        }

        window.scrollTo({ top: 0, behavior: 'auto' });
    });

    // Event listener para o botão "Voltar" da Segunda tela
    botaoVoltarPrimeiraTela.addEventListener('click', function () {

        // Move a barra de progresso de volta para a posição original
        secaoPrimeiraEscolha.parentNode.insertBefore(barraProgresso, secaoPrimeiraEscolha);

        // Troca para a primeira tela
        trocaTela('carrinho__segunda-escolha', 'carrinho__primeira-escolha');
        barraDeProgresso[1].classList.add('removido');
        window.scrollTo({ top: 0, behavior: 'auto' });
    });
});