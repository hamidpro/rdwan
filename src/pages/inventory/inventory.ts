import * as moment from 'moment';

import { SharedProvider } from '../../providers/shared/shared';
import { InventoryService } from '../../providers/Inventory.service';
import { InventoryDetailsPage } from '../inventory-details/inventory-details';
import { InventoryFormePage } from '../inventory-forme/inventory-forme';
import { Inventory } from '../../Entity/Inventory/Inventory';
import { Component } from '@angular/core';
import {
    AlertController,
    Events,
    IonicPage,
    NavController,
    NavParams,
    PopoverController,
    ToastController,
    ViewController,
} from 'ionic-angular';

//----------------------------------- PopoverPage ----------------------------
@Component({
  
    template: `
    <ion-list>
  
    <ion-list-header >Menu</ion-list-header>
   <button  ion-item  *ngIf="admin==true && open!=true"    (click)="callFunction('newInventory')"  > <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Nouveau</button>
   <button ion-item   *ngIf="admin==true && open!=true"    (click)="callFunction('refresh')"  ><i class="fa fa-refresh"></i>&nbsp;Refresh</button>
   
   </ion-list>
    `
  })
  
   export class PopoverPageInventory {
    public  admin:boolean;
    public  open:boolean;
  
    constructor(public viewCtrl: ViewController,shared:SharedProvider) {
      this.admin=shared.admin;
      this.open=shared.inventoryIsOpen;
    }
  
    callFunction(nameOfFunction:any) {//alert("callFunction="+nameOfFunction);
      this.viewCtrl.dismiss({function:nameOfFunction});
    }
  
   
  }

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {
  listInventory:Inventory[]=[];
  inventory :Inventory;
  admin:boolean;
  constructor(public popoverCtrl: PopoverController,private shared:SharedProvider,private events: Events,public alertCtrl: AlertController,private toast: ToastController,public service:InventoryService,public navCtrl: NavController, public navParams: NavParams) {

    this.events.subscribe('user:addInventory', () => {
     this.getAllInventory();
     });

     this.events.subscribe('inventory:reload', () => {
      this.getAllInventory();
    });

  }
  

  presentPopover(myEvent:any) {
    let popover = this.popoverCtrl.create(PopoverPageInventory);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
     // alert("data="+data.function);
     if(data!=undefined && data!=null && data.function!=undefined && data.function!=null)
        switch (data.function) {
            case "newInventory": this.newInventory();  break;
            case "refresh": this.getAllInventory();  break;
            
            default: break;
             
          
      }
    });
  }



  ionViewDidLoad() {
    this.admin=this.shared.admin;
    console.log('ionViewDidLoad InventoryPage');
    this.getAllInventory();
   
  }



//service getAllArticles
 getAllInventory(){
      //code service +toast
        this.service.getAllInventorys().then((data:any)=>{
        console.log(data);
        if(data.code==undefined || data.code==null){
          //toast code
          //this.Toast(`get ALl Inventory`, 'middle');
          this.listInventory=data;
          for( let v of this.listInventory){
             
                v.start_date= moment(v.start_date).format("DD-MM-YYYY");
          }
        }
        else{
          this.Toast(`Error`+JSON.stringify(data),'middle');
            }
    });
}

Confirmer(title:string,message:string) {
const alert = this.alertCtrl.create({
  title: title,
  message: message,
  buttons: [
    {
      text: 'Quitter',
      role: 'Quitter',
      handler: () => {
        console.log('Cancel clicked');
       
      }
    },
    {
      text: 'OUI',
      handler: () => {
        console.log('delete clicked');
        this.deleteInventory(this.inventory.id_inventory+"");
        
        this.getAllInventory();
        return true;
      }
    }
  ]
});
alert.present();
}




  //service getAllArticles
deleteInventory(id:string){
    //code service +toast
    this.service.removeInventory(id).then((data:any)=>{
      console.log(data);
      //this.listInventory=data;

      if(data.code==undefined || data.code==null){
        //toast code
        this.Toast(`Inventaire `+id+' était bien supprimé', 'middle');
        this.getAllInventory();
        
      }
      else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
            }
  });
}



  newInventory(){
    this.navCtrl.push(InventoryFormePage,{callback: () => {this.getAllInventory();} });
  }

  goToInventory(inventory:Inventory){
    console.log(inventory);
  }

  edit(inventory:Inventory){
    this.navCtrl.push(InventoryDetailsPage,inventory);
  }

  delete(inventory:Inventory){
    this.inventory=inventory;
    console.log(inventory);
    this.Confirmer("Confirmation","Vous Voulez vraiment Supprimer cet inventaire")
     
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
