document.addEventListener('DOMContentLoaded', () => {
    const planosAvulsos = ['acompanhamento', 'pesquisa', 'oposicao', 'manifestacao', 'recurso', 'notificacaoContranotificacao'];
    const planoSelecionado = localStorage.getItem('planoSelecionado');

    const textoModificavel = document.querySelector('.carrinho-pago__texto-modificavel');

    // Configurar a barra de progresso a depender do plano
    function configuraBarraProgresso(plano) {
        const barraProgressoItems = document.querySelectorAll('.carrinho__barra-item');
        if (planosAvulsos.includes(plano)) {
            barraProgressoItems[1].style.display = 'none';
            barraProgressoItems[2].style.display = 'none';
            barraProgressoItems[3].style.display = 'none';
            textoModificavel.innerHTML = 'seu serviço avulso!';
            barraProgressoItems[5].classList.add('carrinho__barra-item--ativo');
        } else {
            // Se for um plano principal, mostra todas as etapas.
            barraProgressoItems.forEach(item => {
                item.style.display = 'block';
            });
            textoModificavel.innerHTML = 'processo do seu registro de marca!';
            barraProgressoItems[5].classList.add('carrinho__barra-item--ativo');
        }
    }

    configuraBarraProgresso(planoSelecionado);
});
