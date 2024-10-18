-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: cit_album
-- ------------------------------------------------------
-- Server version	8.4.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albid1_comments`
--

DROP TABLE IF EXISTS `albid1_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albid1_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `comment` text,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albid1_comments`
--

LOCK TABLES `albid1_comments` WRITE;
/*!40000 ALTER TABLE `albid1_comments` DISABLE KEYS */;
INSERT INTO `albid1_comments` VALUES (1,1,1,'Comment 1','2024-10-17 13:00:17'),(2,1,1,'comm 2','2024-10-17 13:02:27'),(3,1,1,'comment 3','2024-10-18 10:35:00'),(4,1,1,'comment 4','2024-10-18 10:35:05'),(5,1,1,'comment 5','2024-10-18 10:35:11'),(6,1,1,'comment 6','2024-10-18 10:35:13'),(7,1,1,'comment 7','2024-10-18 11:23:56'),(8,5,1,'comment to this image','2024-10-18 11:46:59'),(9,5,1,'something to say 2.','2024-10-18 11:48:33'),(10,5,1,'check 3','2024-10-18 11:51:44'),(11,5,1,'check 4','2024-10-18 11:51:54'),(12,5,1,'check 5','2024-10-18 11:51:59');
/*!40000 ALTER TABLE `albid1_comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-18 15:17:20
