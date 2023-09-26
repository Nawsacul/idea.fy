<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Capturar e validar dados do formulário
    $termo_documento = isset($_POST["termo_documento"]) ? "Aceito" : "Não aceito";
    $termo_condicoes = isset($_POST["termo_condicoes"]) ? "Aceito" : "Não aceito";
    $termo_privacidade = isset($_POST["termo_privacidade"]) ? "Aceito" : "Não aceito";
    $termo_avulso = isset($_POST["termo_avulso"]) ? "Aceito" : 'Não existente';

    $pessoaMarca = filter_input(INPUT_POST, "pessoaMarca", FILTER_SANITIZE_STRING);

    $nomeCompleto = filter_input(INPUT_POST, "nomeCompleto", FILTER_SANITIZE_STRING) ?? '';
    $cpf = filter_input(INPUT_POST, "cpf", FILTER_SANITIZE_STRING) ?? '';

    $razaoSocial = filter_input(INPUT_POST, "razaoSocial", FILTER_SANITIZE_STRING) ?? '';
    $porteEmpresa = filter_input(INPUT_POST, "porteEmpresa", FILTER_SANITIZE_STRING) ?? '';
    $cnpj = filter_input(INPUT_POST, "cnpj", FILTER_SANITIZE_STRING) ?? '';

    $cep = filter_input(INPUT_POST, "cep", FILTER_SANITIZE_STRING);
    $endereco = filter_input(INPUT_POST, "endereco", FILTER_SANITIZE_STRING);
    $telefone = filter_input(INPUT_POST, "telefone", FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
    
    $dadosPessoais = filter_input(INPUT_POST, "dadosPessoais", FILTER_SANITIZE_STRING) ?? '';

    $atividades = filter_input(INPUT_POST, "atividades", FILTER_SANITIZE_STRING) ?? '';
    $nomeMarca = filter_input(INPUT_POST, "nomeMarca", FILTER_SANITIZE_STRING) ?? '';
    $linguaEstrangeira = filter_input(INPUT_POST, "linguaEstrangeira", FILTER_SANITIZE_STRING) ?? '';
    $traducao = filter_input(INPUT_POST, "traducao", FILTER_SANITIZE_STRING) ?? '';
    $comoMarcaUtilizada = filter_input(INPUT_POST, "comoMarcaUtilizada", FILTER_SANITIZE_STRING) ?? '';

    $planoSelecionado = filter_input(INPUT_POST, "planoSelecionado", FILTER_SANITIZE_STRING);


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
    $mensagem .= "<b>Tradução:</b> $traducao\n";
    $mensagem .= "<b>Como a Marca é Utilizada:</b> $comoMarcaUtilizada\n";

    // Lidar com o upload de arquivos
    if (isset($_FILES["fileInput"]) && $_FILES["fileInput"]["error"] == UPLOAD_ERR_OK) {
        $nomeArquivo = $_FILES["fileInput"]["name"];
        $mensagem .= "Arquivo Enviado: $nomeArquivo\n";
    } else {
        $mensagem .= "Nenhum arquivo enviado.\n";
    }

    // Endereço de email para o qual a mensagem será enviada
    $to = "lucaswan09@gmail.com";
    $subject = "Novo pedido - Plano " . $planoSelecionado;
    $headers = "De: carrinho@ideafy.com.br"; // Substitua pelo email de origem válido no seu domínio

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