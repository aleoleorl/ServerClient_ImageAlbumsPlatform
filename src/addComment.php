<?php
require_once 'handlerSQL.php';

class AddComment extends HandlerSQL 
{	
    public function handleData(array $args)
	{	
        try
        {
            $user = $args[0];
            $imageId = $args[1];
            $comment = $args[2];
        } catch(Exception $e)
        {
            return false;
        }
        
        if (strlen($comment) > 1024) 
        {
            $comment = substr($comment, 0, 1024);
        }

        try
        {
            // Get albumId from images table
            $query = "SELECT albumId FROM images WHERE id = :imageId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':imageId', $imageId);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) 
            {
                return false; // Image not found
            }

            $albumId = $row['albumId'];

            // Get userId from users table
            $query = "SELECT id FROM users WHERE login = :user";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user', $user);
            $stmt->execute();
            $userRow = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$userRow) 
            {
                return false; // User not found
            }

            $userId = $userRow['id'];

            // Insert comment into comments table
            $commentsTable = "albId" . $albumId . "_comments";
            $query = "INSERT INTO $commentsTable (imageId, userId, comment, date) VALUES (:imageId, :userId, :comment, NOW())";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':imageId', $imageId);
            $stmt->bindParam(':userId', $userId);
            $stmt->bindParam(':comment', $comment);
            $stmt->execute();

            return true;
        } catch (Exception $e) 
        {
            error_log("Error in AddComment: " . $e->getMessage());
            return false;
        }
    }
}
?>