<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'assets/php/PHPMailer-6.8.1/src/Exception.php';
require 'assets/php/PHPMailer-6.8.1/src/PHPMailer.php';
require 'assets/php/PHPMailer-6.8.1/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Capturar e validar dados do formulário
    $termo_documento = isset($_POST["termo_documento"]) ? "Aceito" : "Não aceito";
    $termo_condicoes = isset($_POST["termo_condicoes"]) ? "Aceito" : "Não aceito";
    $termo_privacidade = isset($_POST["termo_privacidade"]) ? "Aceito" : "Não aceito";
    $termo_avulso = isset($_POST["termo_avulso"]) ? "Aceito" : 'Não existente';

    $pessoaMarca = filter_input(INPUT_POST, "pessoaMarca", FILTER_SANITIZE_STRING);
    if (empty($pessoaMarca)) {
        echo "Tipo de pessoa/marca é obrigatório.";
        exit;
    }

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

    // 3. Verificar Erros de Upload
    if ($_FILES["fileInput"]["error"] !== UPLOAD_ERR_OK) {
        die('Erro no upload do arquivo.');
    }

    // 1. Validar o Tipo de Arquivo
    $allowedMimeTypes = ['image/jpeg', 'image/jpg'];
    if (!in_array($_FILES['fileInput']['type'], $allowedMimeTypes)) {
        die('Tipo de arquivo não permitido.');
    }

    // 6. Limpar Nomes de Arquivos
    $filename = basename($_FILES['fileInput']['name']);
    $filename = preg_replace("/[^A-Z0-9._-]/i", "_", $filename);

    // Lidar com o upload de arquivos
    $mensagem .= "Arquivo Enviado: $filename\n";

    $mail = new PHPMailer(true);

    try {
        // // Configurações do servidor
        // $mail->isSMTP();                                            
        // $mail->Host       = 'smtp.seudominio.com';                    
        // $mail->SMTPAuth   = true;                                   
        // $mail->Username   = 'carrinho@ideafy.com.br';                     
        // $mail->Password   = 'sua_senha';                              
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         
        // $mail->Port       = 587;                                    

        // Destinatários
        $mail->setFrom('carrinho@ideafy.com.br', 'Mailer');
        $mail->addAddress('lucaswan09@gmail.com');     

        // Anexos
        $mail->addAttachment($_FILES['fileInput']['tmp_name'], $filename);         

        // Conteúdo
        $mail->isHTML(true);                                  
        $mail->Subject = "Novo pedido - $planoSelecionado";
        $mail->Body    = nl2br($mensagem);
        $mail->AltBody = strip_tags($mensagem);

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
