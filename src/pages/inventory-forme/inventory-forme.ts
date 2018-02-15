import { InventoryService } from '../../providers/Inventory.service';
import { CodeBarPage } from '../code-bar/code-bar';
import { Component } from '@angular/core';
import { AlertController, Events, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Inventory } from '../../Entity/Inventory/Inventory';
import { NgForm } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-inventory-forme',
  templateUrl: 'inventory-forme.html',
})
export class InventoryFormePage {
  inventory:Inventory=new Inventory();
  submitted = false;
  constructor(private events: Events,private toast: ToastController,public alertCtrl: AlertController,public service:InventoryService,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryFormePage');

   
        this.inventory=new Inventory();
        let date=new Date();
        this.inventory.start_date=date.toISOString();
        console.log("----------------666>>+"+this.inventory.start_date);
 
    
  }

      //service getAllArticles
      addInventory(inventory:Inventory){
        //code service +toast
        inventory.start_date=new Date(inventory.start_date).toISOString();
          this.service.addInventory(inventory).then((data:any)=>{
          console.log(data);
  
          if(data.code==undefined || data.code==null){
            //toast code
            this.Toast(`Inventaire est bien ajouté`, 'middle');
            this.navCtrl.pop();
            this.events.publish('user:addInventory');
          }
          else{
            this.Toast(`Erreur `+JSON.stringify(data), 'middle');
          }
      });
  }

  
 

  addArticle(){
    this.navCtrl.push(CodeBarPage,{"page":"inventory"});
  }


  valider(form: NgForm) {
     this.submitted = true;

    if (form.valid) {
   
      this.inventory.start_date= this.inventory.start_date.replace(/T/g, " ");
      this.inventory.start_date= this.inventory.start_date.replace(/Z/g, "");

      console.log("--------------------------------------");
      console.log(this.inventory);
      console.log("--------------------------------------");
      this.addInventory(this.inventory);
     
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

  dismiss() {
    //this.viewCtrl.dismiss(t);
  }

  cancelthis(){
    this.navCtrl.pop();
  }
}
