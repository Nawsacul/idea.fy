
// Função para gerar os inputs e elementos para 'Pessoa Física'
function generatePessoaFisicaInputs() {
  return `
  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="nomeCompleto">
    Nome completo da pessoa física</label>
    <input class="contato-formulario__input" type="text" name="nomeCompleto" id="nomeCompleto" placeholder="Seu nome como no CPF" required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="cpf">CPF da pessoa</label>
    <input class="contato-formulario__input" type="text" name="cpf" id="cpf" placeholder="000.000.000-00" required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="cep">CEP</label>
    <input class="contato-formulario__input" type="text" name="cep" id="cep" placeholder="CEP de onde você mora" required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="endereco">Endereço completo</label>
    <input class="contato-formulario__input" type="text" name="endereco" id="endereco" placeholder="Endereço onde você mora" required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="telefone">Telefone com DDD</label>
    <input class="contato-formulario__input" type="text" name="telefone" id="telefone" placeholder="Ex. 00 99999-9999" required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="email">E-mail para contato</label>
    <input class="contato-formulario__input" type="email" name="email" id="email" placeholder="Digite seu e-mail" autocomplete="on" required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  `;
}

// Função para gerar os inputs e elementos para 'Pessoa Jurídica'
function generatePessoaJuridicaInputs() {
  return `
  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="razaoSocial">
    Razão Social da empresa</label>
    <input class="contato-formulario__input" type="text" name="razaoSocial" id="razaoSocial" placeholder="O nome que vem no cartão do CNPJ" required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="carrinho__pergunta-container">
    <h3 class="carrinho__pergunta-titulo">Qual o porte da empresa? <span class="carrinho__pergunta-titulo-sugestao">(Confira no cartão do CNPJ)</span></h3>
    
    <label for="mei" class="carrinho__opcao-label">
      <div>
        <input
          type="radio"
          name="porteEmpresa"
          value="Microempreendedor Individual (MEI)"
          id="mei"
          class="radio__terceira-tela"
        />
        <span class="carrinho__opcao-radio-personalizado"></span>
      </div>
      Microempreendedor Individual (MEI)
    </label>
    
    <label for="me" class="carrinho__opcao-label">
      <div>
        <input
          type="radio"
          name="porteEmpresa"
          value="Microempresa (ME)"
          id="me"
          class="radio__terceira-tela"
        />
        <span class="carrinho__opcao-radio-personalizado"></span>
      </div>
      Microempresa (ME)
    </label>
    
    <label for="epp" class="carrinho__opcao-label">
      <div>
        <input
          type="radio"
          name="porteEmpresa"
          value="Empresa de pequeno porte (EPP)"
          id="epp"
          class="radio__terceira-tela"
        />
        <span class="carrinho__opcao-radio-personalizado"></span>
      </div>
      Empresa de pequeno porte (EPP)
    </label>
    
    <label for="sa" class="carrinho__opcao-label">
      <div>
        <input
          type="radio"
          name="porteEmpresa"
          value="Sociedade Anônima (S/A)"
          id="sa"
          class="radio__terceira-tela"
        />
        <span class="carrinho__opcao-radio-personalizado"></span>
      </div>
      Sociedade Anônima (S/A)
    </label>
    
    <label for="ltda" class="carrinho__opcao-label">
      <div>
        <input
          type="radio"
          name="porteEmpresa"
          value="Sociedade Empresária Limitada (LTDA)"
          id="ltda"
          class="radio__terceira-tela"
        />
        <span class="carrinho__opcao-radio-personalizado"></span>
      </div>
      Sociedade Empresária Limitada (LTDA)
    </label>
    
    <label for="unipessoal" class="carrinho__opcao-label">
      <div>
        <input
          type="radio"
          name="porteEmpresa"
          value="Sociedade Limitada Unipessoal"
          id="unipessoal"
          class="radio__terceira-tela"
        />
        <span class="carrinho__opcao-radio-personalizado"></span>
      </div>
      Sociedade Limitada Unipessoal
    </label>
    
    <label for="cooperativa" class="carrinho__opcao-label">
      <div>
        <input
          type="radio"
          name="porteEmpresa"
          value="Cooperativa"
          id="cooperativa"
          class="radio__terceira-tela"
        />
        <span class="carrinho__opcao-radio-personalizado"></span>
      </div>
      Cooperativa
    </label>
    
    <label for="outra" class="carrinho__opcao-label">
      <div>
        <input
          type="radio"
          name="porteEmpresa"
          value="Outra"
          id="outra"
          class="radio__terceira-tela"
          required
        />
        <span class="carrinho__opcao-radio-personalizado"></span>
      </div>
      Outra
    </label>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="cnpj">CNPJ</label>
    <input class="contato-formulario__input" type="text" name="cnpj" id="cnpj" placeholder="000.000.000/0000-00" title="Por favor, insira um CNPJ válido no formato 00.000.000/0000-00." required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="cep">CEP</label>
    <input class="contato-formulario__input" type="text" name="cep" id="cep" placeholder="CEP do cartão do CNPJ" title="Por favor, insira um CEP válido no formato 00000-000." required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="endereco">Endereço da empresa</label>
    <input class="contato-formulario__input" type="text" name="endereco" id="endereco" placeholder="Endereço no cartão do CNPJ" title="Por favor, insira o endereço da empresa conforme consta no cartão do CNPJ." required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="telefone">Telefone com DDD</label>
    <input class="contato-formulario__input" type="tel" name="telefone" id="telefone" placeholder="Ex. 00 99999-9999" title="Por favor, insira um número de telefone válido com DDD no formato 00 99999-9999." required>
    <div class="error-message">Campo Obrigatório</div>
  </div>

  <div class="contato-formulario__campo">
    <label class="contato-formulario__label" for="email">E-mail para contato</label>
    <input class="contato-formulario__input" type="email" name="email" id="email" placeholder="Digite seu e-mail" autocomplete="on" title="Por favor, insira um endereço de e-mail válido." required>
    <div class="error-message">Campo Obrigatório</div>
  </div>
  `;
}

