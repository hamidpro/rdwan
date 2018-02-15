import { ToastController } from 'ionic-angular';
import { SharedProvider } from './shared/shared';
import { Injectable } from '@angular/core';
import { Inventory } from '../Entity/Inventory/Inventory';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//-----------------------------------------------------------------------
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class InventoryService {
  list:Inventory[]=[];
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
  setUrl(){this.commentsUrl='http://'+this.shared.getNetwork().serveur+':'+this.shared.getNetwork().port+'/api/inventory';}
  

  // Update a comment
  cloturer (idinventaire:string,status:number):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
  
   
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return new Promise((resolve) => {
      this.http.put(this.commentsUrl+"/status/"+idinventaire+"/"+status, options)
      .subscribe(res => {
         resolve(res.json());
       }, (err) => {
        this.shared.handleError(err);
       });
     });


    
    }else{
      this.list=[];
      return  this.db.executeSql("update inventory set status=? where id_inventory=?",[status,idinventaire])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           
            if(res.rowsAffected>0) {
              return new Inventory();
           }
           else
              return null;
           }
       })
       .catch(e => {
           this.Toast("Error cloturer"+JSON.stringify(e),'middle');
           console.log(e);
           return null;
       });
    }
  }

  // Fetch all existing comments
  getAllInventorys():any  {
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
      return  this.db.executeSql("Select * from inventory",{})
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                 this.list.push({id_inventory:res.rows.item(i).id_inventory,start_date:res.rows.item(i).start_date,end_date:res.rows.item(i).end_date,location:res.rows.item(i).location,status:res.rows.item(i).status,listArticle:[]});({id_user:res.rows.item(i).id_user,nom_user:res.rows.item(i).nom_user,prenom_user:res.rows.item(i).prenom_user,tel1_user:res.rows.item(i).tel1_user,tel2_user:res.rows.item(i).tel2_user,email_user:res.rows.item(i).email_user,ville_user:res.rows.item(i).ville_user,adresse_user:res.rows.item(i).adresse_user,code_postal_user:res.rows.item(i).code_postal_user,id_admin:res.rows.item(i).id_admin,password:res.rows.item(i).password,username:res.rows.item(i).username,role:res.rows.item(i).role});
               }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getAllInventorys"+JSON.stringify(e),'middle');
           console.log(e);
           return null;
       });
    }
  }


  

  getInventoryByIdAdmin(id:string):any  {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    // ...using get request
    return this.http.get(this.commentsUrl+"/admin/"+id)
    // ...an                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        d calling .json() on the response to return data
      .map(( res:Response) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error || 'Server error'));
    }else{
      this.list=[];
      return  this.db.executeSql("select * from inventory where id_inventory=?",[id])
       .then(res => {
         if(res.rows!=undefined && res.rows!=null){
           if(res.rows.length>0) {
               for(var i=0;i<res.rows.length;i++){
                  this.list.push({id_inventory:res.rows.item(i).id_inventory,start_date:res.rows.item(i).start_date,end_date:res.rows.item(i).end_date,location:res.rows.item(i).location,status:res.rows.item(i).status,listArticle:[]});({id_user:res.rows.item(i).id_user,nom_user:res.rows.item(i).nom_user,prenom_user:res.rows.item(i).prenom_user,tel1_user:res.rows.item(i).tel1_user,tel2_user:res.rows.item(i).tel2_user,email_user:res.rows.item(i).email_user,ville_user:res.rows.item(i).ville_user,adresse_user:res.rows.item(i).adresse_user,code_postal_user:res.rows.item(i).code_postal_user,id_admin:res.rows.item(i).id_admin,password:res.rows.item(i).password,username:res.rows.item(i).username,role:res.rows.item(i).role});
               }
           }
         return this.list;
         }
       })
       .catch(e => {
           this.Toast("Error getInventoryByIdAdmin "+JSON.stringify(e),'middle');
           console.log(e);
           return null;
       });
    }
  }

  // Add a new comment
  addInventory (Inventory: Inventory):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    Inventory.id_inventory="inventory"+this.shared.getUniqueID();
    
    return new Promise((resolve) => {
      this.http.post(this.commentsUrl, Inventory, options)
      .subscribe(res => {
         resolve(res.json());
       }, (err) => {
        this.shared.handleError(err);
       });
     });

    }else{
      this.list=[];
      return  this.db.executeSql("insert into inventory values (null,?,?,?,0)",[Inventory.start_date,Inventory.end_date,Inventory.location])
       .then(res => {
        if(res.rows!=undefined && res.rows!=null){
          if(res.rowsAffected>0) {
            return Inventory;
         }
         else
            return null;
       }
         
       })
       .catch(e => {
        this.Toast("Error addInventory "+JSON.stringify(e),'middle');           console.log(e);
           return null;
       });
    }
  }

  // Update a comment
  updateInventory (Inventory: Inventory):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
  
 
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return new Promise((resolve) => {
      this.http.put(`${this.commentsUrl}/${Inventory['id_inventory']}`, Inventory, options)
      .subscribe(res => {
         resolve(res.json());
       }, (err) => {
        this.shared.handleError(err);
       });
     });

    }else{
      this.list=[];
      return  this.db.executeSql('update inventory set start_date=?,end_date=?,location=? where  id_inventory=?',[Inventory.start_date,Inventory.end_date,Inventory.location,Inventory.id_inventory])
       .then(res => {
        if(res.rows!=undefined && res.rows!=null){
          if(res.rowsAffected>0) {
            return Inventory;
         }
         else
            return null;
       }
         
       })
       .catch(e => {
        this.Toast("Error updateInventory "+JSON.stringify(e),'middle');  return null;
         
       });
    }
  }

  // Delete a comment
  removeInventory (id:string):any {
    if(this.shared.getNetwork().option!="offline"){
    this.setUrl();
    return new Promise((resolve) => {
      this.http.delete(`${this.commentsUrl}/${id}`)
      .subscribe(res => {
         resolve(res.json());
       }, (err) => {
        this.shared.handleError(err);
       });
     });

    }else{
      this.list=[];
      return  this.db.executeSql("delete from inventory where id_inventory=?",[id])
       .then(res => {
        if(res.rows!=undefined && res.rows!=null){
          if(res.rowsAffected>0) {
            return new Inventory();
         }
         else
            return null;
       }
       })
       .catch(e => {
        this.Toast("Error removeInventory "+JSON.stringify(e),'middle');  return null;
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
