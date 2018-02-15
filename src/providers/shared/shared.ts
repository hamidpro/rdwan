import { ToastController } from 'ionic-angular';
import { Network } from '../../Entity/Network/Network';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the SharedProvider provider.
   

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {
 //----------------- DECLARED VARIABLE -------------------------------
    network:Network;
    idUser:string;
    admin: boolean;
    reference_article:string="";
    inventoryIsOpen:boolean;

  
    LISTERROR=[
                {status:0,message:"Pas de connexion"},
                {status:404,message:"Error Serveur"},
                {status:505,message:"Error Serveur"},
              ];


              

   public DBNAME:string="data1.db";
   
  constructor(public storage: Storage,public http: Http,private toast: ToastController) {
    console.log('Hello SharedProvider Provider');
    this.network=new Network();
  }



  Toast(message1:string,position1:string) {
    let toast = this.toast.create({
      message: message1,
      showCloseButton:true,
      closeButtonText:"OK",
      position: position1,
  
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }



  public getNetwork(){
         return this.network;
  }

  public setNetwork(net:Network){
    this.network=net;
  }


  getIdUser(){
    return this.idUser;
  }

  setIdUser(id:string){
    this.idUser=id;
  }


   getUniqueID () {
    return '_' + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  };

  handleError(err:any){
    for(let error of this.LISTERROR)
        if(err.status==error.status){
          this.Toast(error.message,'middle');
          return;
        }
             
  }


}
