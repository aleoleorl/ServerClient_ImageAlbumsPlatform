<?php
require_once '../../src/sessionManager.php';
require_once '../../src/ImageHandler.php';

$sessionManager = new SessionManager();
$sessionManager->startSession();

if ($sessionManager->checkInactivity()) 
{
    session_regenerate_id(true);
}

header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$imageId = $_GET['imageId'] ?? '';
$imageHandler = new ImageHandler(__DIR__ . '/../../img');

$imageUrl = $imageHandler->handleData([$imageId]);

if ($imageUrl) 
{
    echo json_encode(['imageUrl' => $imageUrl]);
} else 
{
    http_response_code(404);
    echo json_encode(['error' => 'Image not found']);
}
?>