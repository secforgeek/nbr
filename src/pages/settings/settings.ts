import { Component } from '@angular/core';
import { StorageProvider } from '../../providers/storage/storage';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public storage: StorageProvider, private nav: App){}
  
  settings_options_start = 'Profile';
  settings_options: any = {
    'Profile': [
      {
        type: 'options',
        key: 'Name',
        value: 'Gajendra'
      },
      {
        type: 'options',
        key: 'Email',
        value: 'username@gmail.com'
      },
      {
        type: 'options',
        key: 'Phone',
        value: '123456789'
      },
      {
        type: 'options',
        key: 'Address 1',
        value: '24 Eastwood Grange'       
      },
      {
        type: 'options',
        key: 'Address 2',
        value: 'Northumberland'       
      },
      {
        type: 'options',
        key: 'City',
        value: 'Hexham'       
      },
      {
        type: 'options',
        key: 'Postcode',
        value: 'NE46 1UE'       
      },
      {
        type: 'options',
        key: 'Country',
        value: 'India'       
      }
    ],
    'Options': [
      {
        type: 'options',
        key: 'Option 1',
        value: 'OPEN'
      },
      {
        type: 'options',
        key: 'NEw',
        value: 'GET'
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
