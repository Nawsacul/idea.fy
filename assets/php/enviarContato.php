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
        
        $mail->setFrom($email, $nome);
        $mail->addAddress('lucaswan09@gmail.com'); // Endereço de email do destinatário
        $mail->Subject = "Nova Mensagem de Contato";
        $mail->Body    = "Nome: $nome\nEmail: $email\nTelefone: $telefone\n\nMensagem:\n$mensagem";
        
        $mail->send();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false]);
    }
} else {
    echo "Método de requisição inválido.";
}
?>
