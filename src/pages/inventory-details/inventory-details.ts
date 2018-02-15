import { ArticleInventory } from '../../Entity/Article_Inventory/ArticleInventory';
import * as moment from 'moment';

import { ArticlesNotInventoryPage } from '../articles-not-inventory/articles-not-inventory';
import { InventorylocationPage } from '../inventorylocation/inventorylocation';
import { InventoryStatistiquePage } from '../inventory-statistique/inventory-statistique';
import { SharedProvider } from '../../providers/shared/shared';
import { InventoryService } from '../../providers/Inventory.service';
import { ArticleService } from '../../providers/Article.service';
import { CodeBarPage } from '../code-bar/code-bar';
import { ArticleInventoryService } from '../../providers/ArticleInventory.service';
import { ArticleFormePage } from '../article-forme/article-forme';
import { Inventory } from '../../Entity/Inventory/Inventory';
import { Component } from '@angular/core';
import {
    AlertController,
    Events,
    IonicPage,
    NavController,
    NavParams,
    ToastController,
    ViewController,
} from 'ionic-angular';
import { Article } from '../../Entity/Article/Article';
import { ModalController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

//----------------------------------- PopoverPage ----------------------------
@Component({

  template: `
  <ion-list>

  <ion-list-header    >Menu</ion-list-header>
 <button  ion-item  *ngIf="admin==true && open!=true"    (click)="callFunction('enregistrer')"  > <i class="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Enregistrer</button>
 
 <button ion-item   *ngIf="admin==true && open!=true"    (click)="callFunction('statistques')"  ><i class="fa fa-line-chart" aria-hidden="true"></i>&nbsp;Statistques</button>
 
 <button ion-item   *ngIf="admin==true && open!=true"    (click)="callFunction('articlesNotInventory')"  ><i class="fa fa-minus-circle" aria-hidden="true">&nbsp;Articles Non Dénombrés</i></button>
 
 <button ion-item   *ngIf="admin==true && open!=true"    (click)="callFunction('clotuer')"  ><i class="fa fa-lock" aria-hidden="true"></i>&nbsp;Cloturer</button>
 
 <button ion-item   *ngIf="admin==true && open==true"    (click)="callFunction('openInventory')"  ><i class="fa fa-unlock" aria-hidden="true"></i>&nbsp; Ouvrir </button>
 
    </ion-list>
  `
})

 export class PopoverPage {
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
  selector: 'page-inventory-details',
  templateUrl: 'inventory-details.html',
})

export class InventoryDetailsPage {
      inventory:Inventory=new Inventory();
      listArticle:Article[]=[];
      article :Article=new Article();
      id_article:string;
      id_inventory:string;
      codeABar:any={};
     public admin:boolean;
     public  open:boolean;
      last_id_article:string;
      articleInventory:ArticleInventory=new ArticleInventory();
     
  constructor(public popoverCtrl: PopoverController,private shared:SharedProvider,public events: Events,private inventoryService:InventoryService,private serviceArticle:ArticleService,public modalCtrl: ModalController,private serviceArticleInventaire:ArticleInventoryService,private alertCtrl: AlertController,private toast:ToastController,public service:ArticleInventoryService,public navCtrl: NavController, public navParams: NavParams) {
    
  //
  }

  ionViewWillLeave() {
    this.inventory.start_date=moment(this.inventory.start_date).format("DD-MM-YYYY");
  }

