import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-listshops',
  templateUrl: 'listshops.html',
})
export class ListshopsPage {

  constructor(
    public navCtrl:NavController,
    public navparam:NavParams
  ) {

    let token = this.navparam.get('token');
    let lat = this.navparam.get('lat');
    console.log(token);

  }

  show(){
    console.log('Running');
  }

  back(){
    this.navCtrl.pop();
  }

}
