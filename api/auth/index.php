<?php
require_once '../../src/sessionManager.php';
require_once '../../src/checkerCredentials.php';

$sessionManager = new SessionManager();
$sessionManager->startSession();

if (!$sessionManager->checkInactivity()) 
{
    echo json_encode(['success' => false, 'message' => 'Session expired due to inactivity']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    $login = $_POST['login'];
    $password = $_POST['password'];

    $checker = new CheckerCredentials();
    $result = $checker->handleData([$login, $password]);
    if ($result) 
    {
        session_regenerate_id(true);
        $_SESSION['login'] = $login;
        echo json_encode(['status' => 'OK', 'message' => "welcome", 'id' => $result]);
    } else 
    {
        echo json_encode(['status' => 'NOK', 'message' => "Wrong credentials"]);
    }
}
?>