import { NgForm } from '@angular/forms/src/directives';
import { Article } from '../../Entity/Article/Article';
import { Parametre } from '../../Entity/Parametre/Parametre';
import { ParametreService } from '../../providers/Parametres.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

/**
 * Generated class for the InventorylocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventorylocation',
  templateUrl: 'inventorylocation.html',
})
export class InventorylocationPage {
  listEtat:string[]=[];
  listEndroit:string[]=[];
  listParametres:Parametre[]=[];
  article:Article=new Article();
  submitted = false;

  constructor(private viewCtrl:ViewController,private toast: ToastController,private serviceParametre:ParametreService,public navCtrl: NavController, public navParams: NavParams) {
  }
splitListParametre(){
  for(let para of this.listParametres){
       
             if(para.key_name=="etat"){
              this.listEtat=para.value.split(",");
            }
            else if(para.key_name=="endroit"){
              this.listEndroit=para.value.split(",");
            }
  }
}


getParametres(){
  
      this.serviceParametre.getAllParametres().then((data:any)=>{
      console.log(data);
  
      if(data.code==undefined || data.code==null){
  
       // this.Toast(`get all parametre`, 'middle');
        this.listParametres=data;
        this.splitListParametre();
      }
      else{
        this.Toast(`Error`+JSON.stringify(data),'middle');      }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventorylocationPage');
    this.getParametres();
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

  dismiss() {
    this.viewCtrl.dismiss(this.article);
  }
  valider(form: NgForm){
    this.submitted = true;
    if (form.valid) {
    }
    this.viewCtrl.dismiss(this.article);
  }
cancel(){
  this.viewCtrl.dismiss(null);
}

}
