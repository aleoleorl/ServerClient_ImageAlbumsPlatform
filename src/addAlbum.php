<?php
require_once 'handlerSQL.php';

class AddAlbum extends HandlerSQL 
{	
    public function handleData(array $args)
	{	
        try
        {
            $user = $args[0];
            $name = $args[1];
            $desc = $args[2];
        } catch(Exception $e)
        {
            return "wrong values";
        }

        $userId = $this->checkUserExists($user);
        if (!$userId) 
        {
            return "user doesn't exist";
        }

        if (!$this->checkAlbumNameFree($name)) 
        {
            return "album with this name already exists";
        }
        
        return $this->createAnAlbum($userId, $name, $desc);
    } 
    
    private function checkUserExists($login)
    {
        $query = "SELECT id FROM users WHERE login = :login";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':login', $login);
        $stmt->execute();

        if ($stmt->rowCount() == 0) 
        {
            return false;
        }

        return $stmt->fetch(PDO::FETCH_ASSOC)['id'];
    }

    private function checkAlbumNameFree($name)
    {
        $query = "SELECT * FROM albums WHERE name = :name";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->execute();

        if ($stmt->rowCount() > 0) 
        {
            return false;
        }
        return true;
    }

    private function createAnAlbum($userId, $name, $desc)
    {
        try
        {
            $query = "INSERT INTO albums (name, description, creator) VALUES (:name, :desc, :userId)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':desc', $desc);
            $stmt->bindParam(':userId', $userId);
            
            if ($stmt->execute()) 
            {
                $albumId = $this->conn->lastInsertId();

                $likesTable = "albId" . $albumId . "_likes";
                $query = "CREATE TABLE IF NOT EXISTS $likesTable (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    imageId INT,
                    userId INT,
                    userVal INT
                )";
                $this->conn->exec($query);

                $commentsTable = "albId" . $albumId . "_comments";
                $query = "CREATE TABLE IF NOT EXISTS $commentsTable (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    imageId INT,
                    userId INT,
                    comment TEXT(1024),
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";
                $this->conn->exec($query);
            }

            return 0;
        } catch(Exception $e)
        {
            return "issue during album handling";
        }
    }
}
?>