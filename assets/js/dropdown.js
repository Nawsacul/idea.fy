function toggleDropdown(index) {
    var answer = document.getElementById('answer-' + index);
    var pergunta = document.querySelectorAll('.dropdown__pergunta')[index];
    var seta = document.querySelectorAll('.dropdown__pergunta-seta')[index];

    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        seta.classList.remove('rotacionar180');
        pergunta.classList.remove('dropdown__pergunta-aberta');
        pergunta.classList.add('dropdown__pergunta-fechada');
    } else {
        answer.style.display = 'block';
        seta.classList.add('rotacionar180');
        pergunta.classList.add('dropdown__pergunta-aberta');
        pergunta.classList.remove('dropdown__pergunta-fechada');
    }
}
