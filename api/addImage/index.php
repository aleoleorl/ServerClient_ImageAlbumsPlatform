<?php
require_once '../../src/sessionManager.php';
require_once '../../src/addImage.php';

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
    $currentAlbum = $_POST['currentAlbum'];
    $currentUser = $_POST['currentUser'];
    $defaultName = $_POST['defaultName'];
    $imageName = $_POST['imageName'];
    $imageData = $_FILES['image']['tmp_name'];

    $handler = new AddImage();
    $result = $handler->handleData([$currentAlbum, $currentUser, $defaultName, $imageName, $imageData]);

    if ($result === 0) 
    {
        echo json_encode(['status' => 'OK', 'message' => 'Image uploaded successfully']);
    } else 
    {
        echo json_encode(['status' => 'NOK', 'message' => 'Error uploading image']);
    }
    
}
?>