import { InventoryStatisticsService } from '../../providers/InventoryStatistics.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the InventoryStatistiquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory-statistique',
  templateUrl: 'inventory-statistique.html',
})
export class InventoryStatistiquePage {


  nbTotalArticle:any={};
  listCategories:any=[];
  listTypes:any=[];
  listFamilles:any=[];
  listMarques:any=[];
  idInventory:number;
  listEndroit:any=[];
  listEtat:any=[];
  constructor(private service:InventoryStatisticsService,private toast:ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatistiquePage');
    if(this.navParams.data!=undefined &&  this.navParams.data!=null){
        this.idInventory=this.navParams.data.id_inventory;
    }
      this.getAllStatistics();
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

  getTotalArticleByEtat() {
    this.service.getTotalArticleByEtat(this.idInventory).then((data:any)=>{
      console.log("----------------- getTotalArticleByEtat --------------------");
      console.log(data[0]);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listEtat=data[0];
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }

  getTotalArticleByAndroit() {
    this.service.getTotalArticleByAndroit(this.idInventory).then((data:any)=>{
      console.log("----------------- getTotalArticleByAndroit --------------------");
      console.log(data);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listEndroit=data;
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }

  
  getTotalArticle() {
    this.service.getTotalArticle(this.idInventory).then((data:any)=>{
      console.log("----------------- getTotalArticle --------------------");
      console.log(data[0]);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.nbTotalArticle=data[0];
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }


  getTotalArticleByCategory() {
    this.service.getTotalArticleByCategory(this.idInventory).then((data:any)=>{
      console.log("----------------- getTotalArticleByCategory --------------------");
      console.log(data);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listCategories=data;
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }


  getTotalArticleByFamille() {
    this.service.getTotalArticleByFamille(this.idInventory).then((data:any)=>{
      console.log("------------------- getTotalArticleByFamille ------------------");
      console.log(data);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listFamilles=data;
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
        
              }
  });
  }


  getTotalArticleByMarque() {
    this.service.getTotalArticleByMarque(this.idInventory).then((data:any)=>{
      console.log("-------------------------------------");
      console.log(data);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listMarques=data;
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');      }
  });
  }


  getTotalArticleByType() {
    this.service.getTotalArticleByType(this.idInventory).then((data:any)=>{
      console.log("-------------------------------------");
      console.log(data);
      console.log("-------------------------------------");
      if((data.code==undefined || data.code==null)&& (data[0]!=undefined && data[0]!=null)){      this.listTypes=data;
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');      }
  });
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
