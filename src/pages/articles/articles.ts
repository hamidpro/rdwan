import { SharedProvider } from '../../providers/shared/shared';
import { CodeBarPage } from '../code-bar/code-bar';
import { CategoryPage } from '../category/category';
import { ArticleService } from '../../providers/Article.service';
//import { CodeBarPage } from '../code-bar/code-bar';
import { ArticleFormePage } from '../article-forme/article-forme';
import { Article } from '../../Entity/Article/Article';
import { Component } from '@angular/core';
import {
    AlertController,
    IonicPage,
    NavController,
    NavParams,
    PopoverController,
    ToastController,
    ViewController,
} from 'ionic-angular';
import { ModalController} from 'ionic-angular';

//----------------------------------- PopoverPage ----------------------------
@Component({
  
    template: `
    <ion-list>
  
    <ion-list-header>Menu</ion-list-header>
     <button  ion-item  *ngIf="admin==true && open!=true"    (click)="callFunction('newArticle')"  > <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Nouveau</button>
     <button ion-item   *ngIf="admin==true && open!=true"    (click)="callFunction('sortByCategory')"  ><i class="fa fa-sort-amount-desc" aria-hidden="true"></i>&nbsp;Filtrer</button>
     <button ion-item   *ngIf="admin==true && open!=true"    (click)="callFunction('refresh')"  ><i class="fa fa-refresh"></i>&nbsp;Refresh</button>
     
     </ion-list>
    `
  })
  
   export class PopoverPageArticle {
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
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {
  listArticle:Article[]=[];
  article :Article;
  id_article:string;

  constructor(public popoverCtrl: PopoverController,public modalCtrl: ModalController,private alertCtrl: AlertController,private toast: ToastController,private service:ArticleService,public navCtrl: NavController, public navParams: NavParams) {
    
  }


  presentPopover(myEvent:any) {
    let popover = this.popoverCtrl.create(PopoverPageArticle);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
     // alert("data="+data.function);
     if(data!=undefined && data!=null && data.function!=undefined && data.function!=null)
        switch (data.function) {
            case "newArticle": this.newArticle();  break;
            case "sortByCategory": this.sortByCategory(); break;
            case "refresh": this.getAllArticles(); break;
            default: break; 
      }
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesPage');
    this.getAllArticles();
  }


    //service getAllArticles
    getAllArticles(){
            //code service +toast
              this.service.getArticles().then((data:any)=>{
              console.log(data);
             
      
              if(data.code==undefined || data.code==null){
                this.listArticle=data;
                //toast code
               // this.Toast(`get ALl article`, 'middle');
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
           
              this.deleteArticle(this.id_article+"");
             
  
              return true;
            }
          }
        ]
      });
      alert.present();
    }

  //deleteArticle
  deleteArticle(id:string){
          //code service +toast
          this.service.removeArticle(id).then((data:any)=>{
            console.log(data);
            //this.listArticle=data;
    
            if(data.code==undefined || data.code==null){
              //toast code
              this.Toast('Article était bien supprimé', 'middle');
              this.getAllArticles();       
            }
            else{
              this.Toast(`Error`+JSON.stringify(data),'middle');
        
            }
        });
  }


  //newArticle
  newArticle(){
    this.codebarModal();
  }
  //goToArticle
  goToArticle(article:Article){
    console.log(article); //this.navCtrl.push(ArticleFormePage,article);
  }
  //edit
  edit(article:Article){
    this.navCtrl.push(ArticleFormePage,article);
  }
  //delete
  delete(article:Article){
    this.Confirmer("Confirmation","Vous Voulez vraiment Supprimer cet Article")
   this.id_article=article.id_article;
  
  }

//----------  sortByCategory
  sortByCategory(){
    this.presentCategorieModal();
  }
//----------   presentCategorieModal
  presentCategorieModal() {
    let categorieModal = this.modalCtrl.create(CategoryPage, {  });
    categorieModal.onDidDismiss(data => {
     
      this.getArticlesBycategory(data);
    });
    categorieModal.present();
  }
 

  ArticleFormePage() {
    let categorieModal = this.modalCtrl.create(ArticleFormePage, {  });
    categorieModal.onDidDismiss(data => {
      this.getAllArticles();
      console.log(data);
    });
    categorieModal.present();
  }




  codebarModal() {
    let categorieModal = this.modalCtrl.create(CodeBarPage, {  });
    categorieModal.onDidDismiss(data => {
      console.log(data);
      if(data!=undefined && data!=null &&data.cancelled==false)
            this.checkArticle(data.text);
        
    });
    categorieModal.present();
  }


  getArticlesBycategory(data:any){
    console.log(data);
 //code service +toast
  this.service.getArticlesBycategory(data).then((dataR:any)=>{
    console.error("-----------------------------------------------");
    console.error(dataR);
    console.error("-----------------------------------------------");
   

    if(dataR.code==undefined || dataR.code==null){
      //toast code
      //this.Toast('get articles by categories', 'middle');
     this.listArticle=dataR;  
    }
    else{
      this.Toast(`Erreur de réseau réessayer une autre fois`,'middle');


    }
});
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


  checkArticle(ref:string){
    this.service.getArticleByRef(ref).then((data:any)=>{
      console.log("\n\n\n");
      console.log(data[0]);
     if(data.code==undefined || data.code==null){
        this.Toast("Article "+ref+" existe déjà "+data[0].id_article,"middle");
     }else{
      this.ArticleFormePage();
      //this.Toast("Article "+ref+" n'existe pas ","middle");
     }
    });
  }
}
