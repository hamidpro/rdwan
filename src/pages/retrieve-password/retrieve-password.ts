
import { LoginPage } from '../login/login';
import { UserService } from '../../providers/User.service';
import { User } from '../../Entity/User/User';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

/**
 * Generated class for the RetrievePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-retrieve-password',
  templateUrl: 'retrieve-password.html',
})
export class RetrievePasswordPage {
  user: User; 
  submitted = false;
  password2:any;
  token:String;
  showPasswordDic:boolean=false;
  id_user:number;

  constructor(private toast: ToastController,public service:UserService,public navCtrl: NavController) {
    this.user= new User();

   }

  
  
  onRetreivePassword(form: NgForm){

    if (form.valid) {

    this.token=Math.random().toString(36).substr(2, 5);

      //code service +toast
      this.service.retrievePassword(this.user,this.token).then((data:any)=>{
        console.log(data);

        if(data!=undefined && data!=null){
          //toast code
          this.Toast(`Un code  a été envoyé à  votre adresse email`, 'bottom');


            this.showPasswordDic=true;
        }
        else{
          this.Toast(`Votre email n été pas trouvé`, 'bottom');
          
        }
    });
  }
  }

  onChangePassword(form: NgForm){
    if (form.valid) {
      if(this.token==this.user.code_postal_user){
        this.service.changePassword(this.user).then((data:any)=>{
          console.log(data);
  
          if(data!=undefined && data!=null){
            //toast code
            this.Toast(`Mot de passe et bien changé`, 'bottom');

           
              this.showPasswordDic=true;
          }
          else{
            this.Toast(`Erreur de changer le Mot de passe`, 'bottom');
            
          }
      });



        this.navCtrl.push(LoginPage);
      }else{
        
        this.Toast(`Le code saisi est incorrect`, 'bottom');
        
      }
      
    }
   
  }

  Toast(message1:string,position1:string) {
    let toast = this.toast.create({
      message: message1,
      duration: 3000,
      position: position1
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
