
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
  `id_agence` int(11) DEFAULT NULL,
  `passwordd` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_admin`),
  KEY `fk_admin` (`id_agence`),
  CONSTRAINT `fk_admin` FOREIGN KEY (`id_agence`) REFERENCES `agence` (`id_agence`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'AIT EL CAID ','Hmad','0620206554','0636013366','0529282267','0529282267','aitelcaidhmad@gmail.com','Rue 2 BD 52 Mohamedia ','5000',1,'admin','admin'),(2,'nom_admin','prenom_admin','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_admin','adresse_admin','code_postal',1,'passwordd',NULL),(3,'nom_admin','prenom_admin','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_admin','adresse_admin','code_postal',1,'passwordd',NULL),(4,'nom_admin','prenom_admin','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_admin','adresse_admin','code_postal',1,'passwordd',NULL),(5,'nom_admin','prenom_admin','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_admin','adresse_admin','code_postal',1,'passwordd',NULL);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agence`
--

DROP TABLE IF EXISTS `agence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agence` (
  `id_agence` int(11) NOT NULL AUTO_INCREMENT,
  `adresse_agence` varchar(255) DEFAULT NULL,
  `tel1_agence` varchar(12) DEFAULT NULL,
  `tel2_agence` varchar(12) DEFAULT NULL,
  `fax1_agence` varchar(12) DEFAULT NULL,
  `fax2_agence` varchar(12) DEFAULT NULL,
  `email_agence` varchar(100) DEFAULT NULL,
  `position_map_agence` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_agence`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agence`
--

LOCK TABLES `agence` WRITE;
/*!40000 ALTER TABLE `agence` DISABLE KEYS */;
INSERT INTO `agence` VALUES (1,'adresse_agence','21262767626','21267878378','21252787827','21259099282','casalocation@gmail.com','33.582983,-7.619407'),(2,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence'),(3,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence'),(4,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence'),(5,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence'),(6,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence');
/*!40000 ALTER TABLE `agence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `id_location` int(11) NOT NULL AUTO_INCREMENT,
  `date_debut_location` datetime DEFAULT NULL,
  `date_fin_location` datetime DEFAULT NULL,
  `valider_location` tinyint(1) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_voiture` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_location`),
  KEY `fk_locaton1` (`id_user`),
  KEY `fk_locaton2` (`id_voiture`),
  CONSTRAINT `fk_locaton1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_locaton2` FOREIGN KEY (`id_voiture`) REFERENCES `voitures` (`id_voiture`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (3,'2016-12-01 11:11:00','2017-02-01 00:00:00',1,1,6),(4,'2016-12-01 11:11:00','2017-02-01 00:00:00',1,1,7),(5,'2016-12-01 11:11:00','2017-02-01 00:00:00',1,1,8),(6,'2016-12-01 11:11:00','2017-02-01 00:00:00',1,1,9);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `Id` varchar(50) NOT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES ('1','Go to Market tomorrow','done'),('2','Email to manager','pending'),('3','Push code to GitHub','done'),('4','Go For Running','done'),('5','Go to Movie','pending');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
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
  `id_admin` int(11) DEFAULT NULL,
  `passwordd` varchar(100) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_users` (`id_admin`),
  CONSTRAINT `fk_users` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nom_user','prenom_user','tel1_user','tel2_user','email_user','ville_user','adresse_user','code_postal',1,'pass',NULL),(2,'nom_user','prenom_user','tel1_user','tel2_user','email_user','ville_user','adresse_user','code_postal',1,'passwordd',NULL),(3,'nom_user','prenom_user','tel1_user','tel2_user','email_user','ville_user','adresse_user','code_postal',1,'passwordd',NULL),(7,'AIT EL CAID ','Hmad','0620206554','0636013366','aitelcaidhmad@gmail.com','Mohammedia','BD 2 RUE HASSAN ','5000',1,'hmad','hmadhmad'),(8,'AIT EL CAID','Mohmmed','21262782787','212627678783','Mohmmed@gmail.com','Rabat','Rue  n12  Agdal','36763',1,'pass',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voitures`
--

DROP TABLE IF EXISTS `voitures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `voitures` (
  `id_voiture` int(11) NOT NULL AUTO_INCREMENT,
  `marque_voiture` varchar(50) NOT NULL,
  `couleur_voiture` varchar(20) DEFAULT NULL,
  `date_sortie_voiture` varchar(6) DEFAULT NULL,
  `nombre_portes_voiture` int(11) DEFAULT NULL,
  `nombre_coussin_voiture` int(11) DEFAULT NULL,
  `nombre_personne_voiture` int(11) DEFAULT NULL,
  `nombre_kilometre_voiture` double DEFAULT NULL,
  `nombre_kilometre_limte` double DEFAULT NULL,
  `clim_dans_voiture` tinyint(1) DEFAULT NULL,
  `type_carbirant_voiture` varchar(30) DEFAULT NULL,
  `type_voiture` varchar(30) DEFAULT NULL,
  `boite_vitesse_voiture` varchar(20) DEFAULT NULL,
  `reservoire_voiture` varchar(7) DEFAULT NULL,
  `bagage_voiture` varchar(100) DEFAULT NULL,
  `prix_location_voiture` double DEFAULT NULL,
  `image_voiture` varchar(255) DEFAULT NULL,
  `commentaire_voiture` varchar(255) DEFAULT NULL,
  `model_voiture` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_voiture`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voitures`
--

LOCK TABLES `voitures` WRITE;
/*!40000 ALTER TABLE `voitures` DISABLE KEYS */;
INSERT INTO `voitures` VALUES (6,'LAMBORGHINI','couleur_voiture','2012',1,2,3,4.4,5.5,1,'gasoil','type_voiture','boite_vitesse','plein','bagage_voiture',400,'../assets/images/voiture1.jpg','commentaire_voiture','model_voiture'),(7,'LANCIA','couleur_voiture','2012',1,2,3,4.4,5.5,1,'gasoil','type_voiture','boite_vitesse','plein','bagage_voiture',400,'../assets/images/voiture2.jpg','commentaire_voiture','model_voiture'),(8,'LAND ROVER','couleur_voiture','2012',1,2,3,4.4,5.5,1,'gasoil','type_voiture','boite_vitesse','plein','bagage_voiture',400,'../assets/images/voiture2.jpg','commentaire_voiture','model_voiture'),(9,'LEXUS','couleur_voiture','2012',1,2,3,4.4,5.5,1,'gasoil','type_voiture','boite_vitesse','plein','bagage_voiture',400,'../assets/images/voiture2.jpg','commentaire_voiture','model_voiture'),(10,'Renault','black','2012',4,4,4,100,1000,0,'Disiel','sport','automatique','plein','1',400,'','bon voiture',NULL),(21,'','','',0,0,0,0,0,0,'','','','','',0,'','',NULL),(24,'','','',0,0,0,0,0,0,'','','','','',0,'','',NULL),(25,'','','',0,0,0,0,0,0,'','','','','',0,'','',NULL),(26,'','','',0,0,0,0,0,0,'','','','','',0,'','',NULL);
/*!40000 ALTER TABLE `voitures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `locationVoitures`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `locationVoitures` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `locationVoitures`;

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
  `id_agence` int(11) DEFAULT NULL,
  `passwordd` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_admin`),
  KEY `fk_admin` (`id_agence`),
  CONSTRAINT `fk_admin` FOREIGN KEY (`id_agence`) REFERENCES `agence` (`id_agence`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'AIT EL CAID ','Hmad','0620206554','0636013366','0529282267','0529282267','aitelcaidhmad@gmail.com','Rue 2 BD 52 Mohamedia ','5000',1,'admin','admin'),(2,'nom_admin','prenom_admin','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_admin','adresse_admin','code_postal',1,'passwordd',NULL),(3,'nom_admin','prenom_admin','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_admin','adresse_admin','code_postal',1,'passwordd',NULL),(4,'nom_admin','prenom_admin','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_admin','adresse_admin','code_postal',1,'passwordd',NULL),(5,'nom_admin','prenom_admin','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_admin','adresse_admin','code_postal',1,'passwordd',NULL);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agence`
--

DROP TABLE IF EXISTS `agence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agence` (
  `id_agence` int(11) NOT NULL AUTO_INCREMENT,
  `adresse_agence` varchar(255) DEFAULT NULL,
  `tel1_agence` varchar(12) DEFAULT NULL,
  `tel2_agence` varchar(12) DEFAULT NULL,
  `fax1_agence` varchar(12) DEFAULT NULL,
  `fax2_agence` varchar(12) DEFAULT NULL,
  `email_agence` varchar(100) DEFAULT NULL,
  `position_map_agence` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_agence`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agence`
--

LOCK TABLES `agence` WRITE;
/*!40000 ALTER TABLE `agence` DISABLE KEYS */;
INSERT INTO `agence` VALUES (1,'adresse_agence','21262767626','21267878378','21252787827','21259099282','casalocation@gmail.com','33.582983,-7.619407'),(2,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence'),(3,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence'),(4,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence'),(5,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence'),(6,'adresse_agence','tel1_admin','tel2_admin','fax1_admin','fax2_admin','email_agence','position_map_agence');
/*!40000 ALTER TABLE `agence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `id_location` int(11) NOT NULL AUTO_INCREMENT,
  `date_debut_location` datetime DEFAULT NULL,
  `date_fin_location` datetime DEFAULT NULL,
  `valider_location` tinyint(1) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_voiture` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_location`),
  KEY `fk_locaton1` (`id_user`),
  KEY `fk_locaton2` (`id_voiture`),
  CONSTRAINT `fk_locaton1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_locaton2` FOREIGN KEY (`id_voiture`) REFERENCES `voitures` (`id_voiture`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (3,'2016-12-01 11:11:00','2017-02-01 00:00:00',1,1,6),(4,'2016-12-01 11:11:00','2017-02-01 00:00:00',1,1,7),(5,'2016-12-01 11:11:00','2017-02-01 00:00:00',1,1,8),(6,'2016-12-01 11:11:00','2017-02-01 00:00:00',1,1,9);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `Id` varchar(50) NOT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES ('1','Go to Market tomorrow','done'),('2','Email to manager','pending'),('3','Push code to GitHub','done'),('4','Go For Running','done'),('5','Go to Movie','pending');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
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
  `id_admin` int(11) DEFAULT NULL,
  `passwordd` varchar(100) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_users` (`id_admin`),
  CONSTRAINT `fk_users` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nom_user','prenom_user','tel1_user','tel2_user','email_user','ville_user','adresse_user','code_postal',1,'pass',NULL),(2,'nom_user','prenom_user','tel1_user','tel2_user','email_user','ville_user','adresse_user','code_postal',1,'passwordd',NULL),(3,'nom_user','prenom_user','tel1_user','tel2_user','email_user','ville_user','adresse_user','code_postal',1,'passwordd',NULL),(7,'AIT EL CAID ','Hmad','0620206554','0636013366','aitelcaidhmad@gmail.com','Mohammedia','BD 2 RUE HASSAN ','5000',1,'hmad','hmadhmad'),(8,'AIT EL CAID','Mohmmed','21262782787','212627678783','Mohmmed@gmail.com','Rabat','Rue  n12  Agdal','36763',1,'pass',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voitures`
--

DROP TABLE IF EXISTS `voitures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `voitures` (
  `id_voiture` int(11) NOT NULL AUTO_INCREMENT,
  `marque_voiture` varchar(50) NOT NULL,
  `couleur_voiture` varchar(20) DEFAULT NULL,
  `date_sortie_voiture` varchar(6) DEFAULT NULL,
  `nombre_portes_voiture` int(11) DEFAULT NULL,
  `nombre_coussin_voiture` int(11) DEFAULT NULL,
  `nombre_personne_voiture` int(11) DEFAULT NULL,
  `nombre_kilometre_voiture` double DEFAULT NULL,
  `nombre_kilometre_limte` double DEFAULT NULL,
  `clim_dans_voiture` tinyint(1) DEFAULT NULL,
  `type_carbirant_voiture` varchar(30) DEFAULT NULL,
  `type_voiture` varchar(30) DEFAULT NULL,
  `boite_vitesse_voiture` varchar(20) DEFAULT NULL,
  `reservoire_voiture` varchar(7) DEFAULT NULL,
  `bagage_voiture` varchar(100) DEFAULT NULL,
  `prix_location_voiture` double DEFAULT NULL,
  `image_voiture` varchar(255) DEFAULT NULL,
  `commentaire_voiture` varchar(255) DEFAULT NULL,
  `model_voiture` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_voiture`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voitures`
--

LOCK TABLES `voitures` WRITE;
/*!40000 ALTER TABLE `voitures` DISABLE KEYS */;
INSERT INTO `voitures` VALUES (6,'LAMBORGHINI','couleur_voiture','2012',1,2,3,4.4,5.5,1,'gasoil','type_voiture','boite_vitesse','plein','bagage_voiture',400,'../assets/images/voiture1.jpg','commentaire_voiture','model_voiture'),(7,'LANCIA','couleur_voiture','2012',1,2,3,4.4,5.5,1,'gasoil','type_voiture','boite_vitesse','plein','bagage_voiture',400,'../assets/images/voiture2.jpg','commentaire_voiture','model_voiture'),(8,'LAND ROVER','couleur_voiture','2012',1,2,3,4.4,5.5,1,'gasoil','type_voiture','boite_vitesse','plein','bagage_voiture',400,'../assets/images/voiture2.jpg','commentaire_voiture','model_voiture'),(9,'LEXUS','couleur_voiture','2012',1,2,3,4.4,5.5,1,'gasoil','type_voiture','boite_vitesse','plein','bagage_voiture',400,'../assets/images/voiture2.jpg','commentaire_voiture','model_voiture'),(10,'Renault','black','2012',4,4,4,100,1000,0,'Disiel','sport','automatique','plein','1',400,'','bon voiture',NULL),(21,'','','',0,0,0,0,0,0,'','','','','',0,'','',NULL),(24,'','','',0,0,0,0,0,0,'','','','','',0,'','',NULL),(25,'','','',0,0,0,0,0,0,'','','','','',0,'','',NULL),(26,'','','',0,0,0,0,0,0,'','','','','',0,'','',NULL);
/*!40000 ALTER TABLE `voitures` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-11 12:58:37
