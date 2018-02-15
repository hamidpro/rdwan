import { Category } from '../../Entity/Category/Category.ts';

import { NgForm } from '@angular/forms/src/directives';
import { ParametreService } from '../../providers/Parametres.service';
import { SharedProvider } from '../../providers/shared/shared';
import { Component } from '@angular/core';
import { AlertController, IonicPage, ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Parametre } from '../../Entity/Parametre/Parametre';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  private listParametres:Parametre[]=[];
  public  listParametresName:string[]=[];
  public  listParametresValue:string[]=[];
  public  parametreSelected:string;
  private currentParametre:Parametre=new Parametre();
  submitted:boolean=false;
  public listValue:string="";
  category:Category=new Category();

  ValueSelected:string;

  constructor(private viewCtrl:ViewController,private shared:SharedProvider,private toast: ToastController,private service:ParametreService,public alertCtrl: AlertController) {
    

    
  }


  getValues(data:any){
      console.log(data);
      this.currentParametre=this.getParametreObject(data);


      this.listParametresValue=this.currentParametre.value.split(",");
  }

getParametreObject(name:string):any{
  for(let param of this.listParametres){
    if(param.key_name==name){
      return param;
  }
  
}
}

  ionViewDidLoad() {
  
    console.log('ionViewDidLoad ParametrePage');
    this.getALlParametres();

    console.log("this.shared.idUser"+this.shared.idUser);
    if(this.shared.idUser=="1"){
     
        console.error("ouiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    }else{
     
      console.error("noooooooooooooooooooooooooooooooooooooooooooooooooooo");
    }
  }

  //getALlParametres
  getALlParametres(){
    if(this.listParametresName.length!=0) this.listParametresName=[];

    this.service.getAllParametres().then((data:any)=>{
      if(data.code==undefined || data.code==null){
        this.listParametres = data;
        for(let para of this.listParametres){
          this.listParametresName.push(para.key_name);
        }
      }else{
        this.Toast(`Error`+JSON.stringify(data),'middle');
            }
      

      console.log('--------------------------------');
      console.log(this.listParametresName);
      console.log('--------------------------------');

     
      
  });

  }



  Toast(message1:string,position1:string) {
    let toast = this.toast.create({
      message: message1,
     showCloseButton:true,         closeButtonText:"OK",
      position: position1,
    
    
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  dismiss() {
     this.viewCtrl.dismiss(this.category);
   }

//valider methde
  valider(form: NgForm){
     this.submitted = true;
    console.log('');
    if (form.valid) {

      switch(this.parametreSelected){
        case 'categorie': this.category.name="categorie_article"; break;
        case 'marque': this.category.name="marque_article"; break;
        case 'famille': this.category.name="famille_article"; break;
        case 'type': this.category.name="type_article"; break;
        case 'etat': this.category.name="etat_article"; break;
        case 'endroit': this.category.name="endroit_article"; break;
      }   
      this.category.value=this.ValueSelected;
      this.dismiss();
      }
     
  }


    cancel() {
    this.dismiss();
  }

   

}