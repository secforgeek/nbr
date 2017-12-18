import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertsProvider } from '../../providers/alerts/alerts';
import sha256 from 'crypto-js/sha256';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AlertsProvider]
})
export class LoginPage{
  loginFormdata = null;
  successData = null;

  constructor(public navCtrl: NavController, private authprovider: AuthProvider, private toast: AlertsProvider) {

  }

  login(value){
    this.loginFormdata = value;
    let pass = sha256(this.loginFormdata.password);
    this.authprovider.AuthLogin(this.loginFormdata.username, pass).subscribe(data => {
      this.successData = data;
      switch(Object.keys(this.successData.response)[0]){
        case "error":
          this.toast.fireToast(this.successData.response.error);
        break;

        case "success":
          this.toast.fireToast(this.successData.response.success);
        break;

        default:
          console.log("Default Error");
        break;
      }
    }, error => {
      console.log("Error Fo:",error);
    }, () => {
      console.log(this.successData);
    });
  }
}