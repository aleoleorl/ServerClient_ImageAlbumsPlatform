<?php
require_once '../../src/sessionManager.php';
require_once '../../src/getAlbums.php';

$sessionManager = new SessionManager();
$sessionManager->startSession();

if ($sessionManager->checkInactivity()) 
{
    session_regenerate_id(true);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') 
{
    $checker = new GetAlbums();
    $result = $checker->handleData([]);
    echo json_encode(['status' => 'OK', 'albums' => $result]);
}
?>