<?php

require_once '../../src/sessionManager.php';

$sessionManager = new SessionManager();
$sessionManager->startSession();

if (!$sessionManager->checkInactivity()) 
{
    echo json_encode(['status' => 'NOK', 'message' => 'Session expired due to inactivity']);
    exit();
}

$sessionManager->destroySession();
echo json_encode(['status' => 'OK', 'message' => 'Session closed successfully']);

?>