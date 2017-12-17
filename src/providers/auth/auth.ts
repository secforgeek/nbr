import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  private url = 'http://localhost/api/auth';

  constructor(public http: HttpClient) { }

  AuthLogin(username, password):Observable<any>{
    
    const headers = new HttpHeaders().set("Content-Type","application/json");
    return this.http.post(this.url,{"username":username, "password":password}, {headers}).map((res:Response) => res.json());
  }

}
