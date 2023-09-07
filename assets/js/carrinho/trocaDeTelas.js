// Adiciona um evento que será disparado quando todo o conteúdo da página for carregado.
document.addEventListener('DOMContentLoaded', () => {
    if (window.planosAvulsos.includes(localStorage.getItem('planoSelecionado'))) {
        // Oculte a segunda tela usando display: none
        // Desative os campos de formulário nas seções que serão ocultadas
        const camposSegundaTela = document.querySelectorAll('.carrinho__secao--segunda-escolha input, .carrinho__secao--segunda-escolha select, .carrinho__secao--segunda-escolha textarea');
        camposSegundaTela.forEach(campo => campo.disabled = true);

        const camposQuartaTela = document.querySelectorAll('.carrinho__secao--quarta-escolha input, .carrinho__secao--quarta-escolha select, .carrinho__secao--quarta-escolha textarea');
        camposQuartaTela.forEach(campo => campo.disabled = true);

        const camposQuintaTela = document.querySelectorAll('.carrinho__secao--quinta-escolha input, .carrinho__secao--quinta-escolha select, .carrinho__secao--quinta-escolha textarea');
        camposQuintaTela.forEach(campo => campo.disabled = true);
    }

    const ESPECIFICAR = {
        mostrar: 'mostrar',
        esconder: 'esconder',
        verdadeiro: 'true',
        falso: 'false'
    };

    //Funçao para transição suave de elementos (telas e h2 da segunda tela)
    function atualizaAtributos(elemento, acao) {
        elemento.classList.remove(ESPECIFICAR[acao === 'mostrar' ? 'esconder' : 'mostrar']);
        elemento.classList.add(ESPECIFICAR[acao]);
        elemento.setAttribute('aria-hidden', ESPECIFICAR[acao === 'mostrar' ? 'falso' : 'verdadeiro']);
    }

    function trocaTela(telaAtual, telaNova) {
        const elementoAtual = document.querySelector(`.${telaAtual}`);
        const elementoNovo = document.querySelector(`.${telaNova}`);

        if (window.planosAvulsos.includes(localStorage.getItem('planoSelecionado')) && telaNova === 'carrinho__secao--segunda-escolha') {
            // Se plano avulso colocar display none na quarta e quinta tela
            document.querySelector('.carrinho__secao--quarta-escolha').style.display = 'none';
            document.querySelector('.carrinho__secao--quinta-escolha').style.display = 'none';

            // Se um plano avulso for selecionado, pule a tela de seleção de tipo de pessoa e vá diretamente para a terceira tela
            const telaTerceira = 'carrinho__secao--terceira-escolha';
            const elementoTerceiraTela = document.querySelector(`.${telaTerceira}`);
            atualizaAtributos(elementoAtual, 'esconder');
            atualizaAtributos(elementoTerceiraTela, 'mostrar');
        } else {
            if (elementoAtual && elementoNovo) {
                atualizaAtributos(elementoAtual, 'esconder');
                atualizaAtributos(elementoNovo, 'mostrar');
            }
        }
    }


    // Função para atualizar a barra de progresso.
    function atualizaBarraProgresso(indice, acao) {
        const classeAtivar = 'carrinho__barra-item--ativo';
        const classeRemover = 'carrinho__barra-item--removido';
        const item = barraDeProgresso[indice];

        if (acao === 'adicionar') {
            // Se está avançando e já tem a classe "carrinho__barra-item--removido", remova-a.
            if (item.classList.contains(classeRemover)) {
                item.classList.remove(classeRemover);
            }
            // Adicione a classe "carrinho__barra-item--ativo".
            if (item.classList.contains(classeAtivar)) {
                return;
            } else {
                item.classList.add(classeAtivar);
            }
        } else {
            // Se está retrocedendo, adicione a classe "carrinho__barra-item--removido".
            item.classList.add(classeRemover);
        }
    }

    // Função para rolar a janela para o topo da página.
    function rolarParaOTopo() {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    // Pega todos os elementos da barra de progresso.
    const barraDeProgresso = document.querySelectorAll('.carrinho__barra-item');
    // Pega o container do título da segunda escolha.
    const containerTituloSegundaEscolha = document.querySelector('.carrinho__info-segunda-escolha');

    // Array de objetos contendo informações sobre os botões e as telas associadas.
    const botoes = [
        {
            avancar: '.botao__avancar-primeira-tela',
            voltar: null,
            telas: ['carrinho__secao--primeira-escolha', 'carrinho__secao--segunda-escolha'],
            barraAvancar: 1,
            barraVoltar: null
        },
        {
            avancar: '.botao__avancar-segunda-tela',
            voltar: '.botao__voltar-segunda-tela',
            telas: ['carrinho__secao--primeira-escolha', 'carrinho__secao--segunda-escolha', 'carrinho__secao--terceira-escolha'],
            barraAvancar: 2,
            barraVoltar: 1
        },
        {
            avancar: '.botao__avancar-terceira-tela',
            voltar: '.botao__voltar-terceira-tela',
            telas: ['carrinho__secao--segunda-escolha', 'carrinho__secao--terceira-escolha', 'carrinho__secao--quarta-escolha'],
            barraAvancar: 3,
            barraVoltar: 2
        },
        {
            avancar: '.botao__avancar-quarta-tela',
            voltar: '.botao__voltar-quarta-tela',
            telas: ['carrinho__secao--terceira-escolha', 'carrinho__secao--quarta-escolha', 'carrinho__secao--quinta-escolha'],
            barraAvancar: 4,
            barraVoltar: 3
        },
        {
            avancar: null,
            voltar: '.botao__voltar-quinta-tela',
            telas: ['carrinho__secao--quarta-escolha', 'carrinho__secao--quinta-escolha', 'carrinho__secao--sexta-escolha'],
            barraAvancar: 5,
            barraVoltar: 4
        }

    ];

    // Loop para adicionar os eventos de clique para cada botão.
    botoes.forEach(botao => {
        // Se tem um botão para avançar, adiciona o evento de clique.
        if (botao.avancar) {
            const btnAvancar = document.querySelector(botao.avancar);
            btnAvancar.addEventListener('click', () => {
                if (window.planosAvulsos.includes(localStorage.getItem('planoSelecionado')) && botao.avancar === '.botao__avancar-terceira-tela') {
                    return;
                }

                if (botao.avancar === '.botao__avancar-primeira-tela') {
                    trocaTela(botao.telas[0], botao.telas[1]);
                } else {
                    trocaTela(botao.telas[1], botao.telas[2]);
                }
                atualizaBarraProgresso(botao.barraAvancar, 'adicionar');

                // Ajustou a lógica para verificar planos avulsos
                if (!window.planosAvulsos.includes(localStorage.getItem('planoSelecionado')) && botao.avancar === '.botao__avancar-primeira-tela') {
                    atualizaAtributos(containerTituloSegundaEscolha, 'mostrar');
                } else {
                    atualizaAtributos(containerTituloSegundaEscolha, 'esconder');
                }

                rolarParaOTopo();
            });
        }

        // Se tem um botão para voltar, adiciona o evento de clique.
        if (botao.voltar) {
            const btnVoltar = document.querySelector(botao.voltar);
            btnVoltar.addEventListener('click', () => {
                // Se um plano avulso for selecionado, atualize a barra de progresso de acordo
                if (window.planosAvulsos.includes(localStorage.getItem('planoSelecionado'))) {
                    trocaTela('carrinho__secao--terceira-escolha', 'carrinho__secao--primeira-escolha');
                    atualizaBarraProgresso(1, 'remover');  // Linha corrigida
                } else {
                    trocaTela(botao.telas[1], botao.telas[0]);
                    atualizaBarraProgresso(botao.barraVoltar, 'remover');
                }

                // Ajustei a lógica para verificar planos avulsos
                if (!window.planosAvulsos.includes(localStorage.getItem('planoSelecionado')) && botao.voltar === '.botao__voltar-terceira-tela') {
                    atualizaAtributos(containerTituloSegundaEscolha, 'mostrar');
                } else {
                    atualizaAtributos(containerTituloSegundaEscolha, 'esconder');
                }

                rolarParaOTopo();
            });
        }
    });


    // Pegue o elemento do botão "Voltar"
    const botaoVoltarTerceiraTela = document.querySelector('.botao__voltar-terceira-tela');

    // Adicione um evento de clique ao botão
    botaoVoltarTerceiraTela.addEventListener('click', function () {
        if (window.planosAvulsos.includes(localStorage.getItem('planoSelecionado'))) {
            // Se um plano avulso for selecionado, volte para a primeira tela
            trocaTela('carrinho__secao--terceira-escolha', 'carrinho__secao--primeira-escolha');
        } else {
            // Caso contrário, volte para a segunda tela (comportamento padrão)
            trocaTela('carrinho__secao--terceira-escolha', 'carrinho__secao--segunda-escolha');
        }
    });

    function mostrarTelaCarregamento() {
        const telaCarregamento = document.querySelector('#preloader');
        telaCarregamento.style.display = 'flex';

        setTimeout(() => {
            window.location.href = 'https://github.com/Nawsacul'; // Redirecionar para o Mercado Pago
        }, 5000); // Esperar 5 segundos (5000 milissegundos)
    }

    if (planosAvulsos.includes(localStorage.getItem('planoSelecionado'))) {
        botaoAvancarTerceiraTela.addEventListener('click', function (event) {
            event.preventDefault(); // Prevenir a ação padrão do botão
            mostrarTelaCarregamento(); // Mostrar a tela de carregamento
        });
    } else {
        const botaoPagarQuintaTela = document.querySelector('.botao__pagar-quinta-tela');

        botaoPagarQuintaTela.addEventListener('click', function (event) {
            event.preventDefault(); // Prevenir a ação padrão do botão
            mostrarTelaCarregamento(); // Mostrar a tela de carregamento
        });
    }
});