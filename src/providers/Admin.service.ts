import { ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SharedProvider } from './shared/shared';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Admin} from "../Entity/Admin/Admin";
//-----------------------------------------------------------------------
@Injectable()
export class AdminService {
   db:SQLiteObject;
 list:Admin[]=[];
  constructor (private toast: ToastController,private sqlite: SQLite,private shared:SharedProvider,private http: Http) {
    //--------------   SQLLITE ------------------------
    this.sqlite.create({
      name: 'data1.db',
      location: 'default'
    }).then((db: SQLiteObject) => {  this.db=db; })
    //--------------------------------------------------
  }
  // private instance variable to hold base url

  private commentsUrl:string="";
  setUrl(){this.commentsUrl='http://'+this.shared.getNetwork().serveur+':'+this.shared.getNetwork().port+'/api/admins';}
  

  // Fetch all existing comments
  getAdmin(id:string):any  {
    if(this.shared.getNetwork().option!="offline"){
      this.setUrl();
      return this.http.get(this.commentsUrl+"/"+id)
      // ...an                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        d calling .json() on the response to return data
        .map(( res:Response) => res.json())
        //...errors if any
        .catch((error:any) => Observable.throw(error || 'Server error'));
    }else{
      this.list=[];
      this.db.executeSql('SELECT * FROM users', {})
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 //this.list.push({id_user:res.rows.item(i).id_user,nom_user:res.rows.item(i).nom_user,prenom_user:res.rows.item(i).prenom_user,tel1_user:res.rows.item(i).tel1_user,tel2_user:res.rows.item(i).tel2_user,email_user:res.rows.item(i).email_user,ville_user:res.rows.item(i).ville_user,adresse_user:res.rows.item(i).adresse_user,code_postal_user:res.rows.item(i).code_postal_user,id_admin:res.rows.item(i).id_admin,password:res.rows.item(i).password,username:res.rows.item(i).username,role:res.rows.item(i).role});
               }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error SELECT * FROM users",'middle');
           console.log(e);
           return [];
       });

    }
    
  }
  // Add a new comment
  addAdmin (body: Object): Observable<Admin[]> {
    this.setUrl();
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.commentsUrl, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
  }

  // Update a comment
  updateAdmin (body: any): Observable<Admin> {
    this.setUrl();
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${this.commentsUrl}/${body['id_admin']}`, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
  }

  // Delete a comment
  removeAdmin (id:string): Observable<Admin[]> {
    this.setUrl();
    return this.http.delete(`${this.commentsUrl}/${id}`) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
  }


  connectAdmin (body: Admin): Observable<Admin> {
    this.setUrl();
    // let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.commentsUrl+"/auth", body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
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