  presentPopover(myEvent:any) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
     // alert("data="+data.function);
     if(data!=undefined && data!=null && data.function!=undefined && data.function!=null)
        switch (data.function) {
            case "enregistrer": this.enregistrer();  break;
            case "statistques": this.statistques(); break;
            case "articlesNotInventory":this.articlesNotInventory(); break;
            case "clotuer": this.clotuer(); break;
            case "openInventory":  this.openInventory();break;
            default: break;
             
          
      }
    });
  }

  



  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryDetailsPage');
    this.admin=this.shared.admin;

    if(this.navParams!=undefined && this.navParams!=null && this.navParams.data!=undefined && this.navParams.data!=null)
    {
      this.inventory=this.navParams.data;
      this.inventory.start_date="2017-11-27T12:11:00.000Z";
      this.getArticleByIdinventaire(this.inventory.id_inventory+"");
      
      if(this.inventory.status==0){
       
        this.shared.inventoryIsOpen=this.open=false;
      }
        
      else{
        this.shared.inventoryIsOpen=this.open=true;
      }
     
    }
    else
    this.inventory=new Inventory();
  }


  getArticleByIdinventaire(id_inventory:string){
    this.service.getArticleByIdinventaire(id_inventory).then((data:any)=>{
      console.log(data);
      //this.listInventory=data;

      if(data.code==undefined || data.code==null){
        //toast code
        //this.Toast(`get all article by id inventaire`, 'middle');
        this.inventory.listArticle=data;
      }
      else{
        this.Toast(`Error`+JSON.stringify(data),'middle');      }
  });


  }


  statistques(){
    this.navCtrl.push(InventoryStatistiquePage,this.inventory);
  }

  edit(article:Article,inventory:Inventory){
          console.log(inventory); 
    this.editArticleModal(article);
  }

  delete(article:Article,inventory:Inventory){
    this.id_article=article.id_article+"";
    this.id_inventory=inventory.id_inventory+"";
    this.ConfirmerDelete("Confirmation","Vous voulez retirer cet article ?");
  }

  goToArticle(article:Article,inventory:Inventory){
    this.navCtrl.push(ArticleFormePage,{"object":[article,inventory],"from":InventoryDetailsPage,"next":[InventoryDetailsPage]});
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


  //confirmer
  ConfirmerDelete(title:string,message:string) {
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
         
            this.deleteArticle(this.id_article+"",this.id_inventory+"");
  
          
            return true;
          }
        }
      ]
    });
    alert.present();
  }


   //confirmer
   ConfirmeAddArticle(title:string,message:string) {
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
            this.addArticleModal();
            return true;
          }
        }
      ]
    });
    alert.present();
  }


      //service getAllArticles
      deleteArticle(idArticle:string,idInventory:string){
        //code service +toast
        this.serviceArticleInventaire.removeArticle(idArticle,idInventory).then((data:any)=>{
          console.log(data);
          //this.listArticle=data;
  
          if(data.code==undefined || data.code==null){
            //toast code
                
            this.Toast('Article était bien supprimé', 'middle');
          this.getArticleByIdinventaire(this.inventory.id_inventory+"");
          
          }
          else{
            this.Toast(`Error`+JSON.stringify(data),'middle');
      
          }
      });
      
}

      //service getAllArticles
      addArticleToInventoryBD(idArticle:string,idInventory:string){
       
        let profileModal = this.modalCtrl.create(InventorylocationPage);
        profileModal.onDidDismiss(data => {
          if(data!=undefined && data!=null){
            console.error("idArticle= "+idArticle+"    idInventory"+idInventory);
            
            this.articleInventory.id_article=idArticle;
            this.articleInventory.id_inventory=idInventory;
            this.articleInventory.etat=data.etat_article;
            this.articleInventory.endroit=data.endroit_article

            this.serviceArticleInventaire.addArticleInventory(this.articleInventory).then((data:any)=>{
              console.log(data);
              //this.listArticle=data;
      
              if(data.code==undefined || data.code==null){
                //toast code
    
                this.Toast('Article était bien ajouter au inventaire', 'middle');
                    this.getArticleByIdinventaire(this.inventory.id_inventory+"");
              
              }
              else{
                this.Toast(`Error`+JSON.stringify(data),'middle');    
          
              }
          });
           
          }
         
        });
        profileModal.present();




       
}


checkArticleInventory(ref:string,idArticle3:number)
{
  this.serviceArticleInventaire.getArticleByRef(ref).then((data:any)=>{
    console.log("\n\n\n");
    console.log(data[0]);
  if(data.code==undefined || data.code==null){
   if(data[0]!=undefined && data[0]!=null){
      this.Toast("Article avec réference "+ref+"  déjà inventoré","middle");
   }else{
    this.Toast("Article "+ref+" n'est pas encore inventoré","middle");
    this.addArticleToInventoryBD(idArticle3+"",this.inventory.id_inventory+"");
  
   }
  }else{
    this.Toast(`Error`+JSON.stringify(data),'middle');
  }
  });
}
checkArticle(ref:string){
  this.serviceArticle.getArticleByRef(ref).then((data:any)=>{
    console.log("\n\n\n");
    console.log(data[0]);
    if(data.code==undefined || data.code==null){
   if(data[0]!=undefined && data[0]!=null){
      this.Toast("Article avec réference "+ref+" existe déjà au magasin >"+data[0].id_article,"middle");
      this.checkArticleInventory(ref,data[0].id_article);

   }else{
    this.Toast("Article "+ref+" n'existe pas au magasin","middle");
    this.ConfirmeAddArticle("Confirmation","Vous voulez ajouter cet article")
   }
  }else{
    this.Toast(`Error`+JSON.stringify(data),'middle');
  }
  });
}

