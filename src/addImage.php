<?php
require_once 'handlerSQL.php';

class AddImage extends HandlerSQL 
{	
    public function handleData(array $args)
	{	
        try 
        {
            $currentAlbum = $args[0];
            $currentUser = $args[1];
            $defaultName = $args[2];
            $imageName = $args[3];
            $imageData = $args[4];

            // Extract file extension from defaultName
            $fileExtension = pathinfo($defaultName, PATHINFO_EXTENSION);

            // 1. Find album ID
            $query = "SELECT id FROM albums WHERE name = :name";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $currentAlbum);
            $stmt->execute();
            $albumId = $stmt->fetch(PDO::FETCH_ASSOC)['id'];

            // 2. Find user ID
            $query = "SELECT id FROM users WHERE login = :login";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':login', $currentUser);
            $stmt->execute();
            $userId = $stmt->fetch(PDO::FETCH_ASSOC)['id'];

            // 3. Insert new image record
            $query = "INSERT INTO images (name, albumId, userId, imageName) VALUES (:name, :albumId, :userId, :imageName)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $imageName);
            $stmt->bindParam(':albumId', $albumId);
            $stmt->bindParam(':userId', $userId);
            $imageNamePlaceholder = 'img';
            $stmt->bindParam(':imageName', $imageNamePlaceholder);
            $stmt->execute();
            
            $newImageId = $this->conn->lastInsertId();
            $newImageName = "img_" . $albumId . "_" . $newImageId . "." . $fileExtension;

            // 4. Update image name in database
            $query = "UPDATE images SET imageName = :newImageName WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':newImageName', $newImageName);
            $stmt->bindParam(':id', $newImageId);
            $stmt->execute();

            // 5. Save image to server
            $uploadDirectory = '../../img/';
            move_uploaded_file($imageData, $uploadDirectory . $newImageName);

            return 0; // Success
        } catch (Exception $e) 
        {
            error_log("Error in AddImage: " . $e->getMessage());
            return 1; // Error
        }
    }
}
?>