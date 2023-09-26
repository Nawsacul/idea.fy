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

    // Handle the file upload
    $attachment = "";
    if (isset($_FILES["fileInput"]) && $_FILES["fileInput"]["error"] == UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES["fileInput"]["tmp_name"];
        $fileName = $_FILES["fileInput"]["name"];
        $fileSize = $_FILES["fileInput"]["size"];
        $fileType = $_FILES["fileInput"]["type"];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // MIME boundary string
        $mime_boundary = "-----=" . md5(time());
        
        // Encode the file data
        $data = chunk_split(base64_encode(file_get_contents($fileTmpPath)));

        // Add file attachment to the message
        $attachment .= "--" . $mime_boundary . "\n";
        $attachment .= "Content-Type: " . $fileType . "; name=\"" . $fileName . "\"\n";
        $attachment .= "Content-Transfer-Encoding: base64\n";
        $attachment .= "Content-Disposition: attachment; filename=\"" . $fileName . "\"\n\n";
        $attachment .= $data . "\n\n";
        $attachment .= "--" . $mime_boundary . "--\n";

        $mensagem .= "Arquivo Enviado: $fileName\n";
    } else {
        $mensagem .= "Nenhum arquivo enviado.\n";
    }

    // Recipient email
    $to = "lucaswan09@gmail.com";
    $subject = "Novo pedido - Plano " . $planoSelecionado;
    
    // Headers for attachment
    $headers = "From: carrinho@ideafy.com.br\n";
    $headers .= "MIME-Version: 1.0\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $mime_boundary . "\"\n\n";
    $headers .= "This is a multi-part message in MIME format.\n\n";
    $headers .= "--" . $mime_boundary . "\n";
    $headers .= "Content-Type: text/plain; charset=\"iso-8859-1\"\n";
    $headers .= "Content-Transfer-Encoding: 7bit\n\n";
    $headers .= $mensagem . "\n\n";

    // Final email body
    $messageBody = $headers . $attachment;

    // Send email
    if (mail($to, $subject, $messageBody, $headers)) {
        header("Location: ../../envio-sucesso.html");
        exit;
    } else {
        header("Location: ../../404");
        exit;
    }
} else {
    echo "Método de requisição inválido.";
}
?>