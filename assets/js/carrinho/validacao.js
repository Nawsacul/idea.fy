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

        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                this.classList.add('touched');
            });
        });

        // Adiciona o padrão de validação para o campo de CPF, se existir
        const cpfInput = document.querySelector('input[name="cpf"]');
        if (cpfInput) {
            cpfInput.setAttribute('pattern', '^[0-9]{3}.[0-9]{3}\.[0-9]{3}-[0-9]{2}$'); // Adicione o padrão de validação de CPF aqui
        }

        // Adiciona o padrão de validação para o campo de CNPJ, se existir
        const cnpjInput = document.querySelector('input[name="cnpj"]');
        if (cnpjInput) {
            cnpjInput.setAttribute('pattern', '^[0-9]{2}\\.[0-9]{3}\\.[0-9]{3}/[0-9]{4}-[0-9]{2}$'); // Adicione o padrão de validação de CNPJ aqui
        }

        // Adiciona o padrão de validação para o campo de e-mail, se existir
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.setAttribute('pattern', '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
        }

        function checarRadioSelecionadoTerceiraTela(array1, array2) {
            let isSelected = Array.from(array1).some(radio => radio.checked);
            let textInputsFilled = true;

            const textInputs = document.querySelectorAll('.contato-formulario__input[type="text"], .contato-formulario__input[type="number"], .contato-formulario__input[type="tel"], .contato-formulario__input[type="email"]');


            // Verificar se todos estão preenchidos
            textInputs.forEach(input => {
                if (input.value.trim() === '') {
                    textInputsFilled = false;
                }
            });

            if (array2.length !== 0) {
                let isSelectedPJ = Array.from(array2).some(radio => radio.checked);
                botaoAvancarTerceiraTela.disabled = !(isSelected && isSelectedPJ && textInputsFilled);
            } else {
                botaoAvancarTerceiraTela.disabled = !(isSelected && textInputsFilled);
            }
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
