document.addEventListener('DOMContentLoaded', function () {
    const botoes = document.querySelectorAll('.plan__botao');

    botoes.forEach((botao) => {
        botao.addEventListener('click', function (e) {
            const selectedPlan = e.target.getAttribute('data-plano');
            localStorage.setItem('planoSelecionado', selectedPlan);  // Salvar o plano selecionado no localStorage

            // Salva a página de origem no localStorage
            localStorage.setItem('paginaOrigem', window.location.pathname);

            window.location.href = 'carrinho.html';  // Redirecionar para a página do carrinho
        });
    });
});