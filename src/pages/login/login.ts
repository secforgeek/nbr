import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username:string;
  password:string;

  constructor(public navCtrl: NavController, private authprovider: AuthProvider) {
    this.username = "username@gmail.com";
    this.password = "hsjahsjahs";
    authprovider.AuthLogin(this.username, this.password).subscribe((data) => {
        console.log("Login Auth : ", data);
    },
    response => {
      console.log("Login Error Auth : ", response);
    }, 
    () => {
      console.log("Login Auth Completed");
    });
  }

}