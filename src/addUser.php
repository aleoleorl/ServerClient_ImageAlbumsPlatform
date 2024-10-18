<?php
require_once 'handlerSQL.php';

class AddUser extends HandlerSQL 
{	
    public function handleData(array $args)
	{		
        try
        {
            $login = $args[0];
            $password = $args[1];
            $email = $args[2];
            
            $result = $this->formatValidation($login, $email);
            if ($result != "OK")
            {
                return $result;
            }
        } catch(Exception $e)
        {
            return false;
        }
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);	

        $query = "INSERT INTO users (login, password, email) VALUES (:login, :password, :email)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':login', $login);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) 
        {
            return true;
        } else 
        {
            return false;
        }
    }    

    function formatValidation($login, $email)
    {
        if (strlen($login) > 127) 
        {
            return "Login exceeds maximum length of 127 characters.";
        }
        if (strlen($email) > 127) 
        {
            return "Email exceeds maximum length of 127 characters.";
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
        {
            return "Invalid email format.";
        }
        return "OK";
    }
}
?>