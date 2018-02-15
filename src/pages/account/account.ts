import { SharedProvider } from '../../providers/shared/shared';
import { UserService } from '../../providers/User.service';
import { User } from '../../Entity/User/User';
import { Component } from '@angular/core';

import { AlertController, NavController, ToastController } from 'ionic-angular';



@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  user: User;
  idUser:any;

  constructor(private shared:SharedProvider,private nav:NavController,private toast: ToastController,private service:UserService,private alertCtrl: AlertController) {
    this.user=new User();
     
  }

  updateUser(){
   

          //code service +toast
      this.service.updateUser(this.user,this.shared.idUser).then((data:any)=>{
        console.log("----------------------------------");
        console.log(this.user);
        console.log("----------------------------------");
        if(data.code==undefined || data.code==null){
          //toast code
          this.Toast(`la modification est bien faite`, 'middle');
          this.getUser();
        }
        else{
          this.Toast(`Error modification des informations`, 'middle');
        }
    });
  }
  //getuser
  getUser(){
    
          //code service +toast
          this.service.getUserById(this.shared.idUser).then((data:any)=>{
            console.log(data[0]);
    
            if(data.code==undefined || data.code==null){
              this.user=data[0];
              //toast code
              //this.Toast(`get User Connected`, 'middle');
            }
            else{
              this.Toast(`Error`+JSON.stringify(data),'middle');
            }
        });

  }

  ngAfterViewInit() {
    this.getUser();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Changer Nom Utilisateur',
      buttons: [
        'Quitter'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.user.username,
      placeholder: 'Nom Utilisateur'
    });
    alert.addButton({
      text: 'Valider',
      handler: (data: any) => {
        console.log(data);
        this.user.username=data.username;
        this.updateUser();
      }
    });

    alert.present();
    
  }

  //changePrenom
  changePrenom() {
    let alert = this.alertCtrl.create({
      title: 'Changer Prénom',
      buttons: [
        'Quitter'
      ]
    });
    alert.addInput({
      name: 'prenom_user',
      value: this.user.prenom_user,
      placeholder: 'Prénom'
    });
    alert.addButton({
      text: 'Valider',
      handler: (data: any) => {
        console.log(data);
        this.user.prenom_user=data.prenom_user;
        this.updateUser();
       
      }
    });


    alert.present();
  }
 //changeNom
 changeNom() {
  let alert = this.alertCtrl.create({
    title: 'Changer Nom',
    buttons: [
      'Quitter'
    ]
  });
  alert.addInput({
    name: 'nom_user',
    value: this.user.nom_user,
    placeholder: 'Nom'
  });
  alert.addButton({
    text: 'Valider',
    handler: (data: any) => {
      console.log(data);
      this.user.nom_user=data.nom_user;
      this.updateUser();
    }
  });

  alert.present();
}

 //changeEmail
 changeEmail() {
  let alert = this.alertCtrl.create({
    title: 'Changer E-mail',
    buttons: [
      'Quitter'
    ]
  });
  alert.addInput({
    name: 'email_user',
    value: this.user.email_user,
    placeholder: 'E-mail'
  });
  alert.addButton({
    text: 'Valider',
    handler: (data: any) => {
   console.log(data);
   this.user.email_user=data.email_user;
      this.updateUser();
    }
  });

  alert.present();
}


 //changeEmail
 changeTel1() {
  let alert = this.alertCtrl.create({
    title: 'Changer Tél',
    buttons: [
      'Quitter'
    ]
  });
  alert.addInput({
    name: 'tel1_user',
    value: this.user.tel1_user,
    placeholder: 'Tél'
  });
  alert.addButton({
    text: 'Valider',
    handler: (data: any) => {
    console.log(data);
    this.user.tel1_user=data.tel1_user;
      this.updateUser();
    }
  });

  alert.present();
}


changePassword() {
  let alert = this.alertCtrl.create({
    title: 'Changer Mot De Passe',
    buttons: [
      'Quitter'
    ]
  });
  alert.addInput({
    name: 'password',
    type:'password',
    value: this.user.password,
    placeholder: 'Mot De Passe'
  });
  alert.addButton({
    text: 'Valider',
    handler: (data: any) => {
      console.log(data);
      this.user.password=data.password;
      this.updateUser();
    }
  });

  alert.present();
}




  logout() {
    this.nav.setRoot('LoginPage');
  }


  Toast(message1:string,position1:string) {
    let toast = this.toast.create({
      message: message1,
     
      position: position1,
      showCloseButton:true,
      closeButtonText:"OK"
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


  changeTel2(){
    let alert = this.alertCtrl.create({
      title: 'Changer Tél 2',
      buttons: [
        'Quitter'
      ]
    });
    alert.addInput({
      name: 'tel2_user',
      value: this.user.tel2_user,
      placeholder: 'Tél'
    });
    alert.addButton({
      text: 'Valider',
      handler: (data: any) => {
      console.log(data);
      this.user.tel2_user=data.tel2_user;
      this.updateUser();
      }
    });
  
    alert.present();
  }
  changeAdresse(){
    let alert = this.alertCtrl.create({
      title: 'Changer Adresse',
      buttons: [
        'Quitter'
      ]
    });
    alert.addInput({
      name: 'adresse_user',
      value: this.user.adresse_user,
      placeholder: 'Adresse'
    });
    alert.addButton({
      text: 'Valider',
      handler: (data: any) => {
      console.log(data);
      this.user.adresse_user=data.adresse_user;
        this.updateUser();
      }
    });
  
    alert.present();
  }
  changeCodePostal(){
    let alert = this.alertCtrl.create({
      title: 'Changer Code Postal',
      buttons: [
        'Quitter'
      ]
    });
    alert.addInput({
      name: 'code_postal_user',
      value: this.user.code_postal_user,
      placeholder: 'Code Postal'
    });
    alert.addButton({
      text: 'Valider',
      handler: (data: any) => {
      console.log(data);
      this.user.code_postal_user=data.code_postal_user;
        this.updateUser();
       
      }
    });
    alert.present();
  }

}
