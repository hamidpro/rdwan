import { User } from '../../Entity/User/User';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



@Injectable()
export class LocalUserProvider {
  db:SQLiteObject;
  list:User[]=[];

  constructor(private toast: ToastController,public navParams: NavParams,public navCtrl: NavController,private sqlite: SQLite,public http: Http) {

    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {  this.db=db; })
  }

  ionViewDidLoad() {
    
  }
  
  ionViewWillEnter() {
    
  }
  
//----------------------------------------- GET ------------------------------------------------
  getUser() {
    this.list=[];
     this.db.executeSql('SELECT * FROM users', {})
      .then(res => {
        if(res.rows!=undefined && res.rows!=null){
          if(res.rows.length>0) {
              for(var i=0;i<res.rows.length;i++){
                this.list.push({id_user:res.rows.item(i).id_user,nom_user:res.rows.item(i).nom_user,prenom_user:res.rows.item(i).prenom_user,tel1_user:res.rows.item(i).tel1_user,tel2_user:res.rows.item(i).tel2_user,email_user:res.rows.item(i).email_user,ville_user:res.rows.item(i).ville_user,adresse_user:res.rows.item(i).adresse_user,code_postal_user:res.rows.item(i).code_postal_user,id_admin:res.rows.item(i).id_admin,password:res.rows.item(i).password,username:res.rows.item(i).username,role:res.rows.item(i).role});
              }
          }
        return this.list;
        }
      })
      .catch(e => {
          this.Toast("Error SELECT * FROM users",'middle');
          console.log(e);
          return [];
      });
  }
//--------------------------------------------------------------------------------------------------





 Toast(message1:string,position1:string) {
    let toast = this.toast.create({
      message: message1,
      position: position1,
      duration:3000
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
