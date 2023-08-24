// Função para executar a busca
function performSearch() {
    // Pegar o valor de busca
    var query = document.getElementById('duvidas-busca').value.toLowerCase();

    // Selecionar todas as seções de FAQ
    var faqSections = document.querySelectorAll('.duvidas__perguntas');

    // Percorrer todas as seções de FAQ
    faqSections.forEach(function (section) {
        var faqItems = section.querySelectorAll('.faq__item');
        var sectionContainsQuery = false; // Indicador para saber se a seção contém a consulta de busca

        // Percorrer todos os itens de FAQ na seção
        faqItems.forEach(function (item) {
            // Pegar o título da pergunta
            var questionTitle = item.querySelector('.faq__pergunta-titulo');
            var pergunta =  item.querySelector('.faq__pergunta');
            var questionText = questionTitle.innerText.toLowerCase();
            var answerDiv = item.querySelector('.faq__resposta');

            // Pegar a div da resposta e concatenar o texto de todos os elementos filhos
            var answerDiv = item.querySelector('.faq__resposta');
            var answerChildren = answerDiv.querySelectorAll('*'); // Seleciona todos os elementos filhos
            var answerText = '';
            answerChildren.forEach(function (child) {
                answerText += child.innerText.toLowerCase() + ' ';
            });

            // Remover destaque anterior
            var originalQuestion = questionTitle.innerHTML.replace(/<span class="highlight">(.+?)<\/span>/g, '$1');
            var originalAnswer = answerDiv.innerHTML.replace(/<span class="highlight">(.+?)<\/span>/g, '$1');

            if (query === '') {
                // Se a consulta de busca estiver vazia, fechar todos os dropdowns e remover todos os destaques
                questionTitle.innerHTML = originalQuestion;
                answerDiv.style.display = 'none';
                answerDiv.innerHTML = originalAnswer;
                item.style.display = '';
                pergunta.classList.remove('faq__pergunta-aberta');
                pergunta.classList.add('faq__pergunta-fechado');
            } else if (questionText.includes(query) || answerText.includes(query)) {
                // Se a consulta de busca for encontrada, exibir o item, abrir o dropdown e destacar as palavras-chave
                sectionContainsQuery = true; // Marcar a seção como contendo a consulta
                item.style.display = '';
                answerDiv.style.display = 'block';

                // Destacar na pergunta
                var highlightedQuestion = originalQuestion.replace(new RegExp(query, 'gi'), function (match) {
                    return '<span class="highlight">' + match + '</span>';
                });
                questionTitle.innerHTML = highlightedQuestion;

                // Destacar na resposta
                answerChildren.forEach(function (child) {
                    var highlightedAnswer = child.innerHTML.replace(new RegExp(query, 'gi'), function (match) {
                        return '<span class="highlight">' + match + '</span>';
                    });
                    child.innerHTML = highlightedAnswer;
                });
                pergunta.classList.remove('faq__pergunta-fechado');
                pergunta.classList.add('faq__pergunta-aberta');
            } else {
                // Se a consulta de busca não for encontrada, ocultar o item e fechar o dropdown
                questionTitle.innerHTML = originalQuestion;
                answerDiv.style.display = 'none';
                answerDiv.innerHTML = originalAnswer;
                item.style.display = 'none';
                pergunta.classList.remove('faq__pergunta-aberta');
                pergunta.classList.add('faq__pergunta-fechado');
            }
        });

        // Se a seção contiver a consulta de busca, exibir a seção inteira; caso contrário, ocultá-la
        if (sectionContainsQuery || query === '') {
            section.style.display = '';
        } else {
            section.style.display = 'none';
        }
    });
}

// Adicionar o evento de click ao botão de busca
document.getElementById('duvidas-botao-busca').addEventListener('click', performSearch);

// Adicionar o evento de keyup ao campo de busca
document.getElementById('duvidas-busca').addEventListener('keyup', function (e) {
    // Se a tecla Enter for pressionada
    if (e.key === 'Enter' || e.keyCode === 13) {
        performSearch();
    }
});

// Adicionar o evento de input ao campo de busca para detectar o cancelamento da pesquisa
document.getElementById('duvidas-busca').addEventListener('input', function (e) {
    // Se o campo de busca estiver vazio (busca cancelada)
    if (e.target.value === '') {
        performSearch(); // Realizar a busca com a consulta vazia (resetar a busca)
    }
});
