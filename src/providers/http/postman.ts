import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertsProvider } from '../alerts/alerts';



@Injectable()
export class PostmanProvider {
  host = 'http://192.168.0.6';
  auth_url = this.host+'/api/auth';
  find_restro_url = this.host+'/api/findshops';
  getmenu_url = this.host+'/api/getmenu';

  data = null;
  loader = null;
  constructor(
    public http: HttpClient, 
    public alert: AlertsProvider) { }

  AuthLogin(username, password){
    let htph = new HttpHeaders().set('content-type','application/json');
    let custom = {"username":username, "password":password.toString()};
    return this.http.post(this.auth_url, custom, {headers:htph});
  }

  ListStore(token, lat, lng, scat){
    let htph = new HttpHeaders().set('content-type','application/json');
    let custom = {"lat":lat, "lng":lng, "token":token, "scat":scat};
    return this.http.post(this.find_restro_url, custom, {headers:htph});
  }

  Getmenu(token, restid){
    let htph = new HttpHeaders().set('content-type','application/json');
    let custom = {"token":token, "restid":restid};
    return this.http.post(this.getmenu_url, custom, {headers:htph}); 
  }

}
