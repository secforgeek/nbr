import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  url = 'http://localhost/api/auth';
  data = null;

  constructor(public http: HttpClient) { }

  AuthLogin(username, password): Observable<any>{
    let htph:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
    let htparam = new HttpParams();
    htparam.set("username", username).set("password",password);
    return this.http.post(this.url,htparam, {headers:htph});
    
  }

}