const secaoTerceiraTela = document.querySelector('.carrinho__secao--terceira-escolha');
const botaoAvancarTerceiraTela = document.querySelector('.botao__avancar-terceira-tela');
const containerBotoesTerceiraEscolha = secaoTerceiraTela.querySelector('.botoes__container');

if (planosAvulsos.includes(localStorage.getItem('planoSelecionado'))) {
  containerBotoesTerceiraEscolha.classList.add('botoes__container--quinta-tela');
  botaoAvancarTerceiraTela.textContent = 'Efetuar pagamento';
}

const tituloPaginaPessoaFisica = document.querySelector('.carrinho__titulo-secao--terceira-escolha');

// Function to handle radio button selection
function handleSelection(event) {
  const terceiraEscolhaSection = document.querySelector('.carrinho__inputs-terceira-escolha');

  if (event.target.value === 'Pessoa Física') {
    tituloPaginaPessoaFisica.innerHTML = 'Quem é o dono da marca?';
    terceiraEscolhaSection.innerHTML = generatePessoaFisicaInputs();
  } else if (event.target.value === 'Pessoa Jurídica') {
    tituloPaginaPessoaFisica.innerHTML = 'Quem é a pessoa dona da marca?';
    terceiraEscolhaSection.innerHTML = generatePessoaJuridicaInputs();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Se um plano avulso for selecionado, gere automaticamente os inputs para "pessoa física"
  if (window.planosAvulsos.includes(localStorage.getItem('planoSelecionado'))) {
    const inputsPessoaFisica = generatePessoaFisicaInputs();
    // Supondo que haja um contêiner onde você deseja anexar esses inputs
    const container = document.querySelector('.carrinho__inputs-terceira-escolha');
    container.innerHTML = inputsPessoaFisica;
  }
});

// Attach event listener to '.carrinho__secao--segunda-escolha' section
document.addEventListener('DOMContentLoaded', function () {
  const segundaEscolhaSection = document.querySelector('.carrinho__secao--segunda-escolha');
  segundaEscolhaSection.addEventListener('change', handleSelection);
});