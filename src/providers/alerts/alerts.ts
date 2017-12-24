import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { Platform, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertsProvider {

  constructor(
    public toast: Toast, 
    public platform: Platform, 
    private browsertoast: ToastController, 
    public alertCtrl: AlertController) {
    
  }

  fireToast(msg){
    if (this.platform.is('cordova')) {
      this.toast.showShortBottom(msg).subscribe(
        toasta => {
          console.log(toasta);
        }
      );
    }else{
      let toe = this.browsertoast.create({
        message: msg,
        duration:3000
      });
      toe.present();    
    }
  }

  fireAlert(title, msg){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();    
  }

}
