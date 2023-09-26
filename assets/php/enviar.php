<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Capturar e validar dados do formulário
    $termo_documento = isset($_POST["termo_documento"]) ? "Aceito" : "Não aceito";
    $termo_condicoes = isset($_POST["termo_condicoes"]) ? "Aceito" : "Não aceito";
    $termo_privacidade = isset($_POST["termo_privacidade"]) ? "Aceito" : "Não aceito";
    $termo_avulso = isset($_POST["termo_avulso"]) ? "Aceito" : 'Não existente';

    $pessoaMarca = filter_input(INPUT_POST, "pessoaMarca");
    if (empty($pessoaMarca)) {
        echo "Tipo de pessoa/marca é obrigatório.";
        exit;
    }

    $nomeCompleto = filter_input(INPUT_POST, "nomeCompleto") ?? '';
    $cpf = filter_input(INPUT_POST, "cpf") ?? '';

    $razaoSocial = filter_input(INPUT_POST, "razaoSocial") ?? '';
    $porteEmpresa = filter_input(INPUT_POST, "porteEmpresa") ?? '';
    $cnpj = filter_input(INPUT_POST, "cnpj") ?? '';

    $cep = filter_input(INPUT_POST, "cep");
    $endereco = filter_input(INPUT_POST, "endereco");
    $telefone = filter_input(INPUT_POST, "telefone");
    $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);

    $dadosPessoais = filter_input(INPUT_POST, "dadosPessoais") ?? '';

    $atividades = filter_input(INPUT_POST, "atividades") ?? '';
    $nomeMarca = filter_input(INPUT_POST, "nomeMarca") ?? '';
    $linguaEstrangeira = filter_input(INPUT_POST, "linguaEstrangeira") ?? '';
    $traducao = filter_input(INPUT_POST, "traducao") ?? '';
    $comoMarcaUtilizada = filter_input(INPUT_POST, "comoMarcaUtilizada") ?? '';

    $planoSelecionado = filter_input(INPUT_POST, "planoSelecionado");

    if (!$email) {
        echo "Email inválido.";
        exit;
    }

    // Construir mensagem de email

    $mensagem = "<b>Termo de Documento:</b> $termo_documento\n";
    $mensagem .= "<b>Termo de Condições:</b> $termo_condicoes\n";
    $mensagem .= "<b>Termo de Privacidade:</b> $termo_privacidade\n";
    $mensagem .= "<b>Termo Avulso:</b> $termo_avulso\n";

    $mensagem .= "<b>Quem vai registrar a marca?:</b> $pessoaMarca\n";

    if (!empty($nomeCompleto) && !empty($cpf)) {
        $mensagem .= "<b>Nome Completo:</b> $nomeCompleto\n";
        $mensagem .= "<b>CPF:</b> $cpf\n";
    }

    if (!empty($razaoSocial) && !empty($porteEmpresa) && !empty($cnpj)) {
        $mensagem .= "<b>Razão Social:</b> $razaoSocial\n";
        $mensagem .= "<b>Porte da Empresa:</b> $porteEmpresa\n";
        $mensagem .= "<b>CNPJ:</b> $cnpj\n";
    }

    $mensagem .= "<b>CEP:</b> $cep\n";
    $mensagem .= "<b>Endereço:</b> $endereco\n";
    $mensagem .= "<b>Telefone:</b> $telefone\n";
    $mensagem .= "<b>Email:</b> $email\n";
    $mensagem .= "<b>Como você prefere que a gente entre em contato?</b> $dadosPessoais\n";

    $mensagem .= "<b>Atividades:</b> $atividades\n";

    $mensagem .= "<b>Nome da Marca:</b> $nomeMarca\n";
    $mensagem .= "<b>Língua Estrangeira:</b> $linguaEstrangeira\n";

    if (!empty($traducao)) {
        $mensagem .= "<b>Tradução:</b> $traducao\n";
    }
    $mensagem .= "<b>Como a Marca é Utilizada:</b> $comoMarcaUtilizada\n";

    // Lidar com o upload de arquivos
    $mensagem .= "Arquivo Enviado: $filename\n";

    // Endereço de email para o qual a mensagem será enviada
    $to = "lucaswan09@gmail.com";
    $subject = "Novo pedido - Pacote" . $planoSelecionado;
    $headers = "De: carrinho@ideafy.com.br"; // Substitua pelo email de origem válido no seu domínio
    // Adicionar cabeçalho de conteúdo HTML
    $headers = "MIME-Version: 1.0\n";
    $headers .= "Content-Type: text/html; charset=iso-8859-1\n";

    // Verifica se o email foi enviado com sucesso
    if (mail($to, $subject, $mensagem, $headers)) {
        // Redireciona para a página de sucesso
        header("Location: ../../envio-sucesso.html");
        exit;
    } else {
        // Redireciona para a página de erro
        header("Location: ../../404.shtml");
        exit;
    }
} else {
    echo "Método de requisição inválido.";
}
?>