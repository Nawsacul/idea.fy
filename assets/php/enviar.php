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
    if (isset($_FILES['fileInput']) && $_FILES['fileInput']['error'] == UPLOAD_ERR_OK) {
        // Obter informações do arquivo
        $fileTmpPath = $_FILES['fileInput']['tmp_name'];
        $fileName = $_FILES['fileInput']['name'];
        $fileSize = $_FILES['fileInput']['size'];
        $fileType = $_FILES['fileInput']['type'];

        // Ler o conteúdo do arquivo
        $fileContent = file_get_contents($fileTmpPath);
        $encodedContent = chunk_split(base64_encode($fileContent));

        // Definir o limite
        $separator = md5(time());
        $eol = "\r\n";

        // Headers do e-mail
        $headers = "From: carrinho@ideafy.com.br" . $eol;
        $headers .= "MIME-Version: 1.0" . $eol;
        $headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol;

        // Corpo do e-mail
        $body = "--" . $separator . $eol;
        $body .= "Content-Type: text/html; charset=\"iso-8859-1\"" . $eol;
        $body .= "Content-Transfer-Encoding: 7bit" . $eol;
        $body .= $mensagem . $eol;

        // Anexar arquivo
        $body .= "--" . $separator . $eol;
        $body .= "Content-Type: " . $fileType . "; name=\"" . $fileName . "\"" . $eol;
        $body .= "Content-Transfer-Encoding: base64" . $eol;
        $body .= "Content-Disposition: attachment" . $eol;
        $body .= $encodedContent . $eol;
        $body .= "--" . $separator . "--";

        // Endereço de email para o qual a mensagem será enviada
        $to = "lucaswan09@gmail.com";
        $subject = "Novo pedido - Pacote" . $planoSelecionado;
        $headers = "De: carrinho@ideafy.com.br"; // Substitua pelo email de origem válido no seu domínio

        // Verifica se o email foi enviado com sucesso
        if (mail($to, $subject, $body, $headers)) {
            // Redireciona para a página de sucesso
            header("Location: ../../envio-sucesso.html");
            exit;
        } else {
            // Redireciona para a página de erro
            header("Location: ../../404.shtml");
            exit;
        }
    } else {
        if (isset($_FILES['fileInput']) && $_FILES['fileInput']['error'] == UPLOAD_ERR_NO_FILE) {
            // Nenhum arquivo foi enviado, mas isso pode ser opcional
            // Continue processando o resto do formulário
        } else {
            // Um erro ocorreu no upload do arquivo
            if (isset($_FILES['fileInput'])) {
                echo 'Código de Erro de Upload: ' . $_FILES['fileInput']['error'];
            } else {
                echo "Nenhum arquivo foi enviado.";
            }
            exit;
        }
    }
} else {
    echo "Método de requisição inválido.";
}
