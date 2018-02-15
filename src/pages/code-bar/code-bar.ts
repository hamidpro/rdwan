import { SharedProvider } from '../../providers/shared/shared';

import { ArticleFormePage } from '../article-forme/article-forme';
import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {  IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-code-bar',
  templateUrl: 'code-bar.html',
})
export class CodeBarPage {
options:BarcodeScannerOptions;
codeABar:any={text:"12345",format:"",cancelled:true};
done:boolean=false;
page:string="0";
  constructor(private shared:SharedProvider, public viewCtrl: ViewController,private toast: ToastController,private barcodeScanner: BarcodeScanner,public navCtrl: NavController, public navParams: NavParams) {
    
  }
  cancel() {
    this.codeABar.cancelled=true;
    this.dismiss();
  }
  dismiss() {
     this.viewCtrl.dismiss(this.codeABar);
   }
   
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeBarPage');
    //this.scan();

    if(this.navParams!=undefined && this.navParams!=null && this.navParams.data!=undefined && this.navParams.data!=null)
    this.page=this.navParams.data.page;
  }

  
 async scan(){
      const result=await this.barcodeScanner.scan();
      if(result!=undefined && result!=null){
        //if(result.cancelled==false)
           // this.Toast("Le scan est fait avec succès","middle");

        this.codeABar=result; 
        this.shared.reference_article=this.codeABar.text;       
        this.dismiss();
      }else{
        this.Toast("Le scan n'est pas fait avec succès veuillez réessayer une autre fois","middle");
      }
}

scan2()
{ 
  this.shared.reference_article=this.codeABar.text;
  this.codeABar.cancelled=false;
  this.dismiss();
}



newArticle(){
  this.navCtrl.push(ArticleFormePage,{"page":this.page});
}



Toast(message1:string,position1:string) {
  let toast = this.toast.create({
    message: message1,
    showCloseButton:true,
    closeButtonText:"OK",
    position: position1
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}