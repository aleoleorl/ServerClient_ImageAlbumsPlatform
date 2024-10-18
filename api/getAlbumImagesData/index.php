<?php
require_once '../../src/sessionManager.php';
require_once '../../src/albumImagesData.php';

$sessionManager = new SessionManager();
$sessionManager->startSession();

if ($sessionManager->checkInactivity()) 
{
    session_regenerate_id(true);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') 
{    
    $albumName = $_GET['albumName'];

    $handler = new AlbumImagesData();
    $result = $handler->handleData([$albumName]);

    echo json_encode($result);    
}
?>