editArticleModal(article:Article) {
  let profileModal = this.modalCtrl.create(ArticleFormePage,article);
  profileModal.onDidDismiss(data => {
    if(data!=undefined && data!=null){
     this.getArticleByIdinventaire(this.inventory.id_inventory+"");
    }
   
  });
  profileModal.present();
}


addArticleModal() {
  let profileModal = this.modalCtrl.create(ArticleFormePage);
  profileModal.onDidDismiss(data => {
    if(data!=undefined && data!=null){
      this.getlastArticle();
    }
   
  });
  profileModal.present();
}

scanCodeBar() {
  let profileModal = this.modalCtrl.create(CodeBarPage);
  profileModal.onDidDismiss(data => {
    console.log("scanCodeBar");
    console.log(data);
    if(data!=undefined && data!=null){
   
     if(data!=undefined && data!=null &&data.cancelled==false){
     
      this.codeABar=data;
      this.shared=this.codeABar.text;
      this.checkArticle(this.codeABar.text);
     }
    }
   
  });
  profileModal.present();
}


InventorylocationPage() {
  let profileModal = this.modalCtrl.create(InventorylocationPage);
  profileModal.onDidDismiss(data => {
    if(data!=undefined && data!=null){
   
     if(data!=undefined && data!=null &&data.cancelled==false){
     
     }
    }
   
  });
  profileModal.present();
}


addArticleToInventory(){
    this.scanCodeBar(); 
}

getlastArticle(){
  this.serviceArticle.getlastArticle().then((data:any)=>{
    console.log("------------- getlastArticle ------------------");
    console.log(data);
    console.log("-------------          ------------------");

    if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      // this.Toast("get last article","middle");
      this.last_id_article=data[0].id_article;
       this.addArticleToInventoryBD(data[0].id_article,this.inventory.id_inventory+"");
    }else{
      this.Toast(`Error`+JSON.stringify(data),'middle');    
    }
   });
}


updateInventory(){
  //this.inventory.end_date=this.inventory.end_date.replace(/T/g, " ");
  //this.inventory.end_date= this.inventory.end_date.replace(/Z/g, "");
  console.log("before ="+ this.inventory.start_date);
  this.inventory.start_date= this.inventory.start_date.replace(/T/g, " ");
  this.inventory.start_date= this.inventory.start_date.replace(/Z/g, "");
  console.log("after ="+ this.inventory.start_date);
  this.inventoryService.updateInventory(this.inventory).then((data:any)=>{
    console.error("-----------------------------------");
    console.error(data);
    console.error("-----------------------------------");
    
    if(data.code==undefined || data.code==null){
       this.Toast("Inventaire était bien modifié","middle");
       this.events.publish('user:addInventory');
    }else{
      this.Toast(`Error`+JSON.stringify(data),'middle');    
    }
   });
}

enregistrer(){
  this.updateInventory();
}


clotuer(){
  //code service +toast
  this.inventoryService.cloturer(this.inventory.id_inventory+"",1).then((data:any)=>{
    console.log(data);
    //this.listArticle=data;

    if(data.code==undefined || data.code==null){ 
      this.Toast('Inventaire est bien cloturé', 'middle');
      this.shared.inventoryIsOpen=this.open=true;
      this.events.publish('inventory:reload');
    }
    else{
      this.Toast(`Error`+JSON.stringify(data),'middle');    }
});
}

openInventory(){
  //code service +toast
  this.inventoryService.cloturer(this.inventory.id_inventory+"",0).then((data:any)=>{
    console.log(data);
    //this.listArticle=data;

    if(data.code==undefined || data.code==null){ 
      this.shared.inventoryIsOpen=this.open=false;
      this.Toast('Inventaire est ouvert', 'middle'); 
      this.events.publish('inventory:reload');
    }
    else{
      this.Toast(`Error`+JSON.stringify(data),'middle');    }
});
}


articlesNotInventory(){
  this.navCtrl.push(ArticlesNotInventoryPage,this.inventory);
}
}




