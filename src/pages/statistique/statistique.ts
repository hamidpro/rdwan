import { SharedProvider } from '../../providers/shared/shared';
import { StatisticsService } from '../../providers/Statistics.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController, ViewController } from 'ionic-angular';



//----------------------------------- PopoverPage ----------------------------
@Component({
  
    template: `
    <ion-list>
  
    <ion-list-header>Menu</ion-list-header>
   <button ion-item   *ngIf="admin==true && open!=true"    (click)="callFunction('refresh')"  ><i class="fa fa-refresh"></i>&nbsp;Refresh</button>
   
   </ion-list>
    `
  })
  
   export class PopoverPageStatistic {
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
  selector: 'page-statistique',
  templateUrl: 'statistique.html',
})
export class StatistiquePage {

  nbTotalArticle:any={};
  listCategories:any=[];
  listTypes:any=[];
  listFamilles:any=[];
  listMarques:any=[];
  listEndroit:any=[];
  listEtat:any=[];
  constructor(public popoverCtrl: PopoverController,private service:StatisticsService,private toast:ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatistiquePage');

    this.getAllStatistics();
  }

  presentPopover(myEvent:any) {
    let popover = this.popoverCtrl.create(PopoverPageStatistic);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
     // alert("data="+data.function);
     if(data!=undefined && data!=null && data.function!=undefined && data.function!=null)
        switch (data.function) {
          
            case "refresh": this.getAllStatistics();  break;
            
            default: break;
             
          
      }
    });
  }



  getAllStatistics(){
    this.getTotalArticle();
    this.getTotalArticleByCategory();
    this.getTotalArticleByFamille();
    this.getTotalArticleByMarque();
    this.getTotalArticleByType();

    this.getTotalArticleByEtat();
    this.getTotalArticleByAndroit();


  }
  getTotalArticle() {
    this.service.getTotalArticle().then((data:any)=>{
      console.log("----------------- getTotalArticle --------------------");
      console.log(data[0]);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.nbTotalArticle=data[0];
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }

  getTotalArticleByEtat() {
    this.service.getTotalArticleByEtat().then((data:any)=>{
      console.log("----------------- getTotalArticle --------------------");
      console.log(data[0]);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listEtat=data[0];
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }

  getTotalArticleByAndroit() {
    this.service.getTotalArticleByAndroit().then((data:any)=>{
      console.log("----------------- getTotalArticle --------------------");
      console.log(data[0]);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listEndroit=data[0];
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }

  getTotalArticleByCategory() {
    this.service.getTotalArticleByCategory().then((data:any)=>{
      console.log("-------------------------------------");
      console.log(data);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listCategories=data;
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }


  getTotalArticleByFamille() {
    this.service.getTotalArticleByFamille().then((data:any)=>{
      console.log("-------------------------------------");
      console.log(data);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listFamilles=data;
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }


  getTotalArticleByMarque() {
    this.service.getTotalArticleByMarque().then((data:any)=>{
      console.log("-------------------------------------");
      console.log(data);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listMarques=data;
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }


  getTotalArticleByType() {
    this.service.getTotalArticleByType().then((data:any)=>{
      console.log("-------------------------------------");
      console.log(data);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listTypes=data;
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }


  Toast(message1:string,position1:string) {
    let toast = this.toast.create({
      message: message1,
      position: position1,
      showCloseButton:true,
       closeButtonText:"OK",
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
