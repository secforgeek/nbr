import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { ListshopsPage } from '../listshops/listshops';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  toggle = true;
  address = null;

  constructor(public navCtrl: NavController, public app: App, public auth: AuthProvider) {

  }

  search(){
    this.app.getRootNav().push(ListshopsPage);
  }

  move(){
    //this.navCtrl.push(ListshopsPage);
    this.auth.locationForward(this.address);
  }
}
