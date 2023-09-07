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
    const radioButtonsSegundaTela = document.querySelectorAll('.radio__segunda-tela');
    const botaoAvancarSegundaTela = document.querySelector('.botao__avancar-segunda-tela');

    function checarRadioSelecionadoSegundaTela() {
        let isSelected = Array.from(radioButtonsSegundaTela).some(radio => radio.checked);
        botaoAvancarSegundaTela.disabled = !isSelected;
    }

    radioButtonsSegundaTela.forEach((radio) => {
        radio.addEventListener('change', checarRadioSelecionadoSegundaTela);
    });

    // Verificar o estado inicial dos rádios da segunda tela
    checarRadioSelecionadoSegundaTela();

    // ----------------------------------------------

    const botaoAvancarTerceiraTela = document.querySelector('.botao__avancar-terceira-tela');

    // Funções e variáveis relacionadas à terceira tela
    botaoAvancarSegundaTela.addEventListener('click', () => {
        const radioButtonsTerceiraTela = document.querySelectorAll('input[name="dadosPessoais"]');
        const radioButtonsTerceiraTelaPJ = document.querySelectorAll('input[name="porteEmpresa"]');

        const inputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"])');
        
        // Aplicar as máscaras de jQuery aqui, uma vez que os campos devem agora estar presentes
        $('input[name="cpf"]').mask('000.000.000-00');
        $('input[name="cnpj"]').mask('00.000.000/0000-00');
        $('input[name="cep"]').mask('00000-000');
        $('input[name="telefone"]').mask('00 90000-0000');

        // Adiciona eventos de 'blur' e 'input' para cada elemento de entrada
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                this.classList.add('touched');
                const isValid = this.validity.valid;
                toggleErrorMessage(this, isValid);
            });

            input.addEventListener('input', function () {
                checarRadioSelecionadoTerceiraTela(radioButtonsTerceiraTela, radioButtonsTerceiraTelaPJ);
            });
        });

        // Padrões de validação
        const cpfPattern = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
        const cnpjPattern = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const telPattern = /^[0-9]{2} [9]{1}[0-9]{4}-[0-9]{4}$/;
        const cepPattern = /^[0-9]{5}-[0-9]{3}$/;

        // Elementos de entrada
        const nomeCompletoInput = document.querySelector('input[name="nomeCompleto"]');
        const razaoSocialInput = document.querySelector('input[name="razaoSocial"]');
        const enderecoInput = document.querySelector('input[name="endereco"]');
        const cpfInput = document.querySelector('input[name="cpf"]');
        const cnpjInput = document.querySelector('input[name="cnpj"]');
        const emailInput = document.querySelector('input[name="email"]');
        const cepInput = document.querySelector('input[name="cep"]');
        const telInput = document.querySelector('input[name="telefone"]');

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

        function checarRadioSelecionadoTerceiraTela(array1, array2) {
            let isSelected = Array.from(array1).some(radio => radio.checked);
            let isSelectedPJ = Array.from(array2).some(radio => radio.checked);
            let textInputsFilled = true;

            const textInputs = document.querySelectorAll('.contato-formulario__input[type="text"], .contato-formulario__input[type="number"], .contato-formulario__input[type="tel"], .contato-formulario__input[type="email"]');


            // Verificar se todos estão preenchidos
            textInputs.forEach(input => {
                if (input.value.trim() === '') {
                    textInputsFilled = false;
                }
            });

            // Novas variáveis para armazenar a validade dos campos
            let isCpfValid = true;
            let isCnpjValid = true;
            let isEmailValid = true;
            let isCepValid = true;
            let isTelValid = true;

            // Verifique a existência de cada campo antes de validar
            if (nomeCompletoInput) {
                toggleErrorMessage(nomeCompletoInput, nomeCompletoInput.value.trim() !== '');
            }

            if (razaoSocialInput) {
                toggleErrorMessage(razaoSocialInput, razaoSocialInput.value.trim() !== '');
            }

            if (enderecoInput) {
                toggleErrorMessage(enderecoInput, enderecoInput.value.trim() !== '');
            }

            if (cpfInput) {
                isCpfValid = cpfPattern.test(cpfInput.value);
                toggleErrorMessage(cpfInput, isCpfValid);
            }

            if (cnpjInput) {
                isCnpjValid = cnpjPattern.test(cnpjInput.value);
                toggleErrorMessage(cnpjInput, isCnpjValid);
            }

            if (emailInput) {
                isEmailValid = emailPattern.test(emailInput.value);
                toggleErrorMessage(emailInput, isEmailValid);
            }

            if (telInput) {
                isTelValid = telPattern.test(telInput.value);
                toggleErrorMessage(telInput, isTelValid);
            }

            if (cepInput) {
                isCepValid = cepPattern.test(cepInput.value);
                toggleErrorMessage(cepInput, isCepValid);
            }

            // Atualize a condição para habilitar o botão de avanço
            if (array2.length !== 0) {
                botaoAvancarTerceiraTela.disabled = !(isSelected && isSelectedPJ && textInputsFilled && isCpfValid && isCnpjValid && isEmailValid && isTelValid && isCepValid);
            } else {
                botaoAvancarTerceiraTela.disabled = !(isSelected && textInputsFilled && isCpfValid && isCnpjValid && isEmailValid && isTelValid && isCepValid);
            }

            console.log('isSelected:', isSelected, 'isSelectedPJ:', isSelectedPJ, 'textInputsFilled:', textInputsFilled, 'isCpfValid:', isCpfValid, 'isCnpjValid:', isCnpjValid, 'isEmailValid:', isEmailValid, 'isTelValid:', isTelValid, 'isCepValid:', isCepValid);
        }

        if (radioButtonsTerceiraTelaPJ.length != 0) {
            radioButtonsTerceiraTelaPJ.forEach((radio) => {
                radio.addEventListener('change', () => checarRadioSelecionadoTerceiraTela(radioButtonsTerceiraTela, radioButtonsTerceiraTelaPJ));
            });
        }

        radioButtonsTerceiraTela.forEach((radio) => {
            radio.addEventListener('change', () => checarRadioSelecionadoTerceiraTela(radioButtonsTerceiraTela, radioButtonsTerceiraTelaPJ));
        });


        checarRadioSelecionadoTerceiraTela(radioButtonsTerceiraTela, radioButtonsTerceiraTelaPJ);
    });
});