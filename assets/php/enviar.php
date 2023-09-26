<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Inclua os arquivos do PHPMailer
require './PHPMailer-6.8.1/src/Exception.php';
require './PHPMailer-6.8.1/src/PHPMailer.php';
require './PHPMailer-6.8.1/src/SMTP.php';


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

    // Cria uma instância do PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor
        $mail->SMTPDebug = 2; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'mail.ideafy.com.br'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'carrinho@ideafy.com.br'; // SMTP username
        $mail->Password = 'IdeaFyEmail2023.'; // SMTP password
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465; // TCP port to connect to

        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        // Remetente e destinatário
        $mail->setFrom('carrinho@ideafy.com.br', 'Webmaster');
        $mail->addAddress('lucaswan09@gmail.com'); // Add a recipient

        // Assunto e corpo do e-mail
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = "Novo pedido - Plano " . $planoSelecionado;
        $mail->Body    = $mensagem;

        // Anexar arquivo, se presente
        if (isset($_FILES["fileInput"]) && $_FILES["fileInput"]["error"] == UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES["fileInput"]["tmp_name"];
            $fileName = $_FILES["fileInput"]["name"];
            $mail->addAttachment($fileTmpPath, $fileName);
        }

        // Enviar e-mail
        $mail->send();
        header("Location: ../../envio-sucesso.html");
        exit;
    } catch (Exception $e) {
        header("Location: ../../404.shtml");
        exit;
    }
} else {
    echo "Método de requisição inválido.";
}
?>