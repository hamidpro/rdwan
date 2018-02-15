-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: codebar
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `nom_admin` varchar(20) NOT NULL,
  `prenom_admin` varchar(20) NOT NULL,
  `tel1_admin` varchar(12) DEFAULT NULL,
  `tel2_admin` varchar(12) DEFAULT NULL,
  `fax1_admin` varchar(12) DEFAULT NULL,
  `fax2_admin` varchar(12) DEFAULT NULL,
  `email_admin` varchar(100) NOT NULL,
  `adresse_admin` varchar(255) DEFAULT NULL,
  `code_postal_admin` varchar(15) DEFAULT NULL,
  `id_magasin` int(11) DEFAULT NULL,
  `passwordd` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id_admin`),
  KEY `fk_magasin1` (`id_magasin`),
  CONSTRAINT `fk_magasin1` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_inventory`
--

DROP TABLE IF EXISTS `article_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article_inventory` (
  `id_article_inventory` int(11) NOT NULL AUTO_INCREMENT,
  `id_inventory` int(11) NOT NULL,
  `id_article` int(11) NOT NULL,
  `date_article_inventory` datetime DEFAULT NULL,
  PRIMARY KEY (`id_article_inventory`),
  KEY `fk_article_invetory` (`id_inventory`),
  KEY `fk_inventory_article` (`id_article`),
  CONSTRAINT `fk_article_invetory` FOREIGN KEY (`id_inventory`) REFERENCES `inventory` (`id_inventory`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_article` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_inventory`
--

LOCK TABLES `article_inventory` WRITE;
/*!40000 ALTER TABLE `article_inventory` DISABLE KEYS */;
INSERT INTO `article_inventory` VALUES (9,1,1,NULL),(23,15,33,NULL),(28,19,36,NULL),(29,19,36,NULL),(30,1,36,NULL);
/*!40000 ALTER TABLE `article_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id_article` int(11) NOT NULL AUTO_INCREMENT,
  `reference_article` varchar(50) DEFAULT NULL,
  `pays_article` varchar(50) DEFAULT NULL,
  `prix_ht_entree_article` double NOT NULL,
  `marque_article` varchar(50) DEFAULT NULL,
  `prix_ttc_entree_article` double DEFAULT NULL,
  `libelle_article` varchar(50) DEFAULT NULL,
  `Date_entree_article` datetime DEFAULT NULL,
  `date_de_sortie_article` datetime DEFAULT NULL,
  `fabriquant_article` varchar(50) DEFAULT NULL,
  `prix_ht_sortie_article` double DEFAULT NULL,
  `fournisseur_article` varchar(50) DEFAULT NULL,
  `prix_ttc_sortie_article` double DEFAULT NULL,
  `client_article` varchar(50) DEFAULT NULL,
  `categorie_article` varchar(50) DEFAULT NULL,
  `description_article` varchar(500) DEFAULT NULL,
  `type_article` varchar(50) DEFAULT NULL,
  `famille_article` varchar(50) DEFAULT NULL,
  `id_magasin` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_article`),
  KEY `fk_articles` (`id_magasin`),
  CONSTRAINT `fk_articles` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'RF123','Maroc',1,'dell',2,'pc dell','2017-03-03 15:12:00','2017-03-03 15:12:00','dell company',3,'ahmed fournisseur',4,'client 1','categorie2','pc dell Ram 8G ...','type1','famille1',1,NULL),(3,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie1','table KIA grande taille ...','type2','famille2',1,NULL),(4,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie1','table KIA grande taille ...','type1','famille1',1,NULL),(5,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie1','table KIA grande taille ...','type1','famille1',1,NULL),(6,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie1','table KIA grande taille ...','type1','famille1',1,NULL),(7,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie2','table KIA grande taille ...','type2','famille2',1,NULL),(8,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie3','table KIA grande taille ...','type3','famille3',1,NULL),(9,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie3','table KIA grande taille ...','type3','famille3',1,NULL),(10,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie3','table KIA grande taille ...','type3','famille3',1,NULL),(11,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie3','table KIA grande taille ...','type3','famille3',1,NULL),(12,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie3','table KIA grande taille ...','type3','famille3',1,NULL),(13,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(14,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(15,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(16,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(17,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(18,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(19,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(20,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(21,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(22,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(23,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(24,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(25,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie4','table KIA grande taille ...','type4','famille4',1,NULL),(26,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie5','table KIA grande taille ...','type4','famille4',1,NULL),(27,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie5','table KIA grande taille ...','type4','famille4',1,NULL),(28,'ref3','Maroc',100,'KIA',200,'table KIA','2017-04-03 11:12:00','2017-04-03 12:12:00','KIA company',300,'mohmmed fournisseur',400,'client said','categorie5','table KIA grande taille ...','type4','famille4',1,NULL),(30,'','Maroc',0,'KIA',0,'ggg','2017-01-01 00:00:00','2017-01-01 00:00:00','g',0,'g',0,'g','categorie4','g','type4','famille2',1,NULL),(31,NULL,'Maroc',0,'dell',0,'jkjj','2017-01-01 00:00:00','2017-01-01 00:00:00','jkjk',0,'jkj',0,'jkj','categorie3','j','type4','famille5',1,NULL),(32,NULL,'Maroc',0,'dell',0,'jjkjkjk','2017-01-01 00:00:00','2017-01-01 00:00:00','jk',0,'jk',0,'jk','categorie1','dede','type5','famille4',1,NULL),(33,'RF1234','Maroc',0,'dell',0,'frfr','2017-01-01 00:00:00','2017-01-01 00:00:00','frfr',0,'frfr',0,'frfr','categorie2','frfr','type5','famille4',1,NULL),(34,'RF1234','Maroc',0,'dell',0,'gr','2017-01-01 00:00:00','2017-01-01 00:00:00','ggr',0,'frr',0,'grgr','categorie4','grgr','type2','famille4',1,NULL),(35,'RF1234','Maroc',0,'dell',0,'rgrg','2017-01-01 00:00:00','2017-01-01 00:00:00','rggrg',0,'grgrg',0,'grgr','categorie2','rnr','type3','famille2',1,NULL),(36,'RF12345','Maroc',0,'dell',0,'eded','2017-01-01 00:00:00','2017-01-01 00:00:00','dede',0,'dede',0,'dede','categorie2','dede','type4','famille2',1,1);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `id_inventory` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `location` varchar(500) DEFAULT NULL,
  `id_magasin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_inventory`),
  KEY `fk_inventory_magasin` (`id_magasin`),
  CONSTRAINT `fk_inventory_magasin` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'2015-03-01 02:02:00','2017-01-01 00:00:00','salleTP',1),(15,'2017-01-01 00:00:00','2017-01-01 00:00:00','gggg',1),(19,'2017-01-01 00:00:00','2017-01-01 00:00:00','dede',1);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `magasin`
--

DROP TABLE IF EXISTS `magasin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `magasin` (
  `id_magasin` int(11) NOT NULL AUTO_INCREMENT,
  `adresse_magasin` varchar(255) DEFAULT NULL,
  `tel1_magasin` varchar(12) DEFAULT NULL,
  `tel2_magasin` varchar(12) DEFAULT NULL,
  `fax1_magasin` varchar(12) DEFAULT NULL,
  `fax2_magasin` varchar(12) DEFAULT NULL,
  `email_magasin` varchar(100) DEFAULT NULL,
  `position_map_magasin` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_magasin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `magasin`
--

LOCK TABLES `magasin` WRITE;
/*!40000 ALTER TABLE `magasin` DISABLE KEYS */;
INSERT INTO `magasin` VALUES (1,'123 meknes','0620206554','0636013366','0528937878','057337783','aitelcaidhmad@gmail.com','123.33;225.23');
/*!40000 ALTER TABLE `magasin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametres`
--

DROP TABLE IF EXISTS `parametres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parametres` (
  `id_parametre` int(11) NOT NULL AUTO_INCREMENT,
  `key_name` varchar(50) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  `id_magasin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_parametre`),
  KEY `fk_parametres_magasin` (`id_magasin`),
  CONSTRAINT `fk_parametres_magasin` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametres`
--

LOCK TABLES `parametres` WRITE;
/*!40000 ALTER TABLE `parametres` DISABLE KEYS */;
INSERT INTO `parametres` VALUES (1,'categorie','categorie1,categorie2,categorie3,categorie4,categorie5',1),(2,'famille','famille1,famille2,famille3,famille4,famille5,famille6',1),(3,'type','type1,type2,type3,type4,type5',1),(4,'marque','dell,KIA',1);
/*!40000 ALTER TABLE `parametres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nom_user` varchar(20) NOT NULL,
  `prenom_user` varchar(20) NOT NULL,
  `tel1_user` varchar(12) DEFAULT NULL,
  `tel2_user` varchar(12) DEFAULT NULL,
  `email_user` varchar(100) NOT NULL,
  `ville_user` varchar(30) DEFAULT NULL,
  `adresse_user` varchar(255) DEFAULT NULL,
  `code_postal_user` varchar(15) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_magasin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_magasin` (`id_magasin`),
  CONSTRAINT `fk_magasin` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'AIT EL CAID','mohmmed','0620206554','0636013366','aitelcaidhmad@gmail.com','Mohammedia','N 123 RIAD SALAM MOHAMMEDIA','5000','admin','admin',1),(7,'dawo','ali','07878376','07676763','dawo.com','','rissani','50000','ali','ali',1),(8,'kl','kllk','kl','kl','klkl','','lkkl','kl','kl','kl',1),(9,'aloui','Mohmmed','07787878','00000000000','alaoui@gmail.fr','','fes','25000','mohmed','mohmed',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-28 18:58:39
