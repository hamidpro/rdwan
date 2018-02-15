import { SharedProvider } from '../../providers/shared/shared';
import { NgForm } from '@angular/forms/src/directives';
import { Parametre } from '../../Entity/Parametre/Parametre';
import { ParametreService } from '../../providers/Parametres.service';
import { Setting } from '../../Entity/Setting/Setting';
import { Component } from '@angular/core';
import { AlertController, IonicPage, PopoverController, ToastController, ViewController } from 'ionic-angular';



//----------------------------------- PopoverPage ----------------------------
@Component({
  
    template: `
    <ion-list>
  
    <ion-list-header>Menu</ion-list-header>
   <button ion-item   *ngIf="admin==true && open!=true"    (click)="callFunction('refresh')"  ><i class="fa fa-refresh"></i>&nbsp;Refresh</button>
   
   </ion-list>
    `
  })
  
   export class PopoverPageParametre {
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
  selector: 'page-parametre',
  templateUrl: 'parametre.html',
})
export class ParametrePage {
  private setting:Setting;
  private listParametres:Parametre[]=[];
  public listParametresName:string[]=[];
  public  parametreSelected:string;
  public  valueSelected:string;
  private currentParametre:Parametre=new Parametre();
  submitted:boolean=false;
  admin:boolean;
  listValue:string="";

  constructor(public popoverCtrl: PopoverController,private shared:SharedProvider,private toast: ToastController,private service:ParametreService,public alertCtrl: AlertController) {
    this.setting=new Setting();

  }

  presentPopover(myEvent:any) {
    let popover = this.popoverCtrl.create(PopoverPageParametre);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
     // alert("data="+data.function);
     if(data!=undefined && data!=null && data.function!=undefined && data.function!=null)
        switch (data.function) {
            case "refresh": this.getALlParametres();  break;
            
            default: break;
             
          
      }
    });
  }

  
  changerValeur(valeur:string) {
    let alert = this.alertCtrl.create({
      title: 'Changer Nom Utilisateur',
      buttons: [
        'Quitter'
      ]
    });
    alert.addInput({
      name: 'valueSelected',
      value: valeur,
      placeholder: 'Value'
    });
    alert.addButton({
      text: 'Valider',
      handler: (data: any) => {
        console.log(data);
        this.currentParametre.value=data.valueSelected;
        this.updateParametre();
      }
    });

    alert.present();
    
  }
  updateParametre(){
  }

  getValues(data:any){
    console.log(this.setting);
      console.log(data);
      this.currentParametre=this.getParametreObject(data);
      if(this.currentParametre.value!=undefined && this.currentParametre.value!=null)
      this.listValue=this.currentParametre.value;
      else    this.listValue="";
  }

getParametreObject(name:string):any{
  for(let param of this.listParametres){
    if(param.key_name==name){
      return param;
  }
  
}
}

  ionViewDidLoad() {
    this.admin=true;
    console.log('ionViewDidLoad ParametrePage');
    this.getALlParametres();

    console.log("this.shared.idUser"+this.shared.idUser);
    if(this.shared.idUser=="1"){
        this.admin=false;
        console.error("ouiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    }else{
      this.admin=true;
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
        console.log("list des parametre -----------------------------------------")
        console.log(this.listParametresName);
      

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
      showCloseButton:true, closeButtonText:"OK",
      position: position1
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

//valider methde
  valider(form: NgForm){
    
    console.log('');
    if (form.valid) {
      this.submitted = true;
      this.currentParametre.value=this.listValue;
      this.service.updateParametre(this.currentParametre).then((data:any)=>{
        if(data.code==undefined || data.code==null){
          this.Toast("Le paramètre est bien modifié","middle");
          this.getALlParametres();
        }else{
          this.Toast(`Error`+JSON.stringify(data),'middle');
                }
      
    });
      }
      this.submitted = false;
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
         
          
            //this.changerValeur(this.valueSelected);
           

            return true;
          }
        }
      ]
    });
    alert.present();
  }


    //edit
    edit(value:string){
     this.changerValeur(value);
     this.valueSelected=value;
    }
    //delete
    delete(value:string){
      this.valueSelected=value;
      this.Confirmer("Confirmation","Vous Voulez vraiment Supprimer cet valeur")
      
    
    }
    //deleteParametre
   // deleteParametre(value:string){

    


}
