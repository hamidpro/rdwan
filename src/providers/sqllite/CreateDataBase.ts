import { NavController, NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



@Injectable()
export class createDataBaseProvider {
  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  db: SQLiteObject

  constructor(public navParams: NavParams,public navCtrl: NavController,private sqlite: SQLite,public http: Http) {
    
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      
        console.log(""+db);
    }
  )
  }

  ionViewDidLoad() {
    
  }
  
  ionViewWillEnter() {
   
  }
  

  createTable(db: SQLiteObject, tables: String[], index: number) {
    if (index < tables.length) {
      db.executeSql(`${tables[index]}`, {})
      .then(() => {
        console.log('Executed: ', tables[index]);
        index++;
        this.createTable(db, tables, index);
      }).catch(e => console.log(e));
    }
  }


  createDataBase(){
    
  }

  /*createDataBase() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)', {})
      .then(res => console.log('Executed SQL'+res))
      .catch(e => console.log(e));
      //------------------------------------------------------------------------------------------
      db.executeSql(`CREATE TABLE IF NOT EXISTS  
        table magasin (
        id_magasin INTEGER not   auto_increment primary key,
        adresse_magasin TEXT ,
        tel1_magasin TEXT ,
        tel2_magasin TEXT ,
        fax1_magasin TEXT ,
        fax2_magasin TEXT ,
        email_magasin TEXT ,
        position_map_magasin TEXT 						
        );
        `, {})
      .then(res => console.log('Executed SQL'+res))
      .catch(e => console.log(e));
      //------------------------------------------------------------------------------------------

      //------------------------------------------------------------------------------------------
      db.executeSql(`CREATE TABLE IF NOT EXISTS  
        table admin (
        id_admin INTEGER not  auto_increment primary key,
        nom_admin TEXT not ,
        prenom_admin TEXT not ,
        tel1_admin TEXT,
        tel2_admin TEXT,
        fax1_admin TEXT,
        fax2_admin TEXT,
        email_admin TEXT not ,
        adresse_admin TEXT,
        code_postal_admin TEXT,
        id_magasin INTEGER,
        passwordd TEXT not ,
        username TEXT not 

      );
      `, {})
    .then(res => console.log('Executed SQL'+res))
    .catch(e => console.log(e));
    //------------------------------------------------------------------------------------------


     //------------------------------------------------------------------------------------------
     db.executeSql(`CREATE TABLE IF NOT EXISTS  
      table users (
      id_user INTEGER not  auto_increment primary key,
      nom_user TEXT not ,
      prenom_user TEXT not ,
      tel1_user TEXT,
      tel2_user TEXT,				
      email_user TEXT not ,
      ville_user TEXT,
      adresse_user TEXT,
      code_postal_user TEXT,
      username TEXT not ,
      password TEXT not ,
      id_magasin INTEGER
      );
      
     `, {})
   .then(res => console.log('Executed SQL'+res))
   .catch(e => console.log(e));
   //------------------------------------------------------------------------------------------






     //------------------------------------------------------------------------------------------
     db.executeSql(`CREATE TABLE IF NOT EXISTS  
     				
            table articles (
					  id_article INTEGER not  auto_increment primary key,				  
					  reference_article  TEXT   ,
						pays_article  	   TEXT   ,
						prix_ht_entree_article  REAL  not ,
						marque_article  TEXT      ,
						prix_ttc_entree_article   REAL  ,
						libelle_article  TEXT      ,
						Date_entree_article  TEXT     ,
						date_de_sortie_article  TEXT  ,
						fabriquant_article    TEXT ,
						prix_ht_sortie_article   REAL  ,
						fournisseur_article   TEXT  ,
						prix_ttc_sortie_article  REAL  ,
						client_article  	 TEXT  ,
						categorie_article    TEXT  ,
						description_article  TEXT  ,
						type_article         TEXT  ,
  					famille_article      TEXT  ,
						id_magasin  INTEGER   
					  );
     
    `, {})
  .then(res => console.log('Executed SQL'+res))
  .catch(e => console.log(e));
  //------------------------------------------------------------------------------------------






//------------------------------------------------------------------------------------------
     db.executeSql(`CREATE TABLE IF NOT EXISTS  
     
      table inventory(
      id_inventory INTEGER not  auto_increment primary key,
      start_date  TEXT  ,
      end_date  TEXT  ,
      location  TEXT  ,
      id_magasin  INTEGER   
      );

`, {})
.then(res => console.log('Executed SQL'+res))
.catch(e => console.log(e));
//------------------------------------------------------------------------------------------


db.executeSql(`CREATE TABLE IF NOT EXISTS  


  table article_inventory(
  id_article_inventory INTEGER not  auto_increment primary key,
  id_inventory INTEGER not ,
  id_article INTEGER not   ,
  date_article_inventory TEXT
  );	

`, {})
.then(res => console.log('Executed SQL'+res))
.catch(e => console.log(e));
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
db.executeSql(`CREATE TABLE IF NOT EXISTS  

  table parametres(
  id_parametre INTEGER not  auto_increment primary key,
  key_name  TEXT,
  value  TEXT,
  id_magasin  INTEGER   
  );

`, {})
.then(res => console.log('Executed SQL'+res))
.catch(e => console.log(e));
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
db.executeSql(`CREATE TABLE IF NOT EXISTS  

  table operation_inventory(
  id_operation_inventory INTEGER not  auto_increment primary key,
  operation_inventory_debut TEXT,
  operation_inventory_fin TEXT,
  lieu_operation_inventory  TEXT not ,
  status_operation_inventory  TEXT not 
  );	

`, {})
.then(res => console.log('Executed SQL'+res))
.catch(e => console.log(e));
//------------------------------------------------------------------------------------------

   
    }).catch(e => console.log(e));
  }
  */
  
  



}
