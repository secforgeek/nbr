import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertsProvider } from '../alerts/alerts';



@Injectable()
export class PostmanProvider {

  url = 'http://192.168.0.6/api/auth';
  data = null;
  loader = null;
  constructor(
    public http: HttpClient, 
    public alert: AlertsProvider) { }

  AuthLogin(username, password){
    let htph = new HttpHeaders().set('content-type','application/json');
    let custom = {"username":username, "password":password.toString()};
    return this.http.post(this.url, custom, {headers:htph});
  }
}
