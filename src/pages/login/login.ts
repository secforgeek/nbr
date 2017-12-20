import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertsProvider } from '../../providers/alerts/alerts';
import sha256 from 'crypto-js/sha256';
import { StorageProvider } from '../../providers/storage/storage';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AlertsProvider]
})
export class LoginPage{
  loginFormdata = null;
  successData = null;


  constructor(public navCtrl: NavController, private authprovider: AuthProvider, private toast: AlertsProvider, private storage: StorageProvider) {
    console.log("login ts");
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
          if(this.storage.setToken(this.successData.response.data.token)){ 
            this.toast.fireToast(this.successData.response.success);
            this.navCtrl.push(TabsPage);
          }else{
            this.toast.fireToast("Technical Problem");
          }
        break;

        default:
          this.toast.fireToast("Invalid Request");
        break;
      }
    }, error => {
      this.toast.fireToast("Please check your network connection");
    }, () => {
      console.log(this.successData);
    });
  }
}