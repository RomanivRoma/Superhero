CREATE DATABASE  IF NOT EXISTS `superhero_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `superhero_app`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: superhero_app
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `superheroes`
--

DROP TABLE IF EXISTS `superheroes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `superheroes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(60) DEFAULT NULL,
  `real_name` varchar(60) DEFAULT NULL,
  `origin_description` varchar(255) DEFAULT NULL,
  `superpowers` varchar(150) DEFAULT NULL,
  `catch_phrase` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superheroes`
--

LOCK TABLES `superheroes` WRITE;
/*!40000 ALTER TABLE `superheroes` DISABLE KEYS */;
INSERT INTO `superheroes` VALUES (1,'Superman','Clark Kent','he was born Kal-El on the planet Krypton, before being rocketed to\nEarth as an infant by his scientist father Jor-El, moments before Krypton\'s destruction...','solar energy absorption and healing factor, solar flare and heat vision,\nsolar invulnerability, flight...','“Look, up in the sky, it\'s a bird, it\'s a plane, it\'s Superman!”'),(117,'Batman','Bruce Wayne','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam','Qeqwrq qwr qwr qwrq','Afasdas sdas fasf asf asfas'),(118,'Spider-Man','Peter Parker','voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa','Adas zxcz fasfa sfa sfa','qweqwr qwr qwrqwr qwrq '),(119,'Captain America','Steve Rogers','Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Klkfl as  jhjhjaks as a','Oinoni ionoasdasf asd');
/*!40000 ALTER TABLE `superheroes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suphero_img`
--

DROP TABLE IF EXISTS `suphero_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suphero_img` (
  `id_img` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  `id_superhero` int DEFAULT NULL,
  PRIMARY KEY (`id_img`),
  KEY `id_superhero` (`id_superhero`),
  CONSTRAINT `id_superhero` FOREIGN KEY (`id_superhero`) REFERENCES `superheroes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suphero_img`
--

LOCK TABLES `suphero_img` WRITE;
/*!40000 ALTER TABLE `suphero_img` DISABLE KEYS */;
INSERT INTO `suphero_img` VALUES (3,'superman1.jpg',1),(4,'superman2.jpg',1),(129,'batman1.jpg',117),(130,'batman2.jpg',117),(131,'spiderma2.jpg',118),(132,'spiderman1.jpg',118),(133,'Captain America1.jpg',119),(134,'Captain America2.jpg',119);
/*!40000 ALTER TABLE `suphero_img` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-31 11:26:47
