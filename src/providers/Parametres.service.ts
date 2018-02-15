import { ToastController } from 'ionic-angular';
import { SharedProvider } from './shared/shared';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Parametre} from "../Entity/Parametre/Parametre";
//-----------------------------------------------------------------------
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ParametreService {
  list:Parametre[]=[];
  db:SQLiteObject; 

  constructor (private toast: ToastController,private sqlite: SQLite,private shared:SharedProvider,private http: Http) {
    //--------------   SQLLITE ------------------------
    this.sqlite.create({
      name: shared.DBNAME,
      location: 'default'
    }).then((db: SQLiteObject) => {    this.db=db; })
    //--------------------------------------------------

  }
  // private instance variable to hold base url
  private commentsUrl:string;
  setUrl(){this.commentsUrl='http://'+this.shared.getNetwork().serveur+':'+this.shared.getNetwork().port+'/api/parametres';}
  

    // Fetch all existing comments
    getAllParametres() :any {
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
        return  this.db.executeSql("select * from parametres",{})
         .then(res => {
           if(res.rows!=undefined && res.rows!=null){
             if(res.rows.length>0) {
                 for(var i=0;i<res.rows.length;i++){
                    this.list.push({id_parametre:res.rows.item(i).id_parametre,key_name:res.rows.item(i).key_name,value:res.rows.item(i).value});
                 }
             }
           return this.list;
           }
         })
         .catch(e => {
          this.Toast("Error getInventoryByIdAdmin "+JSON.stringify(e),'middle');  return null;
         });
      }
    }


  // Fetch all existing comments
  getParametre(id:string) :any {
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
      return  this.db.executeSql("select * from parametres where id_parametre =?",[id])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                this.list.push({id_parametre:res.rows.item(i).id_parametre,key_name:res.rows.item(i).key_name,value:res.rows.item(i).value});
              }
           }
         return this.list;
         }
       })
       .catch(e => {
            this.Toast("Error getParametre ="+JSON.stringify(e),'middle');  return null;
       });
    }
  }
  
  // Add a new comment
  addParametre (body: Parametre):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    body.id_parametre="para"+this.shared.getUniqueID();
      return new Promise((resolve) => {
        this.http.post(this.commentsUrl, body, options)
              .subscribe(res => {
                 resolve(res.json());
               }, (err) => {
                this.shared.handleError(err);
               });
             });


    }else{
      this.list=[];
      return  this.db.executeSql("insert into parametres(key,value) values (?,?)",[body.key_name,body.value])
       .then(res => {
        if(res.rows!=undefined && res.rows!=null){
          if(res.rowsAffected>0) {
            return body;
         }
         else
            return null;
       }
       })
       .catch(e => {
        this.Toast("Error addParametre "+JSON.stringify(e),'middle');  return null;
       });
    }
  }

  // Update a comment
  updateParametre (body: Parametre):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

      return new Promise((resolve) => {
        this.http.put(`${this.commentsUrl}/${body['id_parametre']}`, body, options)
              .subscribe(res => {
                 resolve(res.json());
               }, (err) => {
                this.shared.handleError(err);
               });
             });

    }else{
      this.list=[];
      return  this.db.executeSql("update parametres set value=? where id_parametre=?",[body.value,body.id_parametre])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
            if(res.rowsAffected>0) {
              return body;
           }
           else
              return null;
         }
       })
       .catch(e => {
        this.Toast("Error updateParametre= "+JSON.stringify(e),'middle');  return null;
       });
    }
  }


  removeParametre (id:string):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    return this.http.delete(`${this.commentsUrl}/${id}`) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
    }else{
      this.list=[];
      return  this.db.executeSql("delete from parametres where id_parametre=?",[id])
       .then(res => {
        if(res.rows!=undefined && res.rows!=null){
          if(res.rowsAffected>0) {
            return new Parametre();
         }
         else
            return null;
       
         }
       })
       .catch(e => {
        this.Toast("Error removeParametre ="+JSON.stringify(e),'middle');  return null;
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
