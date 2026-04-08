<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /#contact-formulaire');
    exit;
}

$to = 'can.sarreguemines@gmail.com';

function clean($value) {
    return trim(str_replace(["\r", "\n"], ' ', strip_tags($value ?? '')));
}

$name = clean($_POST['name'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$subject = clean($_POST['subject'] ?? '');
$message = trim(strip_tags($_POST['message'] ?? ''));

if (!$name || !$email || !$subject || !$message) {
    header('Location: /?contact=error#contact-formulaire');
    exit;
}

$email_subject = '[CAN Sarreguemines] ' . $subject;

$body = "Nouveau message depuis le site Courez Avec Nous\n\n";
$body .= "Nom : " . $name . "\n";
$body .= "Email : " . $email . "\n";
$body .= "Sujet : " . $subject . "\n\n";
$body .= "Message :\n" . $message . "\n";

$headers = [];
$headers[] = 'From: CAN Site <no-reply@courezavecnous.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = @mail($to, $email_subject, $body, implode("\r\n", $headers));

if ($sent) {
    header('Location: /?contact=ok#contact-formulaire');
} else {
    header('Location: /?contact=error#contact-formulaire');
}
exit;
?>