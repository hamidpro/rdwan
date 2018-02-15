import { User } from '../Entity/User/User';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers,Http, RequestOptions, Response } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { SharedProvider } from './shared/shared';

// Import RxJs required methods
//-----------------------------------------------------------------------
@Injectable()
export class ConnectionService {
  // Resolve HTTP using the constructor
  constructor (private  toast: ToastController,private shared:SharedProvider,private http: Http) {
    
  }
  // private instance variable to hold base url
  private commentsUrl:string;
  setUrl(){this.commentsUrl='http://'+this.shared.getNetwork().serveur+':'+this.shared.getNetwork().port+'/api/users';}
  

    // Fetch all existing comments
    valider() : any {
      this.setUrl();


      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option
  
      return this.http.post(this.commentsUrl+"/auth", new User, options) // ...using post request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((err:any) =>{ 
          this.Toast(`Impossible D'etablir La connexion Veuillez Vérifier IP et le Port Du serveur`,'middle');
          console.log(err);
            return Observable.of(undefined);
         });

    }

    Toast(message1:string,position1:string) {
      let toast = this.toast.create({
        message: message1,
        position: position1,
        showCloseButton:true,
        closeButtonText:"OK"
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }
  

}
