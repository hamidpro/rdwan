import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';

import { ArticleInventory } from '../Entity/Article_Inventory/ArticleInventory';
import { SharedProvider } from './shared/shared';

// Import RxJs required methods
//-----------------------------------------------------------------------
@Injectable()
export class ArticleInventoryService {
  list:ArticleInventory[]=[];
  db:SQLiteObject; 


  
  
  constructor (private toast: ToastController,private sqlite: SQLite,private shared:SharedProvider,private http: Http) {
    //--------------   SQLLITE ------------------------
    this.sqlite.create({
      name: shared.DBNAME,
      location: 'default'
    }).then((db: SQLiteObject) => {  return  this.db=db; })
    //--------------------------------------------------

  }
  // private instance variable to hold base url

  private commentsUrl:string="";
  setUrl(){this.commentsUrl='http://'+this.shared.getNetwork().serveur+':'+this.shared.getNetwork().port+'/api/articlesinventory';}
  

  getArticleByRef(ref:string):any{
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();

      return new Promise((resolve) => {
        this.http.get(this.commentsUrl+"/search/ref/"+ref)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });
    }else{
      this.list=[];
      return  this.db.executeSql("Select * from article where id_article in (Select id_article from article_inventory where reference_article=?)",[ref])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                this.list.push({id_ArticleInventory:res.rows.item(i).id_ArticleInventory,id_article:res.rows.item(i).id_article,id_inventory:res.rows.item(i).id_inventory,status:res.rows.item(i).status,etat:res.rows.item(i).etat,endroit:res.rows.item(i).endroit,id_user_inventory:res.rows.item(i).id_user_inventory});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error SELECT * FROM users",'middle');
           console.log(e);
           return null;
       });
    }
  }

  
  getArticleByIdinventaire(id:string):any  {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();

      return new Promise((resolve) => {
        this.http.get(this.commentsUrl+"/inventory/"+id)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });

    }else{
      this.list=[];
      return  this.db.executeSql("select * from articles where id_article in (select id_article from article_inventory where id_inventory=? )",[id])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                this.list.push({id_ArticleInventory:res.rows.item(i).id_ArticleInventory,id_article:res.rows.item(i).id_article,id_inventory:res.rows.item(i).id_inventory,status:res.rows.item(i).status,etat:res.rows.item(i).etat,endroit:res.rows.item(i).endroit,id_user_inventory:res.rows.item(i).id_user_inventory});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getArticleByIdinventaire",'middle');
           console.log(e);
           return null;
       });
    }
  }


  getArticleInventorys() :any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();

        return new Promise((resolve) => {
        this.http.get(this.commentsUrl)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });

    }else{
      this.list=[];
      return  this.db.executeSql("Select * from article_inventory",{})
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                this.list.push({id_ArticleInventory:res.rows.item(i).id_ArticleInventory,id_article:res.rows.item(i).id_article,id_inventory:res.rows.item(i).id_inventory,status:res.rows.item(i).status,etat:res.rows.item(i).etat,endroit:res.rows.item(i).endroit,id_user_inventory:res.rows.item(i).id_user_inventory});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getArticleInventorys",'middle');
           console.log(e);
           return null;
       });
    }
  }


  
  getArticleInventory(ref:string):any  {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();

      return new Promise((resolve) => {
        this.http.get(this.commentsUrl+"/"+ref)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });

    }else{
      this.list=[];
      return  this.db.executeSql("Select * from article where id_article in (Select id_article from article_inventory where reference_article=?)",[ref])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                this.list.push({id_ArticleInventory:res.rows.item(i).id_ArticleInventory,id_article:res.rows.item(i).id_article,id_inventory:res.rows.item(i).id_inventory,status:res.rows.item(i).status,etat:res.rows.item(i).etat,endroit:res.rows.item(i).endroit,id_user_inventory:res.rows.item(i).id_user_inventory});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getArticleInventory",'middle');
           console.log(e);
           return null;
       });
    }
  }
  // Add a new comment
  addArticleInventory (body:ArticleInventory):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    console.log("------------------------- addArticleInventory -------------------------");
    console.log(body);
    console.log("--------------------------------------------------");
    
    body.id_ArticleInventory="artInve_"+this.shared.getUniqueID();
    body.id_user_inventory=this.shared.getIdUser();


    let headers       = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

      return new Promise((resolve) => {
        this.http.post(this.commentsUrl+'/'+body.id_inventory,body, options)
              .subscribe(res => {
                 resolve(res.json());
               }, (err) => {
                this.shared.handleError(err);
               });
             });


    }else{
      this.list=[];
      return  this.db.executeSql("insert into article_inventory  values(null,?,?,now(),0,?,?);",[body.id_ArticleInventory,body.id_article,body.endroit,body.etat])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
                  if(res.rows!=undefined && res.rows!=null){
            if(res.rowsAffected>0) {
              return body;
           }
           else
              return null;
         }
         }
       })
       .catch(e => {
           this.Toast("Error addArticleInventory",'middle');
           console.log(e);
           return null;
       });
    }
  }

  // Update a comment
  updateArticleInventory (body: ArticleInventory):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


      return new Promise((resolve) => {
        this.http.put(`${this.commentsUrl}/${body['id_article']}`, body, options)
              .subscribe(res => {
                 resolve(res.json());
               }, (err) => {
                this.shared.handleError(err);
               });
             });


    }else{
      this.list=[];
      return  this.db.executeSql("update article_inventory set id_article=?,id_inventory=? where id_article_inventory=? ",[body.id_article,body.id_inventory,body.id_ArticleInventory])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
          if(res.rows!=undefined && res.rows!=null){
            if(res.rows!=undefined && res.rows!=null){
              if(res.rowsAffected>0) {
                return body;
                      }
            else
                return null;
   }
   }
         }
       })
       .catch(e => {
           this.Toast("Error updateArticleInventory",'middle');
           console.log(e);
           return null;
       });
    }
  }

  // Delete a comment
  removeArticle (idArticle:string,idInventaire:string) :any{
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();

      return new Promise((resolve) => {
        this.http.delete(`${this.commentsUrl}/${idArticle}/${idInventaire}`)
              .subscribe(res => {
                 resolve(res.json());
               }, (err) => {
                this.shared.handleError(err);
               });
             });

    }else{
      this.list=[];
      return  this.db.executeSql("delete from article_inventory where id_article=? and id_inventory=?",[idArticle,idInventaire])
       .then(res => {
        if(res.rows!=undefined && res.rows!=null){
          if(res.rowsAffected>0) {
            return new ArticleInventory();
         }
         else
            return null;
       }
       })
       .catch(e => {
           this.Toast("Error ArticleInventory",'middle');
           console.log(e);
           return null;
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
