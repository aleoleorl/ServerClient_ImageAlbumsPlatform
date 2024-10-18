<?php
require_once '../../src/sessionManager.php';
require_once '../../src/addAlbum.php';

$sessionManager = new SessionManager();
$sessionManager->startSession();

if (!$sessionManager->checkInactivity()) 
{
    echo json_encode(['success' => false, 'message' => 'Session expired due to inactivity']);
    exit();
}
session_regenerate_id(true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    $user = $_POST['user'];
    $name = $_POST['name'];
    $desc = $_POST['desc'];

    $checker = new AddAlbum();
    $result = $checker->handleData([$user, $name, $desc]);
    if ($result == 0) 
    {        
        echo json_encode(['status' => 'OK', 'message' => "album created"]);
    } else
    {
        echo json_encode(['status' => 'NOK', 'message' => "an issue:" . $result]);
    }
}
?>