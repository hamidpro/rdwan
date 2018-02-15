import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class LocalisationProvider {

  constructor(private geolocation: Geolocation,public http: Http) {
    console.log('Hello LocalisationProvider Provider');
  }


  getPosition():any{
    return this.geolocation.getCurrentPosition().then((resp:any) => {
      // resp.coords.latitude
      // resp.coords.longitude
      return resp.coords;
     }).catch((error:any) => {
       console.log('Error getting location', error);
       return error;
     });
    
  }

}
