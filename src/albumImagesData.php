<?php
require_once 'handlerSQL.php';

class AlbumImagesData extends HandlerSQL 
{	
    public function handleData(array $args)
	{	
        $albumName = $args[0];
        $responseData = [];

        try 
        {
            // 1. Find album ID
            $query = "SELECT id FROM albums WHERE name = :name";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $albumName);
            $stmt->execute();
            $album = $stmt->fetch(PDO::FETCH_ASSOC);
            $albumId = $album['id'];
            $responseData['albumId'] = $albumId;

            // 2. Get images data
            $query = "SELECT id, name, imageName FROM images WHERE albumId = :albumId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':albumId', $albumId);
            $stmt->execute();
            $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $responseData['images'] = $images;

            $imageIds = array_column($images, 'id');

            if (!empty($imageIds)) 
            {
                // 3. Get likes data
                $likesTable = "albid" . $albumId . "_likes";
                $query = "SELECT * FROM $likesTable WHERE imageId IN (" . implode(',', $imageIds) . ")";
                $stmt = $this->conn->prepare($query);
                $stmt->execute();
                $likes = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $responseData['likes'] = $likes;

                // 4. Get comments data
                $commentsTable = "albid" . $albumId . "_comments";
                $query = "SELECT * FROM $commentsTable WHERE imageId IN (" . implode(',', $imageIds) . ")";
                $stmt = $this->conn->prepare($query);
                $stmt->execute();
                $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

                // 5. Replace userId with login in comments
                foreach ($comments as &$comment) 
                {
                    $query = "SELECT login FROM users WHERE id = :userId";
                    $stmt = $this->conn->prepare($query);
                    $stmt->bindParam(':userId', $comment['userId']);
                    $stmt->execute();
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);

                    if ($user) 
                    {
                        $comment['userId'] = $user['login'];
                    }
                }

                $responseData['comments'] = $comments;
            }

            return $responseData;

        } catch (Exception $e) 
        {
            error_log("Error in AlbumImagesData: " . $e->getMessage());
            return ['status' => 'NOK', 'message' => 'Error retrieving album data'];
        }
    }
}
?>