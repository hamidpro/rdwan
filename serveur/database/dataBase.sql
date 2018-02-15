
create  table magasin (
					id_magasin int not null  AUTO_INCREMENT primary key,
					adresse_magasin varchar(255) null,
					tel1_magasin varchar (12) null,
					tel2_magasin varchar (12) null,
					fax1_magasin varchar (12) null,
					fax2_magasin varchar (12) null,
					email_magasin varchar(100) null,
					position_map_magasin varchar(100) null						
					);
					
create table admin (
					id_admin int not null AUTO_INCREMENT primary key,
					nom_admin varchar(20) not null,
					prenom_admin varchar(20) not null,
					tel1_admin varchar (12),
					tel2_admin varchar (12),
					fax1_admin varchar (12),
					fax2_admin varchar (12),
					email_admin varchar(100) not null,
					adresse_admin varchar(255),
					code_postal_admin varchar(15),
					id_magasin int,
					passwordd varchar(100) not null,
					username varchar(100) not null,
					constraint fk_magasin1 foreign key (id_magasin) references magasin (id_magasin) ON DELETE CASCADE ON UPDATE CASCADE								
					);
					


create table users (
					id_user int not null AUTO_INCREMENT primary key,
					nom_user varchar(20) not null,
					prenom_user varchar(20) not null,
					tel1_user varchar(12),
					tel2_user varchar(12),				
					email_user varchar(100) not null,
					ville_user varchar(30),
					adresse_user varchar(255),
					code_postal_user varchar(15),
					username varchar(100) not null,
					password varchar(100) not null,
					role varchar(100) not null			
					);
					

				
create table articles (
					    id_article int not null AUTO_INCREMENT primary key,				  
					    reference_article  varchar(50)   null,
						ville_article  	   varchar(50)   null,
						prix_ht_acquisition_article  DOUBLE  not null,
						marque_article  varchar(50)      null,
						prix_ttc_acquisition_article   DOUBLE  null,
						libelle_article  varchar(50)      null,
						Date_entree_article  DATETIME     null,
						date_de_sortie_article  DATETIME  null,
						fabriquant_article    varchar(50) null,
						prix_ht_sortie_article   DOUBLE  null,
						fournisseur_article   varchar(50)  null,
						prix_ttc_sortie_article  DOUBLE  null,
						client_article  	 varchar(50)  null,
						categorie_article    varchar(50)  null,
						description_article  varchar(500)  null,
						type_article         varchar(50)  null,
  						famille_article      varchar(50)  null,
						id_magasin  int   null,
						status int 0,
						etat_article int  null,
					    endroit_article int  null,
				        constraint fk_articles foreign key (id_magasin) references magasin(id_magasin) ON DELETE CASCADE ON UPDATE CASCADE			  
					  );
	


create table inventory(
					  id_inventory int not null AUTO_INCREMENT primary key,
					  start_date  DATETIME  null,
					  end_date  DATETIME  null,
					  location  varchar(500)  null,
					  id_magasin  int   null,
					  status int 0,
				      constraint fk_inventory_magasin foreign key (id_magasin) references magasin(id_magasin) ON DELETE CASCADE ON UPDATE CASCADE			  					  
					  );	


create table article_inventory(
					  id_article_inventory int not null AUTO_INCREMENT primary key,
					  id_inventory int not null,
					  id_article int not null  ,
					  date_article_inventory DATETIME,
					  status int ,
					  etat_article int  null,
					  endroit_article int  null,
					  id_user_inventory int null,
					  constraint fk_article_invetory foreign key (id_inventory) references inventory(id_inventory) ON DELETE CASCADE ON UPDATE CASCADE,
					  constraint fk_inventory_article foreign key (id_article) references articles(id_article) ON DELETE CASCADE ON UPDATE CASCADE,							  	  					  					  
					  constraint fk_inventory_article_user foreign key (id_user_inventory) references users(id_user) ON DELETE CASCADE ON UPDATE CASCADE								  	  					  					  
					  );				  			
					
					
create table parametres(
					  id_parametre int not null AUTO_INCREMENT primary key,
					  key_name  varchar(50),
					  value  varchar(100),
					  id_magasin  int   null,
				      constraint fk_parametres_magasin foreign key (id_magasin) references magasin(id_magasin) ON DELETE CASCADE ON UPDATE CASCADE			  					  									  	  					  					  
					  );

 				
alter table article_inventory add constraint fk_user_article_invento foreign key (id_user_inventory) references user(id_user) on delete cascade on update cascade;