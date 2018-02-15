

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `codebar` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `codebar`;




DROP TABLE IF EXISTS `magasin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `magasin` (
  `id_magasin` varchar(200) NOT NULL,
  `adresse_magasin` varchar(255) DEFAULT NULL,
  `tel1_magasin` varchar(12) DEFAULT NULL,
  `tel2_magasin` varchar(12) DEFAULT NULL,
  `fax1_magasin` varchar(12) DEFAULT NULL,
  `fax2_magasin` varchar(12) DEFAULT NULL,
  `email_magasin` varchar(100) DEFAULT NULL,
  `position_map_magasin` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_magasin`)
) ;






DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_user` varchar(200) NOT NULL,
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
  `id_magasin` varchar(200) NOT NULL,
  `role` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_magasin` (`id_magasin`),
  CONSTRAINT `fk_magasin` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE
) ;



DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id_article` varchar(200) NOT NULL,
  `reference_article` varchar(50) DEFAULT NULL,
  `ville_article` varchar(100) DEFAULT NULL,
  `prix_ht_acquisition_article` double DEFAULT NULL,
  `marque_article` varchar(50) DEFAULT NULL,
  `prix_ttc_acquisition_article` double DEFAULT NULL,
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
  `id_magasin` varchar(200) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `endroit_article` varchar(50) DEFAULT NULL,
  `etat_article` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_article`),
  KEY `fk_articles` (`id_magasin`),
  CONSTRAINT `fk_articles` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE
) ;


DROP TABLE IF EXISTS `inventory`;


CREATE TABLE `inventory` (
  `id_inventory` varchar(200) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `location` varchar(500) DEFAULT NULL,
  `id_magasin` varchar(200) NOT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_inventory`),
  KEY `fk_inventory_magasin` (`id_magasin`),
  CONSTRAINT `fk_inventory_magasin` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE
) ;


DROP TABLE IF EXISTS `article_inventory`;

CREATE TABLE `article_inventory` (
  `id_article_inventory` varchar(200) NOT NULL,
  `id_inventory` varchar(200) NOT NULL,
  `id_article` varchar(200) NOT NULL,
  `date_article_inventory` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `etat_article` int(11) DEFAULT NULL,
  `endroit_article` int(11) DEFAULT NULL,
  `id_user_inventory` varchar(200) NOT NULL,
  PRIMARY KEY (`id_article_inventory`),
  KEY `fk_article_invetory` (`id_inventory`),
  KEY `fk_inventory_article` (`id_article`),
  KEY `fk_inventory_article_user` (`id_user_inventory`),
  CONSTRAINT `fk_article_invetory` FOREIGN KEY (`id_inventory`) REFERENCES `inventory` (`id_inventory`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_article` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_article_user` FOREIGN KEY (`id_user_inventory`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ;



DROP TABLE IF EXISTS `parametres`;

CREATE TABLE `parametres` (
  `id_parametre` varchar(200) NOT NULL,
  `key_name` varchar(50) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  `id_magasin` varchar(200) NOT NULL,
  PRIMARY KEY (`id_parametre`),
  KEY `fk_parametres_magasin` (`id_magasin`),
  CONSTRAINT `fk_parametres_magasin` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE
) ;



insert into magasin  values ("ref_magasin","123 meknes","0620206554","0636013366","0528937878","057337783","aitelcaidhmad@gmail.com","123.33;225.23");


insert into users values("ref_admin_7cd","AIT EL CAID","HMAD","0620206554","0636013366","aitelcaidhmad@gmail.com","Mohammedia","N 123 RIAD SALAM MOHAMMEDIA","5000","admin","admin","1","admin");
