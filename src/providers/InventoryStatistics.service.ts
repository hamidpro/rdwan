import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
import { SharedProvider } from './shared/shared';

// Import RxJs required methods
//-----------------------------------------------------------------------
@Injectable()
export class InventoryStatisticsService {
  // Resolve HTTP using the constructor
  constructor (private toast: ToastController,private sqlite: SQLite,private shared:SharedProvider,private http: Http) {
    this.sqlite.create({
      name: shared.DBNAME,
      location: 'default'
    }).then((db: SQLiteObject) => { this.db=db; })
  }
  // private instance variable to hold base url
  list:any[]=[];
  db:SQLiteObject;
  private commentsUrl:string;
  setUrl(){this.commentsUrl='http://'+this.shared.getNetwork().serveur+':'+this.shared.getNetwork().port+'/api/statistics/inventory';}
  

  // Fetch all existing comments
  getTotalArticle(idInventory:number) :any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();

      return new Promise((resolve) => {
        this.http.get(this.commentsUrl+"/all/"+idInventory)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });


    }else{
      this.list=[];
      return  this.db.executeSql("Select count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?)",[idInventory])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                this.list.push({total:res.rows.item(i).total});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
            this.Toast("Error getTotalArticle ="+JSON.stringify(e),'middle');  return null;
       });
    }
  }


  // Fetch all existing comments
  getTotalArticleByAndroit(idInventory:any):any  {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();

    return new Promise((resolve) => {
      this.http.get(this.commentsUrl+"/androit/"+idInventory)
      .subscribe(res => {
         resolve(res.json());
       }, (err) => {
        this.shared.handleError(err);
       });
     });
    }else{
      this.list=[];
      return  this.db.executeSql("Select androit_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by androit_article",[idInventory])
      .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                this.list.push({name:res.rows.item(i).name,total:res.rows.item(i).total});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
        this.Toast("Error getTotalArticleByAndroit ="+JSON.stringify(e),'middle');  return null;
       });
    }
  }


  
    // Fetch all existing comments
    getTotalArticleByEtat(idInventory:any):any  {
      if(this.shared.getNetwork().option!="offline"){
      this.setUrl();

        return new Promise((resolve) => {
          this.http.get(this.commentsUrl+"/etat/"+idInventory)
          .subscribe(res => {
             resolve(res.json());
           }, (err) => {
            this.shared.handleError(err);
           });
         });
    
      }else{
        this.list=[];
        return  this.db.executeSql("Select etat_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by etat_article",[idInventory])
        .then(res => {
           if(res.rows!=undefined && res.rows!=null){
             if(res.rows.length>0) {
                 for(var i=0;i<res.rows.length;i++){
                  this.list.push({name:res.rows.item(i).name,total:res.rows.item(i).total});
                }
             }
           return this.list;
           }
         })
         .catch(e => {
          this.Toast("Error getTotalArticleByEtat ="+JSON.stringify(e),'middle');  return null;
         });
      }
    }




    // Fetch all existing comments
    getTotalArticleByCategory(idInventory:any):any  {
      if(this.shared.getNetwork().option!="offline"){
      this.setUrl();

        return new Promise((resolve) => {
          this.http.get(this.commentsUrl+"/category/"+idInventory)
          .subscribe(res => {
             resolve(res.json());
           }, (err) => {
            this.shared.handleError(err);
           });
         });

         
      }else{
        this.list=[];
        return  this.db.executeSql("Select categorie_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by categorie_article",[idInventory])
        .then(res => {
           if(res.rows!=undefined && res.rows!=null){
             if(res.rows.length>0) {
                 for(var i=0;i<res.rows.length;i++){
                  this.list.push({name:res.rows.item(i).name,total:res.rows.item(i).total});
                }
             }
           return this.list;
           }
         })
         .catch(e => {
              this.Toast("Error getTotalArticleByCategory ="+JSON.stringify(e),'middle');  return null;
         });
      }
    }


        // Fetch all existing comments
        getTotalArticleByFamille(idInventory:any):any  {
          if(this.shared.getNetwork().option!="offline"){
      this.setUrl();
  
        return new Promise((resolve) => {
          this.http.get(this.commentsUrl+"/famille/"+idInventory)
          .subscribe(res => {
             resolve(res.json());
           }, (err) => {
            this.shared.handleError(err);
           });
         });


      }else{
        this.list=[];
        return  this.db.executeSql("Select famille_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by famille_article ",[idInventory])
        .then(res => {
           if(res.rows!=undefined && res.rows!=null){
             if(res.rows.length>0) {
                 for(var i=0;i<res.rows.length;i++){
                  this.list.push({name:res.rows.item(i).name,total:res.rows.item(i).total});
                }
             }
           return this.list;
           }
         })
         .catch(e => {
          this.Toast("Error getInventoryByIdAdmin ="+JSON.stringify(e),'middle');  return null;
         });
      }
    }




            // Fetch all existing comments
            getTotalArticleByMarque(idInventory:any):any  {
              if(this.shared.getNetwork().option!="offline"){
      this.setUrl();
     
        return new Promise((resolve) => {
          this.http.get(this.commentsUrl+"/marque/"+idInventory)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            this.shared.handleError(err);
          });
        });

        
      }else{
        this.list=[];
        return  this.db.executeSql("Select marque_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by marque_article ",[idInventory])
        .then(res => {
           if(res.rows!=undefined && res.rows!=null){
             if(res.rows.length>0) {
                 for(var i=0;i<res.rows.length;i++){
                  this.list.push({name:res.rows.item(i).name,total:res.rows.item(i).total});
                }
             }
           return this.list;
           }
         })
         .catch(e => {
          this.Toast("Error getTotalArticleByMarque ="+JSON.stringify(e),'middle');  return null;
         });
      }
    }




            // Fetch all existing comments
            getTotalArticleByType(idInventory:any):any  {
              if(this.shared.getNetwork().option!="offline"){
      this.setUrl();

      return new Promise((resolve) => {
        this.http.get(this.commentsUrl+"/type/"+idInventory)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });

      }else{
        this.list=[];
        return  this.db.executeSql("Select type_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by type_article ",[idInventory])
        .then(res => {
           if(res.rows!=undefined && res.rows!=null){
             if(res.rows.length>0) {
                 for(var i=0;i<res.rows.length;i++){
                   this.list.push({name:res.rows.item(i).name,total:res.rows.item(i).total});
                 }
             }
           return this.list;
           }
         })
         .catch(e => {
          this.Toast("Error getTotalArticleByType ="+JSON.stringify(e),'middle');  return null;
         });
      }
    }

    Toast(message1:string,position1:string) {
      let toast = this.toast.create({
        message: message1,
        position: position1,
        duration:3000
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }

}
