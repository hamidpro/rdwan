import { SharedProvider } from '../../providers/shared/shared';
import { Parametre } from '../../Entity/Parametre/Parametre';
import { ParametreService } from '../../providers/Parametres.service';

import { ArticleService } from '../../providers/Article.service';
import { NgForm } from '@angular/forms';
import { Article } from '../../Entity/Article/Article';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ArticleFormePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-forme',
  templateUrl: 'article-forme.html',
})
export class ArticleFormePage {
  article:Article=new Article();
  submitted = false;
  edit:boolean=false;
  add:boolean=true;
  listParametres:Parametre[]=[];

  listFamilles:string[]=[];
  listCategories:string[]=[];
  listTypes:string[]=[];
  listMarques:string[]=[];
  listEtat:string[]=[];
  listEndroit:string[]=[];


  constructor(private geolocation: Geolocation,private shared:SharedProvider,private viewCtrl:ViewController,private serviceParametre:ParametreService,public alertCtrl: AlertController,private toast: ToastController,public service:ArticleService,public navCtrl: NavController, public navParams: NavParams) {
   
   
  }
  dismiss(data:any) {
   
    this.viewCtrl.dismiss(data);
  }

  valider(form: NgForm) {
    this.submitted = true;
    console.log('valider ArticleFormePage '+this.edit+"  "+this.navParams.data);
    if (form.valid) {
        this.addArticle(this.article);
       
      }}
      
  modifier(form: NgForm) {
    this.submitted = true;
    console.log('valider ArticleFormePage '+this.edit+"  "+this.navParams.data);
    if (form.valid) {
      this.editArticle(this.article);
       
      }}
      
  cancel() {
    this.dismiss(null);
  }

  ionViewDidLoad() {
    this.getParametres();
    this.submitted = false;
    console.log("----------------------------------------");
    console.log(this.navParams.data);
    console.log("----------------------------------------");
    console.log('ionViewDidLoad ArticleFormePage '+this.edit+"  "+this.navParams.data);
    if(this.navParams!=undefined && this.navParams!=null && this.navParams.data!=undefined && this.navParams.data!=null)
   {
     if(this.navParams.data.id_article!=undefined && this.navParams.data.id_article!=null){
      this.edit=true;
      this.article=this.navParams.data;
     }
     else {
      this.edit=false;
      this.article=new Article();
      this.article.ville_article="Rabat";
      this.article.reference_article=this.shared.reference_article;
      this.article.Date_entree_article=new Date().toISOString();
    }

   } 
    
   console.log("----------------------------------------");
   console.log(this.edit);
   console.log("----------------------------------------");

   this.getPosition();
   
  }

  getPosition():any{
    return this.geolocation.getCurrentPosition().then((resp:any) => {
      // resp.coords.latitude
      // resp.coords.longitude
      return resp.coords;
     }).catch((error:any) => {
       console.log('Error getting location', error);
       return error;
     });
    
  }

        //service getAllArticles
addArticle(article:Article){
  this.submitted = false;
          //code service +toast

          this.article.date_de_sortie_article=this.article.date_de_sortie_article.replace(/T/g, " ");
          this.article.date_de_sortie_article= this.article.date_de_sortie_article.replace(/Z/g, "");
          
          this.article.Date_entree_article=  this.article.Date_entree_article.replace(/T/g, " ");
          this.article.Date_entree_article= this.article.Date_entree_article.replace(/Z/g, "");

        
            console.error("reference "+article.reference_article+"=="+this.shared.reference_article);
            this.service.addArticle(article).then((data:any)=>{
            console.log(data);
    
            if(data.code==undefined || data.code==null){
              //toast code
             
              this.Toast(`Article est bien ajouté`, 'middle');
              this.dismiss(article);
            }
            else{
              this.Toast(`Error`+JSON.stringify(data),'middle');            }
        });
    }

    editArticle(article:Article){
      this.submitted = false;

    article.date_de_sortie_article=article.date_de_sortie_article.replace(/T/g, " ");
    article.date_de_sortie_article=article.date_de_sortie_article.replace(/Z/g, "");
      
    article.Date_entree_article= article.Date_entree_article.replace(/T/g, " ");
    article.Date_entree_article= article.Date_entree_article.replace(/Z/g, "");

      //code service +toast
        this.service.updateArticle(article).then((data:any)=>{
        console.log(data);

        if(data.code==undefined || data.code==null){
          //toast code
          
          this.Toast(`Article est bien modifié`, 'middle');
          this.dismiss(article);
        }
        else{
          this.Toast(`Error`+JSON.stringify(data),'middle');
                }
    });
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
      this.Toast(`Error`+JSON.stringify(data),'middle');
    }
});
}


splitListParametre(){
  for(let para of this.listParametres){
        if(para.key_name=="categorie"){
            this.listCategories =para.value.split(",");
        }
        else if(para.key_name=="famille"){
          this.listFamilles=para.value.split(",");
         }
        else if(para.key_name=="type"){
          this.listTypes=para.value.split(",");
          }
          else if(para.key_name=="marque"){
            this.listMarques=para.value.split(",");
            }
            else if(para.key_name=="etat"){
              this.listEtat=para.value.split(",");
            }
            else if(para.key_name=="endroit"){
              this.listEndroit=para.value.split(",");
            }
  }
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



}