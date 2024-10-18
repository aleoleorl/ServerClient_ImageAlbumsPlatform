<?php
require_once 'handlerSQL.php';
require_once 'sessionManager.php';

class AddLike extends HandlerSQL 
{	
    public function handleData(array $args)
	{	
        $sessionManager = new SessionManager();
        try 
        {
            $user = $args[0];
            $albumName = $args[1];
            $imageId = $args[2];
            $val = intval($args[3]);

            // 0. Check if $val is -1 or 1
            if ($val !== -1 && $val !== 1) 
            {
                return "not a correct value: " . $val;
            }

            // 1. Check if album exists and get its id
            $query = "SELECT id FROM albums WHERE name = :albumName";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':albumName', $albumName);
            $stmt->execute();
            $album = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$album) 
            {
                return "album not found";
            }

            $albumId = $album['id'];

            // 2. Get userId from users table
            $query = "SELECT id FROM users WHERE login = :user";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user', $user);
            $stmt->execute();
            $userRow = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$userRow) 
            {
                return "user not found"; 
            }

            $userId = $userRow['id'];

            // 3. Find if like already exists
            $likesTable = "albid" . $albumId . "_likes";
            $query = "SELECT * FROM $likesTable WHERE imageId = :imageId AND userId = :userId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':imageId', $imageId);
            $stmt->bindParam(':userId', $userId);
            $stmt->execute();
            $like = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$like) 
            {
                // 4. Insert new like
                $query = "INSERT INTO $likesTable (imageId, userId, userVal) VALUES (:imageId, :userId, :val)";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':imageId', $imageId);
                $stmt->bindParam(':userId', $userId);
                $stmt->bindParam(':val', $val);
                $stmt->execute();

                // Add to session variable list
                $sessionManager->addValuesToList($imageId, $val);

                return 0;
            } else 
            {
                // 5. Update existing like
                if ($like['userVal'] == 0) 
                {
                    $query = "UPDATE $likesTable SET userVal = :val WHERE id = :id";
                    $stmt = $this->conn->prepare($query);
                    $stmt->bindParam(':val', $val);
                    $stmt->bindParam(':id', $like['id']);
                    $stmt->execute();

                    if (!$sessionManager->valueExists($imageId, $val)) 
                    {
                        $sessionManager->addValuesToList($imageId, $val);
                    } else 
                    {
                        $sessionManager->updateSessionVariable($imageId, $val);
                    }
                } else 
                {
                    if (!$sessionManager->valueExists($imageId, $val)) 
                    {
                        return "already set in one of previous sessions";
                    } else 
                    {
                        if ($like['userVal'] == $val) 
                        {
                            $query = "UPDATE $likesTable SET userVal = 0 WHERE id = :id";
                            $stmt = $this->conn->prepare($query);
                            $stmt->bindParam(':id', $like['id']);
                        } else
                        {
                            $query = "UPDATE $likesTable SET userVal = :val WHERE id = :id";
                            $stmt = $this->conn->prepare($query);
                            $stmt->bindParam(':val', $val);
                            $stmt->bindParam(':id', $like['id']);
                        }

                        $stmt->execute();
                        $sessionManager->updateSessionVariable($imageId, $val);

                        return 0;
                    }
                }
            }
        } catch (Exception $e)
        {
            error_log("Error in AddLike: " . $e);
            return "error" . $e;
        }

    }
}
?>