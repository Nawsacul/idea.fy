document.addEventListener('DOMContentLoaded', function () {
    const botoes = document.querySelectorAll('.plan__botao');

    botoes.forEach((botao) => {
        botao.addEventListener('click', function (e) {
            const selectedPlan = e.target.getAttribute('data-plano');
            localStorage.setItem('planoSelecionado', selectedPlan);  // Salvar o plano selecionado no localStorage

            // Salva a página de origem no localStorage se for diferente do carrinho
            if (!window.location.pathname.includes('carrinho.html') === true) {
                localStorage.setItem('paginaOrigem', window.location.pathname);
            }

            window.location.href = 'carrinho.html';  // Redirecionar para a página do carrinho
        });
    });
});