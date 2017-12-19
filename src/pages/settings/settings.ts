import { Component } from '@angular/core';
import { StorageProvider } from '../../providers/storage/storage';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public storage: StorageProvider, private nav: App){

  }

  settings_options_start = 'Options';

  settings_options: any = {
    'Profile': [
      {
        type: 'options',
        name: 'Name',
        price: 'Gajendra'
      },
      {
        type: 'options',
        name: 'Email',
        price: 'username@gmail.com'
      }
    ],
    'Options': [
      {
        type: 'options',
        name: 'Option 1',
        price: 'OPEN'
      },
      {
        type: 'button',
        name: 'Logout',
        price: 'GET'
      }
    ]
  };

  getItems(type:any){
    return this.settings_options[type];
  }

  logoff(){
    this.storage.resetAll();
    this.nav.getRootNav().push(LoginPage);
  }
}
