document.addEventListener("DOMContentLoaded", function () {
    // Funções e variáveis relacionadas à primeira tela
    const checkboxes = document.querySelectorAll('.termos__checkbox');
    const botaoAvancarPrimeiraTela = document.querySelector('.botao__avancar-primeira-tela');

    function checarTodosOsTermosPrimeiraTela() {
        let allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        botaoAvancarPrimeiraTela.disabled = !allChecked;
    }

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', checarTodosOsTermosPrimeiraTela);
    });

    // Verificar o estado inicial dos checkboxes da primeira tela
    checarTodosOsTermosPrimeiraTela();

    // ----------------------------------------------

    // Funções e variáveis relacionadas à segunda tela
    const radioButtons = document.querySelectorAll('.radio__segunda-tela');
    const botaoAvancarSegundaTela = document.querySelector('.botao__avancar-segunda-tela');

    function checarRadioSelecionadoSegundaTela() {
        let isSelected = Array.from(radioButtons).some(radio => radio.checked);
        botaoAvancarSegundaTela.disabled = !isSelected;
    }

    radioButtons.forEach((radio) => {
        radio.addEventListener('change', checarRadioSelecionadoSegundaTela);
    });

    // Verificar o estado inicial dos rádios da segunda tela
    checarRadioSelecionadoSegundaTela();
});
