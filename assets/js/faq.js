function toggleDropdown(index) {
    var answer = document.getElementById('answer-' + index);
    var pergunta = document.querySelectorAll('.faq__pergunta')[index];
    var seta = document.querySelectorAll('.faq__pergunta-seta')[index];

    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        seta.classList.remove('rotacionar180');
        pergunta.classList.remove('faq__pergunta-aberta');
        pergunta.classList.add('faq__pergunta-fechada');
    } else {
        answer.style.display = 'block';
        seta.classList.add('rotacionar180');
        pergunta.classList.add('faq__pergunta-aberta');
        pergunta.classList.remove('faq__pergunta-fechada');
    }
}
