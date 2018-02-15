import { Category } from '../Entity/Category/Category.ts';
import { ToastController } from 'ionic-angular';
import { SharedProvider } from './shared/shared';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Article} from "../Entity/Article/Article";
//-----------------------------------------------------------------------
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Injectable()
export class ArticleService {
  list:Article[]=[];
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

  private commentsUrl:string;
  setUrl(){this.commentsUrl='http://'+this.shared.getNetwork().serveur+':'+this.shared.getNetwork().port+'/api/articles';}

    request:string;
  getArticlesBycategory (categorie: Category):any {

    if(this.shared.getNetwork().option!="offline"){
    console.log("\n\n\n");
    console.log(Article);
    console.log("\n\n\n");
    this.setUrl();
    let headers       = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return new Promise((resolve) => {
      this.http.post(this.commentsUrl+"/search", categorie, options)
      .subscribe(res => {
         resolve(res.json());
       }, (err) => {
        this.shared.handleError(err);
       });
     });

    }else{
      this.list=[];
      if(categorie.name=="categorie")
                this.request="select * from articles where categorie_article=?";
       if(categorie.name=="type")
                this.request="select * from articles where type_article=?";
      if(categorie.name=="famille")
                this.request="select * from articles where famille_article=?";
      if(categorie.name=="marque")
                this.request="select * from articles where marque_article=?";

       if(categorie.name=="etat")
                this.request="select * from articles where etat_article=?";
        if(categorie.name=="endroit")
                this.request="select * from articles where endroit_article=?";

      return   this.db.executeSql(this.request,[categorie.value])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_article:res.rows.item(i).id_article,reference_article:res.rows.item(i).reference_article,ville_article:res.rows.item(i).ville_article,prix_ht_acquisition_article:res.rows.item(i).prix_ht_acquisition_article,marque_article:res.rows.item(i).marque_article,prix_ttc_acquisition_article:res.rows.item(i).prix_ttc_acquisition_article,libelle_article:res.rows.item(i).libelle_article,Date_entree_article:res.rows.item(i).Date_entree_article,date_de_sortie_article:res.rows.item(i).date_de_sortie_article,fabriquant_article:res.rows.item(i).fabriquant_article,prix_ht_sortie_article:res.rows.item(i).prix_ht_sortie_article,fournisseur_article:res.rows.item(i).fournisseur_article,prix_ttc_sortie_article:res.rows.item(i).prix_ttc_sortie_article,client_article:res.rows.item(i).client_article,categorie_article:res.rows.item(i).categorie_article,description_article:res.rows.item(i).description_article,type_article:res.rows.item(i).type_article,famille_article:res.rows.item(i).famille_article,id_magasin:res.rows.item(i).id_magasin,status:res.rows.item(i).status,endroit_article:res.rows.item(i).endroit_article,etat_article:res.rows.item(i).etat_article,position:res.rows.item(i).position});
               }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getArticlesBycategory",'middle');
           console.log(e);
           return null;
       });
    }
  }


  getlastArticle():any{
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();


      return new Promise((resolve) => {
        this.http.get(this.commentsUrl+"/last/last")
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });


    }else{
      this.list=[];
      return  this.db.executeSql("select * from articles ORDER BY id_article DESC LIMIT 1",{})
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_article:res.rows.item(i).id_article,reference_article:res.rows.item(i).reference_article,ville_article:res.rows.item(i).ville_article,prix_ht_acquisition_article:res.rows.item(i).prix_ht_acquisition_article,marque_article:res.rows.item(i).marque_article,prix_ttc_acquisition_article:res.rows.item(i).prix_ttc_acquisition_article,libelle_article:res.rows.item(i).libelle_article,Date_entree_article:res.rows.item(i).Date_entree_article,date_de_sortie_article:res.rows.item(i).date_de_sortie_article,fabriquant_article:res.rows.item(i).fabriquant_article,prix_ht_sortie_article:res.rows.item(i).prix_ht_sortie_article,fournisseur_article:res.rows.item(i).fournisseur_article,prix_ttc_sortie_article:res.rows.item(i).prix_ttc_sortie_article,client_article:res.rows.item(i).client_article,categorie_article:res.rows.item(i).categorie_article,description_article:res.rows.item(i).description_article,type_article:res.rows.item(i).type_article,famille_article:res.rows.item(i).famille_article,id_magasin:res.rows.item(i).id_magasin,status:res.rows.item(i).status,endroit_article:res.rows.item(i).endroit_article,etat_article:res.rows.item(i).etat_article,position:res.rows.item(i).position});
               }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getlastArticle",'middle');
           console.log(e);
           return null;
       });
    }
  }

  // Fetch all existing comments
  getArticles():any  {
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
      return  this.db.executeSql("select * from articles",{})
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_article:res.rows.item(i).id_article,reference_article:res.rows.item(i).reference_article,ville_article:res.rows.item(i).ville_article,prix_ht_acquisition_article:res.rows.item(i).prix_ht_acquisition_article,marque_article:res.rows.item(i).marque_article,prix_ttc_acquisition_article:res.rows.item(i).prix_ttc_acquisition_article,libelle_article:res.rows.item(i).libelle_article,Date_entree_article:res.rows.item(i).Date_entree_article,date_de_sortie_article:res.rows.item(i).date_de_sortie_article,fabriquant_article:res.rows.item(i).fabriquant_article,prix_ht_sortie_article:res.rows.item(i).prix_ht_sortie_article,fournisseur_article:res.rows.item(i).fournisseur_article,prix_ttc_sortie_article:res.rows.item(i).prix_ttc_sortie_article,client_article:res.rows.item(i).client_article,categorie_article:res.rows.item(i).categorie_article,description_article:res.rows.item(i).description_article,type_article:res.rows.item(i).type_article,famille_article:res.rows.item(i).famille_article,id_magasin:res.rows.item(i).id_magasin,status:res.rows.item(i).status,endroit_article:res.rows.item(i).endroit_article,etat_article:res.rows.item(i).etat_article,position:res.rows.item(i).position});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getArticles",'middle');
           console.log(e);
           return null;
       });
    }
  }

  getArticleByRef(ref:string):any{
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();


      return new Promise((resolve) => {
        this.http.get(this.commentsUrl+"/ref/"+ref)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });


    }else{
      this.list=[];
      return  this.db.executeSql("select * from articles where reference_article=?",[ref])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_article:res.rows.item(i).id_article,reference_article:res.rows.item(i).reference_article,ville_article:res.rows.item(i).ville_article,prix_ht_acquisition_article:res.rows.item(i).prix_ht_acquisition_article,marque_article:res.rows.item(i).marque_article,prix_ttc_acquisition_article:res.rows.item(i).prix_ttc_acquisition_article,libelle_article:res.rows.item(i).libelle_article,Date_entree_article:res.rows.item(i).Date_entree_article,date_de_sortie_article:res.rows.item(i).date_de_sortie_article,fabriquant_article:res.rows.item(i).fabriquant_article,prix_ht_sortie_article:res.rows.item(i).prix_ht_sortie_article,fournisseur_article:res.rows.item(i).fournisseur_article,prix_ttc_sortie_article:res.rows.item(i).prix_ttc_sortie_article,client_article:res.rows.item(i).client_article,categorie_article:res.rows.item(i).categorie_article,description_article:res.rows.item(i).description_article,type_article:res.rows.item(i).type_article,famille_article:res.rows.item(i).famille_article,id_magasin:res.rows.item(i).id_magasin,status:res.rows.item(i).status,endroit_article:res.rows.item(i).endroit_article,etat_article:res.rows.item(i).etat_article,position:res.rows.item(i).position});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getArticleByRef",'middle');
           console.log(e);
           return null;
       });
    }
  }





  // Fetch all existing comments
  getArticlesnotininventory(idInventory:string) :any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();

      return new Promise((resolve) => {
        this.http.get(this.commentsUrl+"/notininventory/"+idInventory)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });



    }else{
      this.list=[];
      return  this.db.executeSql("select * from articles where id_article not in (select id_article from  article_inventory where id_inventory=?)",[idInventory])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_article:res.rows.item(i).id_article,reference_article:res.rows.item(i).reference_article,ville_article:res.rows.item(i).ville_article,prix_ht_acquisition_article:res.rows.item(i).prix_ht_acquisition_article,marque_article:res.rows.item(i).marque_article,prix_ttc_acquisition_article:res.rows.item(i).prix_ttc_acquisition_article,libelle_article:res.rows.item(i).libelle_article,Date_entree_article:res.rows.item(i).Date_entree_article,date_de_sortie_article:res.rows.item(i).date_de_sortie_article,fabriquant_article:res.rows.item(i).fabriquant_article,prix_ht_sortie_article:res.rows.item(i).prix_ht_sortie_article,fournisseur_article:res.rows.item(i).fournisseur_article,prix_ttc_sortie_article:res.rows.item(i).prix_ttc_sortie_article,client_article:res.rows.item(i).client_article,categorie_article:res.rows.item(i).categorie_article,description_article:res.rows.item(i).description_article,type_article:res.rows.item(i).type_article,famille_article:res.rows.item(i).famille_article,id_magasin:res.rows.item(i).id_magasin,status:res.rows.item(i).status,endroit_article:res.rows.item(i).endroit_article,etat_article:res.rows.item(i).etat_article,position:res.rows.item(i).position});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getArticlesnotininventory",'middle');
           console.log(e);
           return null;
       });
    }
  }


  // Fetch all existing comments
  getArticle(id:string) :any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();


      return new Promise((resolve) => {
        this.http.get(this.commentsUrl+"/"+id)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
          this.shared.handleError(err);
         });
       });


    }else{
      this.list=[];
      return  this.db.executeSql("select * from articles where id_article =?",[id])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_article:res.rows.item(i).id_article,reference_article:res.rows.item(i).reference_article,ville_article:res.rows.item(i).ville_article,prix_ht_acquisition_article:res.rows.item(i).prix_ht_acquisition_article,marque_article:res.rows.item(i).marque_article,prix_ttc_acquisition_article:res.rows.item(i).prix_ttc_acquisition_article,libelle_article:res.rows.item(i).libelle_article,Date_entree_article:res.rows.item(i).Date_entree_article,date_de_sortie_article:res.rows.item(i).date_de_sortie_article,fabriquant_article:res.rows.item(i).fabriquant_article,prix_ht_sortie_article:res.rows.item(i).prix_ht_sortie_article,fournisseur_article:res.rows.item(i).fournisseur_article,prix_ttc_sortie_article:res.rows.item(i).prix_ttc_sortie_article,client_article:res.rows.item(i).client_article,categorie_article:res.rows.item(i).categorie_article,description_article:res.rows.item(i).description_article,type_article:res.rows.item(i).type_article,famille_article:res.rows.item(i).famille_article,id_magasin:res.rows.item(i).id_magasin,status:res.rows.item(i).status,endroit_article:res.rows.item(i).endroit_article,etat_article:res.rows.item(i).etat_article,position:res.rows.item(i).position});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getArticle",'middle');
           console.log(e);
           return null;
       });
    }
  }
  // Add a new comment
  addArticle (article: Article):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    article.id_article="article"+this.shared.getUniqueID();
    let headers       = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

      return new Promise((resolve) => {
        this.http.post(this.commentsUrl, article, options)
              .subscribe(res => {
                 resolve(res.json());
               }, (err) => {
                this.shared.handleError(err);
               });
             });


    }else{
      this.list=[];
      return  this.db.executeSql("insert into  articles values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1);",[article.id_article,article.reference_article,article.ville_article,article.prix_ht_acquisition_article,article.marque_article,article.prix_ttc_acquisition_article,article.libelle_article,article.Date_entree_article,article.date_de_sortie_article,article.fabriquant_article,article.prix_ht_sortie_article,article.fournisseur_article,article.prix_ttc_sortie_article,article.client_article,article.categorie_article,article.description_article,article.type_article,article.famille_article,article.id_magasin])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
          if(res.rows!=undefined && res.rows!=null){
            if(res.rowsAffected>0) {
              return article;
           }
           else
              return null;
         }


         }
       })
       .catch(e => {
           this.Toast("Error SELECT * FROM users",'middle');
           console.log(e);
           return null;
       });
    }
  }

  // Update a comment
  updateArticle (article: Article):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

      return new Promise((resolve) => {
        this.http.put(`${this.commentsUrl}/${article['id_article']}`, article, options)
              .subscribe(res => {
                 resolve(res.json());
               }, (err) => {
                this.shared.handleError(err);
               });
             });

    }else{
      this.list=[];
      return  this.db.executeSql("update articles set ville_article=?,prix_ht_acquisition_article=?,marque_article=?,prix_ttc_acquisition_article=?,libelle_article=?,Date_entree_article=?,date_de_sortie_article=?,fabriquant_article=?,prix_ht_sortie_article=?,fournisseur_article=?,prix_ttc_sortie_article=?,client_article=?,categorie_article=?,description_article=?,type_article=?,famille_article=?,id_magasin=? where id_article=?",[article.ville_article,article.prix_ht_acquisition_article,article.marque_article,article.prix_ttc_acquisition_article,article.libelle_article,article.Date_entree_article,article.date_de_sortie_article,article.fabriquant_article,article.prix_ht_sortie_article,article.fournisseur_article,article.prix_ttc_sortie_article,article.client_article,article.categorie_article,article.description_article,article.type_article,article.famille_article,article.id_magasin,article.id_article])
       .then(res => {
        if(res.rows!=undefined && res.rows!=null){
          if(res.rowsAffected>0) {
            return article;
         }
         else
            return null;
       }
       })
       .catch(e => {
           this.Toast("Error updateArticle",'middle');
           console.log(e);
           return null;
       });
    }
  }

  // Delete a comment
  removeArticle (id:string) :any{
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    return this.http.delete(`${this.commentsUrl}/${id}`) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
    }else{
      this.list=[];
      return  this.db.executeSql("delete from articles where id_article=?",[id])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
          if(res.rows!=undefined && res.rows!=null){
            if(res.rowsAffected>0) {
              return new Article();
           }
           else
              return null;
         }

         }
       })
       .catch(e => {
           this.Toast("Error removeArticle",'middle');
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
