// Adiciona um evento que será disparado quando todo o conteúdo da página for carregado.
document.addEventListener('DOMContentLoaded', () => {

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

    // Função para trocar de tela com transição suave
    function trocaTela(telaAtual, telaNova) {
        const elementoAtual = document.querySelector(`.${telaAtual}`);
        const elementoNovo = document.querySelector(`.${telaNova}`);

        if (elementoAtual && elementoNovo) {
            atualizaAtributos(elementoAtual, 'esconder');
            atualizaAtributos(elementoNovo, 'mostrar');
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
            avancar: null,
            voltar: '.botao__voltar-terceira-tela',
            telas: ['carrinho__secao--segunda-escolha', 'carrinho__secao--terceira-escolha', 'carrinho__secao--quarta-escolha'],
            barraAvancar: 3,
            barraVoltar: 2
        }
    ];

    // Loop para adicionar os eventos de clique para cada botão.
    botoes.forEach(botao => {
        // Se tem um botão para avançar, adiciona o evento de clique.
        if (botao.avancar) {
            const btnAvancar = document.querySelector(botao.avancar);
            btnAvancar.addEventListener('click', () => {
                if (botao.avancar === '.botao__avancar-primeira-tela') {
                    trocaTela(botao.telas[0], botao.telas[1]);
                } else {
                    trocaTela(botao.telas[1], botao.telas[2]);
                }
                atualizaBarraProgresso(botao.barraAvancar, 'adicionar');
                const telaAtual = botao.avancar === '.botao__avancar-primeira-tela' ? botao.telas[0] : botao.telas[1];
                if (telaAtual === 'carrinho__secao--primeira-escolha') {
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
                trocaTela(botao.telas[1], botao.telas[0]);
                atualizaBarraProgresso(botao.barraVoltar, 'remover');
                const telaAtual = botao.voltar === '.botao__voltar-terceira-tela' ? botao.telas[1] : botao.telas[0];
                if (telaAtual === 'carrinho__secao--terceira-escolha') {
                    atualizaAtributos(containerTituloSegundaEscolha, 'mostrar');
                } else {
                    atualizaAtributos(containerTituloSegundaEscolha, 'esconder');
                }
                rolarParaOTopo();
            });
        }
    });

});