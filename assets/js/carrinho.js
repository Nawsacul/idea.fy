document.addEventListener('DOMContentLoaded', function () {
    const planoSelecionado = localStorage.getItem('planoSelecionado');  // Ler o plano selecionado do localStorage

    const planoPrimeiraTela = document.getElementById('carrinho-container-itens');

    if (planoSelecionado === 'basic') {
        // Construir as divs com base no plano selecionado
        planoPrimeiraTela.innerHTML = `
        <div class="carrinho__item-escolhido dropdown__item">
        <button
          class="dropdown__pergunta"
          onclick="toggleDropdown(0)"
          type="button"
        >
          <h3 class="dropdown__pergunta-titulo">
            Plano Basic - R$ 849,90
          </h3>
          <img
            class="dropdown__pergunta-seta"
            src="assets/img/svg/keyboard-arrow-up.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
        <div class="dropdown__resposta" id="answer-0">
          <div class="descricao-plano">
            <p class="descricao-plano__titulo">Esse plano inclui:</p>
            <ul class="descricao-plano__lista dropdown__ul">
              <li class="descricao-plano__item">
                Identificação de classes
              </li>
              <li class="descricao-plano__item">
                Protocolo de pedido de registro
              </li>
              <li class="descricao-plano__item">
                Acompanhamento de marca até o indeferimento
              </li>
              <li class="descricao-plano__item">
                Cumprimento de exigência a apresentação de documentos
              </li>
              <li class="descricao-plano__item">
                Emissão de certificado
              </li>
              <li class="descricao-plano__item">
                01 (uma) pesquisa de viabilidade
              </li>
            </ul>
          </div>

          <div class="termos">
            <div class="termos__termo">
              <input
                type="checkbox"
                name="termo_documento"
                id="termo_documento"
                class="termos__checkbox"
              />
              <label for="termo_documento" class="termos__label"
                >Estou ciente de que mais documentos podem ser solicitados
                e estarei atento ao meu e-mail, caixa de spam ou
                WhatsApp.</label
              >
            </div>

            <div class="termos__termo">
              <input
                type="checkbox"
                name="termo_condicoes"
                id="termo_condicoes"
                class="termos__checkbox"
              />
              <label for="termo_condicoes" class="termos__label"
                >Estou de acordo com os Termos e Condições do site.</label
              >
            </div>

            <div class="termos__termo">
              <input
                type="checkbox"
                name="termo_privacidade"
                id="termo_privacidade"
                class="termos__checkbox"
              />
              <label for="termo_privacidade" class="termos__label"
                >Estou de acordo com o Termo de Privacidade do
                site.</label
              >
            </div>

            <div class="termos__termo">
              <input
                type="checkbox"
                name="termo_avulso"
                id="termo_avulso"
                class="termos__checkbox"
              />
              <label for="termo_avulso" class="termos__label"
                >Estou ciente que meu plano é mais básico e que se
                precisar de outros serviços, comprarei avulso.</label
              >
            </div>
          </div>
        </div>
      </div>

      <div class="carrinho__divisoria"></div>

      <div class="carrinho__item-sugerido dropdown__item">
        <button
          class="dropdown__pergunta"
          onclick="toggleDropdown(1)"
          type="button"
        >
          <h3 class="dropdown__pergunta-titulo">
            Plano Plus - R$ 1657,00
          </h3>
          <img
            class="dropdown__pergunta-seta"
            src="assets/img/svg/keyboard-arrow-up.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
        <div class="descricao-plano dropdown__resposta" id="answer-1">
          <p class="descricao-plano__titulo">Esse plano inclui:</p>
          <ul class="descricao-plano__lista dropdown__ul">
            <li class="descricao-plano__item">
              Identificação de classes
            </li>
            <li class="descricao-plano__item">
              Protocolo de pedido de registro
            </li>
            <li class="descricao-plano__item">
              Acompanhamento de marca até o indeferimento
            </li>
            <li class="descricao-plano__item">
              Cumprimento de exigência a apresentação de documentos
            </li>
            <li class="descricao-plano__item">
              Emissão de certificado
            </li>
            <li class="descricao-plano__item">
              04 (quatro) pesquisa de viabilidade
            </li>
            <li class="descricao-plano__item">
              Adequação da logo às especificações do INPI
            </li>
            <li class="descricao-plano__item">
              Garantia de registro
            </li>
            <li class="descricao-plano__item">
              Oposição à outras marcas
            </li>
            <li class="descricao-plano__item">
              Manifestação à oposição
            </li>
            <li class="descricao-plano__item">
              Recurso contra indeferimento
            </li>
          </ul>
        </div>
      </div> 
        `;
    } else {
        console.log('funcionou mofio, pode ir deitar');
    }
});