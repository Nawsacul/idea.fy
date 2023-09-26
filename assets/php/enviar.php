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
    $mensagem = "<p><b>Termo de Documento:</b></p> $termo_documento\n";
    $mensagem .= "<p><b>Termo de Condições:</b></p> $termo_condicoes\n";
    $mensagem .= "<p><b>Termo de Privacidade:</b></p> $termo_privacidade\n";
    $mensagem .= "<p><b>Termo Avulso:</b></p> $termo_avulso\n";

    $mensagem .= "<p><b>Quem vai registrar a marca?:</b></p> $pessoaMarca\n";

    if (!empty($nomeCompleto) && !empty($cpf)) {
        $mensagem .= "<p><b>Nome Completo:</b></p> $nomeCompleto\n";
        $mensagem .= "<p><b>CPF:</b></p> $cpf\n";
    }

    if (!empty($razaoSocial) && !empty($porteEmpresa) && !empty($cnpj)) {
        $mensagem .= "<p><b>Razão Social:</b></p> $razaoSocial\n";
        $mensagem .= "<p><b>Porte da Empresa:</b></p> $porteEmpresa\n";
        $mensagem .= "<p><b>CNPJ:</b></p> $cnpj\n";
    }

    $mensagem .= "<p><b>CEP:</b></p> $cep\n";
    $mensagem .= "<p><b>Endereço:</b></p> $endereco\n";
    $mensagem .= "<p><b>Telefone:</b></p> $telefone\n";
    $mensagem .= "<p><b>Email:</b></p> $email\n";
    $mensagem .= "<p><b>Como você prefere que a gente entre em contato?</b></p> $dadosPessoais\n";

    $mensagem .= "<p><b>Atividades:</b></p> $atividades\n";

    $mensagem .= "<p><b>Nome da Marca:</b></p> $nomeMarca\n";
    $mensagem .= "<p><b>Língua Estrangeira:</b></p> $linguaEstrangeira\n";
    $mensagem .= "<p><b>Tradução:</b></p> $traducao\n";
    $mensagem .= "<p><b>Como a Marca é Utilizada:</b></p> $comoMarcaUtilizada\n";

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
        if (isset($_FILES["fileInput"])) {
            if ($_FILES["fileInput"]["error"] == UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES["fileInput"]["tmp_name"];
                $fileName = $_FILES["fileInput"]["name"];
                $mail->addAttachment($fileTmpPath, $fileName);
                $mensagem .= "Arquivo Enviado: $fileName\n";
            } else {
                // Adiciona uma mensagem de erro ao e-mail se o upload falhar
                $mensagem .= "Erro no upload do arquivo: " . $_FILES["fileInput"]["error"] . "\n";
            }
        } else {
            $mensagem .= "Nenhum arquivo enviado.\n";
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