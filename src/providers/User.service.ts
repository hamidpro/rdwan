import { ToastController } from 'ionic-angular';
import { User } from '../Entity/User/User';
import { SharedProvider } from './shared/shared';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';

//-----------------------------------------------------------------------
@Injectable()
export class UserService {
  list:User[]=[];
  db:SQLiteObject;

  constructor (private toast: ToastController,private sqlite: SQLite,public http2: HttpClient,private shared:SharedProvider,private http: Http) {

    //--------------   SQLLITE ------------------------
    this.sqlite.create({
      name: shared.DBNAME,
      location: 'default'
    }).then((db: SQLiteObject) => {  this.db=db; })
    //--------------------------------------------------

  }
  // private instance variable to hold base url

  private commentsUrl:string;
  setUrl(){this.commentsUrl='http://'+this.shared.getNetwork().serveur+':'+this.shared.getNetwork().port+'/api/users';}
  
  


     // Add a new comment
     connect (body: User):any {
      if(this.shared.getNetwork().option!="offline"){
       this.setUrl();
       let headers      = new Headers({ 'Content-Type': 'application/json' }); 
       let options       = new RequestOptions({ headers: headers }); 
    
      
       return new Promise((resolve) => {
        this.http.post(this.commentsUrl+'/auth', JSON.stringify(body),options)
        .subscribe(res => {
           resolve(res.json());
         }, (err) => {
           this.shared.handleError(err);
          
         });
       });
       
      
    }else{
      this.list=[];
      return this.db.executeSql("Select * from users where username=? and password=? ",[body.username,body.password])
       .then(res => {
        this.Toast(JSON.stringify(res),'middle');
       if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_user:res.rows.item(i).id_user,nom_user:res.rows.item(i).nom_user,prenom_user:res.rows.item(i).prenom_user,tel1_user:res.rows.item(i).tel1_user,tel2_user:res.rows.item(i).tel2_user,email_user:res.rows.item(i).email_user,ville_user:res.rows.item(i).ville_user,adresse_user:res.rows.item(i).adresse_user,code_postal_user:res.rows.item(i).code_postal_user,id_admin:res.rows.item(i).id_admin,password:res.rows.item(i).password,username:res.rows.item(i).username,role:res.rows.item(i).role});
               }
           }
          return (this.list);
        

         }
       
       })
       .catch(e => {
           this.Toast("Error SELECT * FROM users",'middle');
           this.Toast(JSON.stringify(e),'bottom');
         
           return null;
       });
    }
    
  }
      // Add a new comment
      changePassword (User: User):any {
        if(this.shared.getNetwork().option!="offline"){
        this.setUrl();
        console.log(this.shared);
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
    
        return this.http.post(this.commentsUrl+"changepassword/", User, options) // ...using post request
          .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
          .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
        }else{
          this.list=[];
          this.db.executeSql("update users set nom_user=?,prenom_user=?,tel1_user=?,tel2_user=?,email_user=?,adresse_user=?,code_postal_user=?,username=?,password=? where id_user=?",[User.nom_user,User.prenom_user,User.tel1_user,User.tel2_user,User.email_user,User.adresse_user,User.code_postal_user,User.username,User.password,User.id_user])
           .then(res => {
             if(res.rows!=undefined && res.rows!=null){
              /* if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                this.list.push({id_article:res.rows.item(i).id_article,reference_article:res.rows.item(i).reference_article,ville_article:res.rows.item(i).ville_article,prix_ht_acquisition_article:res.rows.item(i).prix_ht_acquisition_article,marque_article:res.rows.item(i).marque_article,prix_ttc_acquisition_article:res.rows.item(i).prix_ttc_acquisition_article,libelle_article:res.rows.item(i).libelle_article,Date_entree_article:res.rows.item(i).Date_entree_article,date_de_sortie_article:res.rows.item(i).date_de_sortie_article,fabriquant_article:res.rows.item(i).fabriquant_article,prix_ht_sortie_article:res.rows.item(i).prix_ht_sortie_article,fournisseur_article:res.rows.item(i).fournisseur_article,prix_ttc_sortie_article:res.rows.item(i).prix_ttc_sortie_article,client_article:res.rows.item(i).client_article,categorie_article:res.rows.item(i).categorie_article,description_article:res.rows.item(i).description_article,type_article:res.rows.item(i).type_article,famille_article:res.rows.item(i).famille_article,id_magasin:res.rows.item(i).id_magasin,status:res.rows.item(i).status,endroit_article:res.rows.item(i).endroit_article,etat_article:res.rows.item(i).etat_article});
              }
              
           }
           */
          return res;
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
    retrievePassword (body: User,token:String):any {
      if(this.shared.getNetwork().option!="offline"){
      this.setUrl();
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option
  
      return this.http.post(this.commentsUrl+"password/"+token, body, options) // ...using post request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
      }else{
        this.list=[];
        this.db.executeSql("Select * from users where username=? and password=? ",[body.username,body.password])
         .then(res => {
           if(res.rows!=undefined && res.rows!=null){
             if(res.rows.length>0) {
                 for(var i=0;i<res.rows.length;i++){
                   this.list.push({id_user:res.rows.item(i).id_user,nom_user:res.rows.item(i).nom_user,prenom_user:res.rows.item(i).prenom_user,tel1_user:res.rows.item(i).tel1_user,tel2_user:res.rows.item(i).tel2_user,email_user:res.rows.item(i).email_user,ville_user:res.rows.item(i).ville_user,adresse_user:res.rows.item(i).adresse_user,code_postal_user:res.rows.item(i).code_postal_user,id_admin:res.rows.item(i).id_admin,password:res.rows.item(i).password,username:res.rows.item(i).username,role:res.rows.item(i).role});
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


  // Fetch all existing comments
  getAllUsers() :any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    // ...using get request
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
      return this.db.executeSql("Select * from users",{})
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_user:res.rows.item(i).id_user,nom_user:res.rows.item(i).nom_user,prenom_user:res.rows.item(i).prenom_user,tel1_user:res.rows.item(i).tel1_user,tel2_user:res.rows.item(i).tel2_user,email_user:res.rows.item(i).email_user,ville_user:res.rows.item(i).ville_user,adresse_user:res.rows.item(i).adresse_user,code_postal_user:res.rows.item(i).code_postal_user,id_admin:res.rows.item(i).id_admin,password:res.rows.item(i).password,username:res.rows.item(i).username,role:res.rows.item(i).role});
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

  // Add a new comment
  addUser (User: User) :any{
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
 
     
      let headers      = new Headers({ 'Content-Type': 'application/json' }); 
      let options       = new RequestOptions({ headers: headers }); 
      User.id_user="user"+this.shared.getUniqueID();
     
      return new Promise((resolve) => {
       this.http.post(this.commentsUrl, JSON.stringify(User),options)
       .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          this.shared.handleError(err);
        });
      });

    }else{
      this.list=[];
      
     return  this.db.executeSql("insert into users values(?,?,?,?,?,?,?,?,?,?,?,?,?);",[User.id_user,User.nom_user,User.prenom_user,User.tel1_user,User.tel2_user,User.email_user,User.ville_user,User.adresse_user,User.code_postal_user,User.username,User.password,User.id_admin,User.role])
       .then(res => {
        this.Toast("res"+JSON.stringify(res),'middle');
        this.Toast("res.rowsAffected="+JSON.stringify(res.rowsAffected),'middle');

        
         if(res.rows!=undefined && res.rows!=null){
            if(res.rowsAffected>0) {
              return User;
           }
           else
              return null;
         }
       })
       .catch(e => {
           this.Toast("Error insert user"+JSON.stringify(e),'middle');
           console.log(e);
           return null;
       });
    }
  }

  // Update a comment
  updateUser (User: User,id:string):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
   
    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    let options       = new RequestOptions({ headers: headers }); 
 
   
    return new Promise((resolve) => {
     this.http.post(this.commentsUrl+"/"+id, JSON.stringify(User),options)
     .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        this.shared.handleError(err);
      });
    });

    }else{
      this.list=[];
      this.db.executeSql("update users set nom_user=?,prenom_user=?,tel1_user=?,tel2_user=?,email_user=?,adresse_user=?,code_postal_user=?,username=?,password=? where id_user=?",[User.nom_user,User.prenom_user,User.tel1_user,User.tel2_user,User.email_user,User.adresse_user,User.code_postal_user,User.username,User.password,id])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
               if(res.rowsAffected>0) {
               return User;
           }else return null;
         }
       })
       .catch(e => {
           this.Toast("Error update users",'middle');
           console.log(e);
           return null;
       });
    }
  }

  // Delete a comment
  removeUser (id:string) :any{
    if(this.shared.getNetwork().option!="offline"){
      this.setUrl();
    
     
      return new Promise((resolve) => {
       this.http.delete(this.commentsUrl+"/"+id)
       .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          this.shared.handleError(err);
        });
      });
  
      }else{
        this.list=[];
        this.db.executeSql("delete from users where id_user=?",[id])
         .then(res => {
           if(res.rows!=undefined && res.rows!=null){
                 if(res.rowsAffected>0) {
                 return new User();
             }else return null;
           }
         })
         .catch(e => {
             this.Toast("Error delete users",'middle');
             console.log(e);
             return null;
         });
      }
  }


  // Delete a comment
  getUserById (id:string) :any{
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
      this.db.executeSql("select * from users where id_user =?",[id])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_user:res.rows.item(i).id_user,nom_user:res.rows.item(i).nom_user,prenom_user:res.rows.item(i).prenom_user,tel1_user:res.rows.item(i).tel1_user,tel2_user:res.rows.item(i).tel2_user,email_user:res.rows.item(i).email_user,ville_user:res.rows.item(i).ville_user,adresse_user:res.rows.item(i).adresse_user,code_postal_user:res.rows.item(i).code_postal_user,id_admin:res.rows.item(i).id_admin,password:res.rows.item(i).password,username:res.rows.item(i).username,role:res.rows.item(i).role});
               }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getUserById",'middle');
           console.log(e);
           return [];
       });
    }
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
