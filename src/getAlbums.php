<?php
require_once 'handlerSQL.php';

class GetAlbums extends HandlerSQL 
{	
    public function handleData(array $args)
	{	
        $query = "SELECT name, description FROM albums";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $albums = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $albums;
    }    
}
?>