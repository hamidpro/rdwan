import { SqlLiteDatabaseProvider } from '../../providers/sql-lite-database/sql-lite-database';
import { ConnectionService } from '../../providers/Connection.service';
import { Network } from '../../Entity/Network/Network';
import { SharedProvider } from '../../providers/shared/shared';
import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-network',
  templateUrl: 'network.html',
})
export class NetworkPage {
   option:any="offline";
   network:Network;
   network2:Network;
   serveur:string;
   port:string;

  public checked:boolean=true;
   

  constructor(private database:SqlLiteDatabaseProvider,private service:ConnectionService,public storage: Storage,public alertCtrl: AlertController,public share:SharedProvider,private toast: ToastController,public navCtrl: NavController, public navParams: NavParams) {
   console.log(this.database);
    //this.database.createDataBase();
    //this.database.remplireDataBase();
    
    this.network=new Network();
    this.network2=new Network();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkPage');
   
    
      this.storage.get('option').then((val) => {
       this.network.option=val;
        if(val !=undefined && val !=null)
        this.option=val;
      });

      
       this.storage.get('serveur').then((val) => {
        this.network.serveur=val; });

        this.storage.get('port').then((val) => {
          this.network.port=val; });

          this.storage.get('serveur2').then((val) => {
            this.network2.serveur=val; });
    
            this.storage.get('port2').then((val) => {
              this.network2.port=val; });

              if(this.option=="local"){ 
                this.share.setNetwork(this.network);
              }
              else if(this.option=="distant"){
                this.share.setNetwork(this.network2);
              } 


  }

  isOkay(){

    this.service.valider().subscribe((data:any)=>{
      console.log("-------------------------------------");
      console.log("data.code="+data.code);
      console.log("-------------------------------------");
      if(data.code==undefined || data.code==null){
        this.Toast(`Le seveur est bien configuré`,'middle');
        
        this.validerNetword();
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
      }
      
  });
  }

changeNetwork(event:any){
  console.log("changeNetwork"+event);

  if(this.option!=undefined && this.option!=null){
    if(this.option!="offline"){
      this.presentPrompt();
                              }
  }else{
    console.log("option is null");
  }
}

validerNetword(){
  if(this.option!=undefined && this.option!=null){

  


    this.storage.set('option',this.option).then((val) => {
      console.log(val);
      });

    if(this.option=="local"){

    this.storage.set('serveur',this.network.serveur).then((val) => {
        console.log(val); });
    this.storage.set('port',this.network.port).then((val) => {
        console.log(val);
        });

    }else if(this.option=="distant"){
      this.storage.set('serveur2',this.network.serveur).then((val) => {
        console.log(val); });
      this.storage.set('port2',this.network.port).then((val) => {
        console.log(val);
        });
    }else{
      this.network.option="offline";
      this.share.setNetwork(this.network);
    }
  
   
    this.navCtrl.pop();
  }
}
  valider(){
    
  if(this.option!=undefined && this.option!=null && this.option!="offline"){

    if(this.option=="local"){
  
      this.share.setNetwork(this.network);
     
  
  
    }
    else if(this.option=="distant"){
  
      this.share.setNetwork(this.network2);
    }     


    this.isOkay(); 
  
  }
  else this.validerNetword();
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


  presentPrompt() {
    if(this.option=="local"){
      this.serveur=this.network.serveur;
      this.port=this.network.port;
    }else if(this.option=="distant"){
      this.serveur=this.network2.serveur;
      this.port=this.network2.port;
    }
    

    let alert = this.alertCtrl.create({
      title: 'Paramètres Serveur',
      inputs: [
        {
          name: 'IP_Serveur',
          value: this.serveur,
          placeholder: 'IP Serveur',
          type: 'text'
        },
        {
          name: 'PORT_Serveur',
          value: this.port,
          placeholder: 'PORT Serveur',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked'+data);
          }
        },
        {
          text: 'Valider',
          handler: data => {
            if(data!=undefined && data!=null  && data.IP_Serveur!=undefined &&  data.PORT_Serveur!=undefined && data.IP_Serveur!="" &&  data.PORT_Serveur!=""){
              if(this.option=="local"){
                this.network.serveur=data.IP_Serveur;
                this.network.port=data.PORT_Serveur;
                this.network.option= this.option;
                this.share.setNetwork(this.network);
               
            
            
              }
              else if(this.option=="distant"){
                this.network2.serveur=data.IP_Serveur;
                this.network2.port=data.PORT_Serveur;
                this.network2.option= this.option;
                this.share.setNetwork(this.network2);
              }             
            } else {
              // invalid login
              this.Toast(`Veuillez remplir tous les champs`,'middle');
              return false;
            }
          }
        }
      ]
    });
  
    alert.present().then(()=>{
     
       
      
   });

  }

  
}
