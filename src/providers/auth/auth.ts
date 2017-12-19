import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {

  url = 'http://localhost/api/auth';
  data = null;
  loader = null;
  constructor(public http: HttpClient) { }

  AuthLogin(username, password){
    let htph = new HttpHeaders().set('content-type','application/json');
    let custom = {"username":username, "password":password.toString()};
    return this.http.post(this.url, custom, {headers:htph});
  }

}
