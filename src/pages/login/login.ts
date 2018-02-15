import { SharedProvider } from '../../providers/shared/shared';
import { User } from '../../Entity/User/User';
import { RetrievePasswordPage } from '../retrieve-password/retrieve-password';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController } from 'ionic-angular';



import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/User.service';
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: User;
  submitted = false;
  connected = false;
  idUserConnected :number=2;
  userconnected:User;
  constructor(private shared:SharedProvider,public events: Events,private toast: ToastController,public service:UserService,public storage: Storage,public navCtrl: NavController) { 
    this.login=new User();
    this.userconnected=new User();

    this.storage.get('username').then((val) => {
      this.login.username=val; });

      this.storage.get('password').then((val) => {
        this.login.password=val; });
       
  }


  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      //--------------------------------
      console.log(">username : "+this.login.username);
      console.log(">mot de passe  : "+this.login.password);

      this.storage.set('username',this.login.username).then((val) => {
        console.log(val);
        });
   
         this.storage.set('password',this.login.password).then((val) => {
           console.log(val); });


      console.log("option="+this.shared.network.option);
      this.service.connect(this.login).then((data:any)=>{
        //this.Toast(data,"top");   
        
        //this.sqllite.createDataBase();
        this.userconnected=data[0];
       // this.Toast("user=>"+JSON.stringify(data),"bottom"); 
       if(data.code==undefined || data.code==null){
        if(this.userconnected!=undefined && this.userconnected!=null){
          this.Toast(`Bien Venu`, 'middle');
         


          if(data[0].role=="admin")
                 this.shared.admin=true;
         else
                 this.shared.admin=false;

                 console.log("--------> login admin="+ this.shared.admin)

          this.shared.idUser=this.userconnected.id_user+"";
          this.events.publish('user:login');

          this.navCtrl.setRoot(TabsPage);
       }
       else{
        this.Toast(`Nom d'utilisateur ou Mot de Passe est incorrect`, 'middle');
       }

      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
      }
      });
    }
  }

  retrievePassword(){
    this.navCtrl.push(RetrievePasswordPage);
  }
  onSignup() {
    this.navCtrl.push(SignupPage);
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


}
