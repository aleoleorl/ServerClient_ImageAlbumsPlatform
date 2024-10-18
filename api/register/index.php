<?php
require_once '../../src/sessionManager.php';
require_once '../../src/addUser.php';

$sessionManager = new SessionManager();
$sessionManager->startSession();
if (!$sessionManager->checkInactivity()) 
{
    $sessionManager->checkAndCloseSession();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    $login = $_POST['login'];
    $password = $_POST['password'];
    $email = $_POST['mail'];

    $checker = new AddUser();
    $result = $checker->handleData([$login, $password, $email]);
    if ($result) 
    {
        session_regenerate_id(true);
        $_SESSION['login'] = $login;
        echo json_encode(['status' => 'OK', 'message' => "registered"]);
    } else 
    {
        echo json_encode(['status' => 'NOK', 'message' => "can't register:" . $result]);
    }
}
?>