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

    // Funções e variáveis relacionadas à terceira tela
    const botaoAvancarTerceiraTela = document.querySelector('.botao__avancar-terceira-tela');

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

    function validarTerceiraTela() {
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

        function checarRadioSelecionadoTerceiraTela(array1, array2) {
            let isSelected = Array.from(array1).some(radio => radio.checked);
            let isSelectedPJ = Array.from(array2).some(radio => radio.checked);
            let textInputsFilled = true;

            const containerInputsTerceiraEscolha = document.querySelector('.carrinho__inputs-terceira-escolha');

            const textInputs = containerInputsTerceiraEscolha.querySelectorAll('.contato-formulario__input[type="text"], .contato-formulario__input[type="number"], .contato-formulario__input[type="tel"], .contato-formulario__input[type="email"]');


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
    }

    botaoAvancarPrimeiraTela.addEventListener('click', () => {
        validarTerceiraTela();
    });

    botaoAvancarSegundaTela.addEventListener('click', () => {
        validarTerceiraTela();
    });

    // ----------------------------------------------

    // Funções e variáveis relacionadas à quarta tela
    const textArea = document.querySelector('.contato-formulario__textarea');
    const botaoAvancarQuartaTela = document.querySelector('.botao__avancar-quarta-tela');

    function checarTextAreaQuartaTela() {
        let textAreaFilled = true;

        // Verificar se está preenchida
        if (textArea.value.trim() === '') {
            textAreaFilled = false;
            textArea.style.background = '';
        } else {
            textArea.style.background = 'var(--cor-primaria-900)';
        }

        // Verificar existência antes de validar
        if (textArea) {
            toggleErrorMessage(textArea, textArea.value.trim() !== '');
        }

        // Atualize a condição para habilitar o botão de avanço
        botaoAvancarQuartaTela.disabled = !textAreaFilled;
    }

    // Adiciona eventos de 'blur' e 'input' para cada elemento de entrada
    textArea.addEventListener('blur', function () {
        this.classList.add('touched');
        const isValid = this.value.trim() !== '';
        toggleErrorMessage(this, isValid);
    });

    textArea.addEventListener('input', function () {
        checarTextAreaQuartaTela();
    });

    checarTextAreaQuartaTela();

    // Funções e variáveis relacionadas à quinta tela
    let filesFullyLoaded = 0;
    const botaoPagarQuintaTela = document.querySelector('.botao__pagar-quinta-tela');
    const radioButtonsComoMarcaUtilizada = document.querySelectorAll('input[name="comoMarcaUtilizada"]');
    const radioButtonsLinguaEstrangeira = document.querySelectorAll('input[name="linguaEstrangeira"]');
    const traducaoInput = document.querySelector('#traducao');
    let fileInput = document.getElementById("fileInput");
    let isImageValid = false;  // Inicialmente definido como false

    function checarRadioSelecionadoQuintaTela() {
        const linguaEstrangeiraSim = document.querySelector('#temLingua').checked;
        const nomeMarcaInput = document.querySelector('#nomeMarca');
        const comoMarcaSelecionada = Array.from(radioButtonsComoMarcaUtilizada).some(radio => radio.checked);
        const linguaEstrangeiraSelecionada = Array.from(radioButtonsLinguaEstrangeira).some(radio => radio.checked);
        const traducaoPreenchida = !linguaEstrangeiraSim || (linguaEstrangeiraSim && traducaoInput.value.trim());

        // Se o usuário selecionar "Sim" para "linguaEstrangeira", torne "traducao" como obrigatório.
        if (linguaEstrangeiraSim) {
            traducaoInput.setAttribute('required', true);
            toggleErrorMessage(traducaoInput, traducaoInput.value.trim() !== '');
        } else {
            traducaoInput.removeAttribute('required');
            toggleErrorMessage(traducaoInput, true); // não exibe erro se não for obrigatório
        }

        // Habilita ou desabilita o botão de pagamento
        botaoPagarQuintaTela.disabled = !(
            nomeMarcaInput.value.trim() &&
            comoMarcaSelecionada &&
            linguaEstrangeiraSelecionada &&
            traducaoPreenchida
        );
    }

    function simulateIndividualUpload(file, loadingBarFile, fileDiv, callback) {
        let progress = 0;
        const percentageElement = loadingBarFile.querySelector(".loading-percentage");
    
        const progressInterval = setInterval(function () {
            progress += 5;
            percentageElement.textContent = `${progress}%`;
    
            if (progress >= 100) {
                clearInterval(progressInterval);
                loadingBarFile.style.display = 'none';
                filesFullyLoaded++;  // Incrementa o contador de arquivos carregados
                
                callback(fileDiv);  // Chama o callback
    
                // Se todos os arquivos foram carregados, chame checarRadioSelecionadoQuintaTela
                if (filesFullyLoaded === allFiles.length) {
                    checarRadioSelecionadoQuintaTela();
                }
            }
        }, 200);
    }

    const fileNameSpan = document.querySelector(".file-name");
    const fileListContainer = document.querySelector(".custom-file-upload__container-arquivos");

    let allFiles = [];  // Armazene todos os arquivos selecionados aqui

    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            // Verifique o tipo MIME do arquivo
            if (file.type !== "image/jpeg") {
                alert("Por favor, selecione uma imagem JPEG válida.");
                fileInput.value = '';  // Limpa o input
                isImageValid = false;  // Define como imagem inválida
                checarRadioSelecionadoQuintaTela();  // Verifica novamente a validação
                return;  // Saia do evento
            }
    
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = function () {
                isImageValid = true;  // Define como imagem válida
            };
        } else {
            isImageValid = false;  // Se nenhum arquivo for selecionado, defina como inválido
            checarRadioSelecionadoQuintaTela();  // Verifica novamente a validação
        }
        
        filesFullyLoaded = 0;  // Redefina o contador de arquivos carregados
    
        // Filtrar arquivos novos que não estão na lista 'allFiles'
        const newFiles = Array.from(fileInput.files).filter(file => !allFiles.some(f => f.name === file.name));
    
        newFiles.forEach(file => {
            const image = new Image();
            image.src = URL.createObjectURL(file);
    
            image.onload = function () {
                const fileDiv = document.createElement("div");
                fileDiv.classList.add('file-upload-item');
    
                const fileNameSpanDiv = document.createElement("div");
                fileNameSpanDiv.classList.add('file-name__container');
    
                const fileNameSpan = document.createElement("span");
                fileNameSpan.textContent = file.name;
                fileNameSpan.classList.add('file-name');
                fileNameSpanDiv.appendChild(fileNameSpan);
    
                const removeBtn = document.createElement("span");
                removeBtn.textContent = "X";
                removeBtn.classList.add('remove-file-btn');
                removeBtn.onclick = function () {
                    allFiles = allFiles.filter(f => f.name !== file.name);
                    fileDiv.remove();
                    if (allFiles.length === 0) {
                        fileNameSpan.textContent = "Adicionar arquivo";
                        fileListContainer.style.display = 'none';
                    }
                }
                fileNameSpanDiv.appendChild(removeBtn);
    
                const loadingBarFile = document.createElement("div");
                loadingBarFile.classList.add("loading-bar-file");
                loadingBarFile.innerHTML = `Carregando... <span class="loading-percentage">0%</span>`;
    
                fileListContainer.style.display = 'flex';
                fileDiv.appendChild(loadingBarFile);
                fileListContainer.appendChild(fileDiv);
    
                // Inicia a simulação de upload para esse arquivo
                simulateIndividualUpload(file, loadingBarFile, fileDiv, function (divElement) {
                    // Esta função será chamada após a simulação do upload ser concluída
                    divElement.appendChild(fileNameSpanDiv);
                });
    
                allFiles.push(...newFiles);
            };
        });
    
        if (allFiles.length > 0) {
            fileNameSpan.textContent = "Adicionar mais arquivos";
        } else {
            fileNameSpan.textContent = "Adicionar arquivo";
        }
    
        fileInput.value = '';  // Limpa a seleção atual do input
    });
    

    // Adicione eventos de escuta aos radio buttons e aos outros campos
    radioButtonsComoMarcaUtilizada.forEach((radio) => {
        radio.addEventListener('change', checarRadioSelecionadoQuintaTela);
    });

    radioButtonsLinguaEstrangeira.forEach((radio) => {
        radio.addEventListener('change', checarRadioSelecionadoQuintaTela);
    });


    document.querySelector('#nomeMarca').addEventListener('input', function () {
        toggleErrorMessage(this, this.value.trim() !== '');
        checarRadioSelecionadoQuintaTela();
    });

    traducaoInput.addEventListener('input', function () {
        toggleErrorMessage(this, this.value.trim() !== '');
        checarRadioSelecionadoQuintaTela();
    });

    // Verificar o estado inicial da quinta tela
    checarRadioSelecionadoQuintaTela();
});