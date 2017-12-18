import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class AlertsProvider {

  constructor(private toast: ToastController) {
    
  }

  fireToast(msg){
    let toe = this.toast.create({
      message: msg,
      duration:3000
    });
    toe.present();
  }

}
