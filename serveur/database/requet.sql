insert into magasin  values (1,"123 meknes","0620206554","0636013366","0528937878","057337783","aitelcaidhmad@gmail.com","123.33;225.23");
 					
 					
 select * from magasin;

insert into users values(1,"AIT EL CAID","HMAD","0620206554","0636013366","0514252662","0535363673","aitelcaidhmad@gmail.com","N 123 RIAD SALAM MOHAMMEDIA","50000","admin","admin","1");
			
select * from admin;

insert into users values(1,"AIT EL CAID","HMAD","0620206554","0636013366","aitelcaidhmad@gmail.com","Mohammedia","N 123 RIAD SALAM MOHAMMEDIA","5000","admin","admin","1");	
			
			select * from users;
insert into voitures (id_voiture,marque_voiture,couleur_voiture,date_sortie_voiture,nombre_portes_voiture,nombre_coussin_voiture,nombre_personne_voiture,nombre_kilometre_voiture,nombre_kilometre_limte,clim_dans_voiture,type_carbirant_voiture,type_voiture,boite_vitesse_voiture,reservoire_voiture,bagage_voiture,prix_location_voiture,image_voiture,commentaire_voiture,model_voiture)
			  values (null,"alert('ok')","couleur_voiture","2012","1","2","3","4.4","5.5",true,"gasoil","type_voiture","boite_vitesse","plein","bagage_voiture","400","image_voiture","commentaire_voiture","model_voiture");
			  select * from voitures;
			  
insert into location (id_location,date_debut_location,date_fin_location,valider_location,id_user,id_voiture)
			values (null,"2012-01-19 03:14:07","2012-03-19 03:14:07",'1','2','1');
			
			select * from location;			  
			  


//Articles

insert into articles values  (null,"ref1","maroc",1,"dell",2,"pc dell","2017-03-03 15:12:00","2017-03-03 15:12:00","dell company",3,"ahmed fournisseur",4,"client 1","pc","pc dell Ram 8G ...","type1","famille1",1,1);
insert into articles values  (null,"ref2","maroc",10,"sumsung",2,"tablete sumsung","2017-03-03 15:12:00","2017-03-03 15:12:00","sumsung company",30,"ali fournisseur",40,"client khadija","tablete","tablete sumsung  Ram 1G ...","type2","famille2",1,1);
insert into articles values  (null,"ref3","maroc",100,"KIA",200,"table KIA","2017-04-03 11:12:00","2017-04-03 12:12:00","KIA company",300,"mohmmed fournisseur",400,"client said","categorie1","table KIA grande taille ...","type1","famille1",1,1);
insert into articles values  (null,"ref3","maroc",100,"KIA",200,"table KIA","2017-04-03 11:12:00","2017-04-03 12:12:00","KIA company",300,"mohmmed fournisseur",400,"client said","categorie4","table KIA grande taille ...","type4","famille4",1,1);
insert into articles values  (null,"ref3","maroc",100,"KIA",200,"table KIA","2017-04-03 11:12:00","2017-04-03 12:12:00","KIA company",300,"mohmmed fournisseur",400,"client said","categorie5","table KIA grande taille ...","type4","famille4",1,1);


//parametres
insert into parametres values (null,"categorie","categorie1,categorie2,categorie3,categorie4,categorie5,categorie6,categorie7",1);
insert into parametres values (null,"famille","famille1,famille2,famille3,famille4,famille5,famille6,famille7",1);
insert into parametres values (null,"type","type1,type2,type3,type4,type5,type6,type7",1);
insert into parametres values (null,"marque","marque1,marque2,marque3,marque4,marque5,marque6,marque7",1);
insert into parametres values (null,"etat","etat1,etat2,etat3",1);
insert into parametres values (null,"endroit","endroit1,endroit2,endroit3",1);
//inventory

insert into inventory values (null,DATE_FORMAT("2017-01-01T12:11Z", '%Y-%m-%d'),"2017-01-01","salle1",1);
insert into inventory values (null,"2017-01-01","2017-01-01","salle2",1);
insert into inventory values (null,"2017-01-01","2017-01-01","salle3",1);


//article_inventory

insert into article_inventory values (null,3,1,null);