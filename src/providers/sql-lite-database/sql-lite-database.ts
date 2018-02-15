//import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlLiteDatabaseProvider {
  table:string[]=[];
  tableName:string[]=[];
  request:string[]=[];
  db: SQLiteObject;
  okay:boolean=false;
  constructor(private toast: ToastController,private sqlite: SQLite,public http: Http) {
    console.log('Hello SqlLiteDatabaseProvider Provider'+this.sqlite);

     }
  createTable(db: SQLiteObject, tables: String[], index: number) {
    this.Toast('start create table: '+tables.length+'>>'+index,"bottom");

    for (index=0;index < tables.length;index++) {
      db.executeSql(`${tables[index]}`, {})
      .then(() => { /*this.Toast('Executed: '+index,"bottom");*/
      }).catch(e => this.Toast("error="+JSON.stringify(e),"middle"));
    }
  }


  execute(requet:string) {
    this.sqlite.create({
      name: 'data1.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(requet, {})
          .then(/*() => this.Toast("Table "+requet.substr(0,60),"bottom") */)
          .catch(e => this.Toast(JSON.stringify(e),"middle"));
      })
      .catch(e => console.log(JSON.stringify(e)));
    } 

  


  remplireDataBase(){

    let ff="INSERT INTO 'magasin' VALUES ('magasin_1234','123 meknes','0620206554','0636013366','0528937878','057337783','aitelcaidhmad@gmail.com','123.33;225.23')"
    this.execute(ff);

    let requet1="INSERT INTO 'users' VALUES ('user_7732','AIT EL CAID','Hmad','0620206554','0636013366','aitelcaidhmad@gmail.com','Mohammedia','N 123 RIAD SALAM MOHAMMEDIA','5000','admin','admin',1,'admin')";
    this.execute(requet1);

    let ee="INSERT INTO 'articles' VALUES ('article_6522','RF123','Maroc',1,'dell',2,'pc dell','2017-03-03 15:12:00','2017-03-03 15:12:00','dell company',3,'ahmed fournisseur',4,'client 1','categorie2','pc dell Ram 8G ...','type1','famille1',1,NULL,NULL,NULL)";
    this.execute(ee);
  }
  createDataBase(){
    console.log("create all tables");
    this.dropAllTable();
   this.Toast("create all tablese","middle");

      let tableMagasin=`CREATE TABLE  IF NOT EXISTS magasin (
      id_magasin TEXT  primary key,
      adresse_magasin TEXT ,
      tel1_magasin TEXT ,
      tel2_magasin TEXT ,
      fax1_magasin TEXT ,
      fax2_magasin TEXT ,
      email_magasin TEXT ,
      position_map_magasin TEXT 						
      )
      `;
    this.table.push(tableMagasin);

 /*

     //--------------------------------------------
     let tableAdmin=`CREATE TABLE   IF NOT EXISTS
      admin (
     id_admin INTEGER    primary key,
     nom_admin TEXT ,
     prenom_admin TEXT ,
     tel1_admin TEXT,
     tel2_admin TEXT,
     fax1_admin TEXT,
     fax2_admin TEXT,
     email_admin TEXT ,
     adresse_admin TEXT,
     code_postal_admin TEXT,
     id_magasin INTEGER,
     passwordd TEXT ,
     username TEXT,
     FOREIGN KEY (id_magasin) REFERENCES magasin (id_magasin) ON DELETE CASCADE ON UPDATE CASCADE			 
   );
     `;
    this.table.push(tableAdmin);
*/
//--------------------------------------------
let tableUser=`CREATE TABLE IF NOT EXISTS  users (
    id_user TEXT    primary key,
    nom_user TEXT ,
    prenom_user TEXT ,
    tel1_user TEXT,
    tel2_user TEXT,				
    email_user TEXT  ,
    ville_user TEXT,
    adresse_user TEXT,
    code_postal_user TEXT,
    username TEXT ,
    password TEXT ,
    id_magasin TEXT,
    role TEXT
    )

`;
this.table.push(tableUser);
//--------------------------------------------

//--------------------------------------------
    let tableArticle=`CREATE TABLE   IF NOT EXISTS articles (
      id_article TEXT primary key,
      reference_article TEXT ,
      ville_article TEXT ,
      prix_ht_acquisition_article REAL ,
      marque_article TEXT ,
      prix_ttc_acquisition_article REAL ,
      libelle_article TEXT ,
      Date_entree_article TEXT ,
      date_de_sortie_article TEXT ,
      fabriquant_article TEXT ,
      prix_ht_sortie_article REAL ,
      fournisseur_article TEXT ,
      prix_ttc_sortie_article REAL ,
      client_article TEXT ,
      categorie_article TEXT ,
      description_article TEXT ,
      type_article TEXT ,
      famille_article TEXT ,
      id_magasin TEXT ,
      status INTEGER ,
      endroit_article TEXT ,
      etat_article TEXT
    )

`;
this.table.push(tableArticle);
//--------------------------------------------

//--------------------------------------------
    let tableInventory=`CREATE TABLE  IF NOT EXISTS  inventory(
    id_inventory TEXT  primary key,
    start_date  TEXT  ,
    end_date  TEXT  ,
    location  TEXT  ,
    id_magasin  TEXT ,
    status INTEGER
      )

`;
this.table.push(tableInventory);
//--------------------------------------------


//--------------------------------------------
  let tableArticle_inventory=`CREATE TABLE  IF NOT EXISTS article_inventory(
    id_article_inventory TEXT    primary key,
    id_inventory TEXT  ,
    id_article TEXT    ,
    date_article_inventory TEXT,
    endroit TEXT ,
    etat TEXT
     )

`;
this.table.push(tableArticle_inventory);
//--------------------------------------------


//--------------------------------------------
  let tableParametre=`CREATE TABLE   IF NOT EXISTS  parametres(
    id_parametre TEXT    primary key,
    key_name  TEXT,
    value  TEXT,
    id_magasin  TEXT 
      )
`;
this.table.push(tableParametre);
//--------------------------------------------
this.sqlite.create({
  name: 'data1.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {

    for(let g of this.table){
    db.executeSql(g, {})
      .then(/*() => this.Toast("create "+g.substr(0,60),"bottom") */)
      .catch(e => this.Toast(JSON.stringify(e),"middle"));
    } 
  })
  .catch(e => this.Toast(JSON.stringify(e),"middle"));
  }



  Toast(message1:string,position1:string) {
    let toast = this.toast.create({
      message: message1,
      showCloseButton:true,
       closeButtonText:"OK",
      position: position1
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  dropAllTable(){
    this.tableName.push("magasin");
    this.tableName.push("users");
    this.tableName.push("articles");
    this.tableName.push("article_inventory");
    this.tableName.push("parametres");
    this.tableName.push("inventory");

    this.sqlite.create({
      name: 'data1.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
        for(let g of this.tableName){
        db.executeSql("DROP TABLE IF EXISTS "+g, {})
          .then(() => this.Toast("drop "+g.substr(0,7),"bottom") )
          .catch(e => this.Toast(JSON.stringify(e),"middle"));
        } 
      })
      .catch(e => this.Toast(JSON.stringify(e),"middle"));
     
  }
}
