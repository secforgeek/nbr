import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{
  username:string;
  password:string;
  data = null;

  constructor(public navCtrl: NavController, private authprovider: AuthProvider) {

  }

  login(){
    this.authprovider.AuthLogin("username@gmail.com","hhjdhjshds").subscribe(data => {
      console.log(data);
    }, error => {
      console.log("Error Fo:",error);
    }, () => {
      console.log("Completed");
    });
  }


}