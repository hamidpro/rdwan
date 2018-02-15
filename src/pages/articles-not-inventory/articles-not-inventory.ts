import { Inventory } from '../../Entity/Inventory/Inventory';
import { ArticleService } from '../../providers/Article.service';
import { ArticleFormePage } from '../article-forme/article-forme';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Article } from '../../Entity/Article/Article';

/**
 * Generated class for the ArticlesNotInventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articles-not-inventory',
  templateUrl: 'articles-not-inventory.html',
})
export class ArticlesNotInventoryPage {
  listArticle:Article[]=[];
  article :Article;
  id_article:number;
  inventory:Inventory=new Inventory();

  constructor(private toast: ToastController,private service:ArticleService,public navCtrl: NavController, public navParams: NavParams) {
 
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesNotInventoryPage');

    if(this.navParams!=undefined && this.navParams!=null && this.navParams.data!=undefined && this.navParams.data!=null)
    {
      this.inventory=this.navParams.data;
    }

    this.getArticlesnotininventory();
  }


  getArticlesnotininventory(){
    //code service +toast
      this.service.getArticlesnotininventory(this.inventory.id_inventory).then((data:any)=>{
      console.log(data);
     

      if(data.code==undefined || data.code==null){
        this.listArticle=data;
       
      }
      else{
        this.Toast(`Error`+JSON.stringify(data),'middle');


      }
  });
}

edit(article:Article){
  this.navCtrl.push(ArticleFormePage,article);
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
