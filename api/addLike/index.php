<?php
require_once '../../src/sessionManager.php';
require_once '../../src/addLike.php';

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
    $albumName = $_POST['albumName'];
    $imageId = $_POST['imageId'];
    $val = $_POST['val'];

    $checker = new AddLike();
    $result = $checker->handleData([$user, $albumName, $imageId, $val]);
    if ($result == 0) 
    {        
        echo json_encode(['status' => 'OK', 'message' => "like approved"]);
    } else
    {
        echo json_encode(['status' => 'NOK', 'message' => "like can't be approved: " . $result]);
    }
}
?>