<?php
require_once '../../src/sessionManager.php';
require_once '../../src/addComment.php';

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
    $imageId = $_POST['imageId'];
    $comment = $_POST['comment'];

    $checker = new AddComment();
    $result = $checker->handleData([$user, $imageId, $comment]);
    if ($result) 
    {
        echo json_encode(['status' => 'OK', 'message' => "comment created"]);
    } else
    {
        echo json_encode(['status' => 'NOK', 'message' => "comment can't be created"]);
    }
}
?>