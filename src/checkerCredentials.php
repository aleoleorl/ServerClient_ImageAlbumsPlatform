<?php
require_once 'handlerSQL.php';

class CheckerCredentials extends HandlerSQL 
{	
    public function handleData(array $args)
	{	
        try
        {
            $login = $args[0];
            $password = $args[1];
        } catch(Exception $e)
        {
            return false;
        }

		$query = "SELECT * FROM users WHERE login = :login LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':login', $login);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row)
        {
            if (password_verify($password, $row['password']))
            {
                return $row['id'];
            } else 
            {
                return false;
            }
        }
    } 
}
?>