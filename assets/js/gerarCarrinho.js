
import { planos } from './planos.js';

const planosSugeridos = {
  basic: 'standart',
  standart: 'plus',
  plus: 'premium',
  premium: null
};

const planosLink = {
  basic: '#planoBasic',
  standart: '#planoStandart',
  plus: '#planoPlus',
  premium: '#planoPremium'
};

document.addEventListener('DOMContentLoaded', function () {
  const planoSelecionado = localStorage.getItem('planoSelecionado');  // Read the selected plan from localStorage
  const paginaOrigem = localStorage.getItem('paginaOrigem') || 'index.html';  // Use index.html como padrão

  const planoPrimeiraTela = document.getElementById('carrinho-container-itens');

  if (planos.hasOwnProperty(planoSelecionado)) {
    const planoInfo = planos[planoSelecionado];
    const descricaoItems = planoInfo.descricao.map(item => `<li class="dropdown__li descricao-plano__item">${item}</li>`).join('');

    planoPrimeiraTela.innerHTML = `
      <div class="carrinho__item-escolhido dropdown__item">
        <button class="dropdown__pergunta dropdown__pergunta-aberta" onclick="toggleDropdown(0)" type="button">
          <h3 class="dropdown__pergunta-titulo">${planoInfo.titulo}</h3>
          <img
          class="dropdown__pergunta-seta rotacionar180"
          src="assets/img/svg/keyboard-arrow-up.svg"
          alt=""
          aria-hidden="true"
          />
        </button>
        <div class="dropdown__resposta" id="answer-0" style="display: block;">
          <div class="descricao-plano">
            <p class="dropdown__texto descricao-plano__titulo">Esse plano inclui:</p>
            <ul class="descricao-plano__lista dropdown__ul">
              ${descricaoItems}
            </ul>
          </div>
        </div>

        <div class="termos">
          <div class="termos__termo">
            <label for="termo_documento" class="termos__label"
              ><input
                type="checkbox"
                name="termo_documento"
                id="termo_documento"
                class="termos__checkbox"
                required
              />
              <span class="termos__checkbox-customizado"></span>Estou ciente de que
              mais documentos podem ser solicitados e estarei atento ao meu e-mail,
              caixa de spam ou WhatsApp.</label
            >
          </div>
    
          <div class="termos__termo">
            <label for="termo_condicoes" class="termos__label"
              ><input
                type="checkbox"
                name="termo_condicoes"
                id="termo_condicoes"
                class="termos__checkbox"
                required
              /><span class="termos__checkbox-customizado"></span>Estou de acordo
              com os
              <a class="termos__texto-destaque" href="#"> Termos e Condições</a> do
              site.</label
            >
          </div>
    
          <div class="termos__termo">
            <label for="termo_privacidade" class="termos__label"
              ><input
                type="checkbox"
                name="termo_privacidade"
                id="termo_privacidade"
                class="termos__checkbox"
                required
              /><span class="termos__checkbox-customizado"></span>Estou de acordo
              com o
              <a class="termos__texto-destaque" href="#">Termo de Privacidade</a> do
              site.</label
            >
          </div>
        </div>

        <div class="botoes__container">
          <a href="index.html" class="link" id="linkVoltar"
          >
            <span class="link__texto">Voltar</span>
          </a>

          <button class="botao" type="button">Avançar</button>
        </div>
      </div>
    `;

    const divTermos = document.querySelector('.termos');

    const termoAdicional = `
    <div class="termos__termo">
      <label for="termo_avulso" class="termos__label"
        ><input
          type="checkbox"
          name="termo_avulso"
          id="termo_avulso"
          class="termos__checkbox"
          required
        /><span class="termos__checkbox-customizado"></span>Estou ciente que
        meu plano é mais básico e que se precisar de outros serviços,
        comprarei avulso.</label
      >
    </div>
    `;

    if (planoSelecionado === 'basic') {
      divTermos.insertAdjacentHTML('beforeend', termoAdicional);
    }


    // Uso
    const linkVoltar = document.getElementById('linkVoltar');  // Supondo que o link tenha um id 'linkVoltar'

    if (planosLink.hasOwnProperty(planoSelecionado)) {
      linkVoltar.href = `${paginaOrigem}${planosLink[planoSelecionado]}`;
    }

    const planoSugeridoKey = planosSugeridos[planoSelecionado];

    if (planoSugeridoKey && planos.hasOwnProperty(planoSugeridoKey)) {
      const planoSugeridoInfo = planos[planoSugeridoKey];
      const descricaoSugeridoItems = planoSugeridoInfo.descricao.map(item => `<li class="dropdown__li descricao-plano__item">${item}</li>`).join('');

      // Create and append the divider
      const divider = document.createElement('div');
      divider.className = 'carrinho__divisoria';
      planoPrimeiraTela.appendChild(divider);

      // Create and append the suggestion title
      const suggestionTitle = document.createElement('h2');
      suggestionTitle.className = 'carrinho__titulo-sugestao';
      suggestionTitle.innerText = 'Sugestão para proteger melhor sua marca';
      planoPrimeiraTela.appendChild(suggestionTitle);

      // Create and append the suggested plan
      const planoSugeridoDiv = document.createElement('div');
      planoSugeridoDiv.className = 'carrinho__item-sugerido dropdown__item';
      planoSugeridoDiv.innerHTML = `
        <div class="carrinho__item-sugerido dropdown__item">
          <button class="dropdown__pergunta dropdown__pergunta-aberta" onclick="toggleDropdown(1)" type="button">
            <h3 class="dropdown__pergunta-titulo">${planoSugeridoInfo.titulo}</h3>
            <img
              class="dropdown__pergunta-seta rotacionar180"
              src="assets/img/svg/keyboard-arrow-up.svg"
              alt=""
              aria-hidden="true"
            />
          </button>
          <div class="class="descricao-plano descricao-plano--sugerido dropdown__resposta" id="answer-1" style="display: block;">
            <p class="dropdown__texto descricao-plano__titulo">Esse plano inclui:</p>
            <ul class="descricao-plano__lista dropdown__ul">
              ${descricaoSugeridoItems}
            </ul>
          </div>

          <div class="botoes__container botoes__container--sugerido">
          <button class="botao plan__botao" type="button" data-plano="${planoSugeridoKey}">Escolher ${planoSugeridoInfo.subtitulo}</button>
          </div>
        </div>
      `;

      // Append the newly created div to the parent container
      planoPrimeiraTela.appendChild(planoSugeridoDiv);
    }

  } else {
    planoPrimeiraTela.innerHTML = `
    <div class="plano__nao-encontrado">
    <h2 class="plano__texto-nao-encontrado">Plano não encontrado.</h2>
    <a href="index.html" class="botao plano__link-nao-encontrado"
    >Voltar</a>
    </div>
    `;
  }
});
