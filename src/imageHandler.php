<?php
require_once 'handlerSQL.php';

class ImageHandler  extends HandlerSQL 
{
    private $baseDir;

    public function __construct($baseDir) 
    {
        parent::__construct();
        $this->baseDir = realpath($baseDir);
    }

    public function handleData(array $args)
    {
        $imageId = $args[0];

        $query = "SELECT imageName FROM images WHERE id = :imageId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':imageId', $imageId);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) 
        {
            return null;
        }
        
        $imageName = $row['imageName'];

        $imagePath = realpath($this->baseDir . '/' . $imageName);

        if ($imagePath && file_exists($imagePath) && strpos($imagePath, $this->baseDir) === 0) 
        {
            return 'img/' . $imageName;
        } 
        else 
        {
            return null;
        }
    }
}
?>