import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { ListshopsPage } from '../listshops/listshops';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public app: App) {

  }

  search(){
    this.app.getRootNav().push(ListshopsPage);
  }

  show(){
    console.log('Running');
  }
}
