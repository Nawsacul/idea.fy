document.addEventListener("DOMContentLoaded", function () {
    // Funções e variáveis relacionadas à página de contato
    const botaoEnviar = document.querySelector('.contato-formulario__botao');
    const formularioContato = document.querySelector('#contact-form');
    const nomeInput = document.querySelector('input[name="nome"]');
    const emailInput = document.querySelector('input[name="email"]');
    const telInput = document.querySelector('input[name="telefone"]');
    const mensagemTextarea = document.querySelector('textarea[name="mensagem"]');
    const inputsAndTextarea = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), textarea');

    // Padrões de validação
    const nomePattern = /^[a-zA-Z\s]+$/; // Permite letras e espaços
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const telPattern = /^[0-9]{2} [9]{1}[0-9]{4}-[0-9]{4}$/;

    function toggleErrorMessage(inputElement, isValid) {
        const errorMessageElement = inputElement.nextElementSibling;
        if (inputElement.classList.contains('touched')) {
            if (isValid) {
                inputElement.setCustomValidity("");
                errorMessageElement.style.display = 'none'; // Oculta a mensagem de erro
            } else {
                inputElement.setCustomValidity("Campo inválido");
                errorMessageElement.style.display = 'block'; // Mostra a mensagem de erro
            }
        }
    }

    // Adiciona eventos de 'blur' e 'input' para cada elemento de entrada e textarea
    inputsAndTextarea.forEach(element => {
        element.addEventListener('blur', function () {
            this.classList.add('touched');
            const isValid = this.validity.valid;
            toggleErrorMessage(this, isValid);
            checarInputContato();
        });

        element.addEventListener('input', function () {
            const isValid = this.validity.valid;
            toggleErrorMessage(this, isValid);
            checarInputContato();
        });
    });

    function checarInputContato() {
        let isNomeValid = nomePattern.test(nomeInput.value.trim());
        let isEmailValid = emailPattern.test(emailInput.value);
        let isTelValid = telPattern.test(telInput.value);
        let isMensagemValid = mensagemTextarea.value.trim() !== '';

        // Lógica para verificar a textarea
        if (isMensagemValid) {
            mensagemTextarea.style.background = 'var(--cor-primaria-900)';
        } else {
            mensagemTextarea.style.background = '';
        }

        toggleErrorMessage(nomeInput, isNomeValid);
        toggleErrorMessage(emailInput, isEmailValid);
        toggleErrorMessage(telInput, isTelValid);
        toggleErrorMessage(mensagemTextarea, isMensagemValid);

        //Habilitar o botão de enviar
        botaoEnviar.disabled = !(isNomeValid && isEmailValid && isTelValid && isMensagemValid);
    }

    // Aplicar as máscaras de jQuery
    $('input[name="telefone"]').mask('00 90000-0000');

    checarInputContato();
});
