<?php
require_once 'handlerDB.php';

abstract class HandlerSQL 
{
    protected $conn;

    public function __construct()
	{
		$database = new Database();
        $this->conn = $database->getConnection();
    }

    abstract public function handleData(array $args);
}
?>