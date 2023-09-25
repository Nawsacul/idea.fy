<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Capturar e validar dados do formulário
    $termo_documento = isset($_POST["termo_documento"]) ? "Aceito" : "Não aceito";
    $termo_condicoes = isset($_POST["termo_condicoes"]) ? "Aceito" : "Não aceito";
    $termo_privacidade = isset($_POST["termo_privacidade"]) ? "Aceito" : "Não aceito";
    $termo_avulso = isset($_POST["termo_avulso"]) ? "Aceito" : "Não aceito";

    $pessoaMarca = filter_input(INPUT_POST, "pessoaMarca", FILTER_SANITIZE_STRING);
    if (empty($pessoaMarca)) {
        echo "Tipo de pessoa/marca é obrigatório.";
        exit;
    }

    $nomeCompleto = filter_input(INPUT_POST, "nomeCompleto", FILTER_SANITIZE_STRING);
    $cpf = filter_input(INPUT_POST, "cpf", FILTER_SANITIZE_STRING);
    $razaoSocial = filter_input(INPUT_POST, "razaoSocial", FILTER_SANITIZE_STRING);
    $porteEmpresa = filter_input(INPUT_POST, "porteEmpresa", FILTER_SANITIZE_STRING);
    $cnpj = filter_input(INPUT_POST, "cnpj", FILTER_SANITIZE_STRING);
    $cep = filter_input(INPUT_POST, "cep", FILTER_SANITIZE_STRING);
    $endereco = filter_input(INPUT_POST, "endereco", FILTER_SANITIZE_STRING);
    $telefone = filter_input(INPUT_POST, "telefone", FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
    $dadosPessoais = filter_input(INPUT_POST, "dadosPessoais", FILTER_SANITIZE_STRING);
    $atividades = filter_input(INPUT_POST, "atividades", FILTER_SANITIZE_STRING);
    $nomeMarca = filter_input(INPUT_POST, "nomeMarca", FILTER_SANITIZE_STRING);
    $linguaEstrangeira = filter_input(INPUT_POST, "linguaEstrangeira", FILTER_SANITIZE_STRING);
    $traducao = filter_input(INPUT_POST, "traducao", FILTER_SANITIZE_STRING);
    $comoMarcaUtilizada = filter_input(INPUT_POST, "comoMarcaUtilizada", FILTER_SANITIZE_STRING);

    if (!$email) {
        echo "Email inválido.";
        exit;
    }

    // Construir mensagem de email
    $mensagem = "Termo de Documento: $termo_documento\n";
    $mensagem .= "Termo de Condições: $termo_condicoes\n";
    $mensagem .= "Termo de Privacidade: $termo_privacidade\n";
    $mensagem .= "Termo Avulso: $termo_avulso\n";
    $mensagem .= "Pessoa/Marca: $pessoaMarca\n";
    $mensagem .= "Nome Completo: $nomeCompleto\n";
    $mensagem .= "CPF: $cpf\n";
    $mensagem .= "Razão Social: $razaoSocial\n";
    $mensagem .= "Porte da Empresa: $porteEmpresa\n";
    $mensagem .= "CNPJ: $cnpj\n";
    $mensagem .= "CEP: $cep\n";
    $mensagem .= "Endereço: $endereco\n";
    $mensagem .= "Telefone: $telefone\n";
    $mensagem .= "Email: $email\n";
    $mensagem .= "Dados Pessoais: $dadosPessoais\n";
    $mensagem .= "Atividades: $atividades\n";
    $mensagem .= "Nome da Marca: $nomeMarca\n";
    $mensagem .= "Língua Estrangeira: $linguaEstrangeira\n";
    $mensagem .= "Tradução: $traducao\n";
    $mensagem .= "Como a Marca é Utilizada: $comoMarcaUtilizada\n";

    // Lidar com o upload de arquivos
    if (isset($_FILES["fileInput"]) && $_FILES["fileInput"]["error"] == UPLOAD_ERR_OK) {
        $nomeArquivo = $_FILES["fileInput"]["name"];
        $mensagem .= "Arquivo Enviado: $nomeArquivo\n";
    } else {
        $mensagem .= "Nenhum arquivo enviado.\n";
    }

    // Endereço de email para o qual a mensagem será enviada
    $to = "lucaswan09@gmail.com";
    $subject = "Nova mensagem do formulário";
    $headers = "De: carrinho@ideafy.com.br"; // Substitua pelo email de origem válido no seu domínio

    // Verifica se o email foi enviado com sucesso
    if (mail($to, $subject, $mensagem, $headers)) {
        // Redireciona para a página de sucesso
        echo "Sucesso";
        exit;
    } else {
        // Redireciona para a página de erro
        header("Location: https://www.exemplo.com/erro.html");
        exit;
    }
} else {
    echo "Método de requisição inválido.";
}
?>