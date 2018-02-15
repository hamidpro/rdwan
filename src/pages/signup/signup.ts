import { SharedProvider } from '../../providers/shared/shared';
import { LoginPage } from '../login/login';
import { UserService } from '../../providers/User.service';
import { User } from '../../Entity/User/User';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';


//import { TabsPage } from '../tabs-page/tabs-page';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  submitted = false;
  user:User;

  constructor(private share:SharedProvider,public events: Events,private toast: ToastController,public service:UserService,public navCtrl: NavController) {
    this.user=new User();

  }
  

  onSignup(form: NgForm) {
     this.submitted = true;

    if (form.valid) {

      //code service +toast
      this.user.id_admin=1;
      this.user.id_user=this.share.getUniqueID();

      this.service.addUser(this.user).then((data:any)=>{
       this.Toast(JSON.stringify(data),"top");

        if(data.code==undefined || data.code==null){
          //toast code
          this.Toast(`Le compte est bien crée`, 'middle');
          this.navCtrl.setRoot(LoginPage);
          this.events.publish('user:signup');
        }

        else{
          this.Toast(`Error`+JSON.stringify(data),'top');
          this.Toast(`Erreur de créer le compte`, 'middle'); 
        }
    });
     // this.userData.signup(this.signup.username);
    }
  }

  Toast(message1:string,position1:string) {
    let toast = this.toast.create({
      message: message1,
      showCloseButton:true, closeButtonText:"OK",
      position: position1
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
