<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer-6.8.1/src/Exception.php';
require './PHPMailer-6.8.1/src/PHPMailer.php';
require './PHPMailer-6.8.1/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = filter_input(INPUT_POST, "nome", FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
    $telefone = filter_input(INPUT_POST, "telefone", FILTER_SANITIZE_STRING);
    $mensagem = filter_input(INPUT_POST, "mensagem", FILTER_SANITIZE_STRING);

    $contato = "<p><b>Nome:</b></p> $nome\n";
    $contato = "<p><b>Email:</b></p> $email\n";
    $contato = "<p><b>Telefone:</b></p> $telefone\n";
    $contato = "<p><b>Mensagem:</b></p> $mensagem\n";

    // Cria uma instância do PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor
        $mail->SMTPDebug = 0; // Enable verbose debug output
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
        $mail->Subject = "Novo contato";
        $mail->Body    = $contato;

        
        $mail->send();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false]);
    }
} else {
    echo "Método de requisição inválido.";
}
?>