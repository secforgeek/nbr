import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PostmanProvider } from '../../providers/http/postman';

@Component({
  selector: 'page-showmenu',
  templateUrl: 'showmenu.html',
})
export class ShowmenuPage {
  shopid = null;
  token = null;
  information = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loading:LoadingController,
    public postman:PostmanProvider
  ) {
    this.shopid = navParams.get('shopid');
    this.token = navParams.get('token');
    //this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MTQzMjA2NzMsImV4cCI6MzAyOTg1MDk0NiwiaXNzIjoiZ3Nkcm9pZC5jb20iLCJkYXRhIjp7InVzciI6IlRlc3QiLCJ0eXBlIjoiVSIsImVtYWlsIjoidXNlcm5hbWVAZ21haWwuY29tIn19.ZFMAcA0vTG18GJHm9jE-xWNw1KNI7im8GJ20a5KKpdbJD5zVVQDyXLgtbgJWtMo-oSFtKGg1BbPMokMoLeDNEFQmZQ9HEEQyl4-kks1_toPU4yc5ZgBeD2-qsMruiig0KSKC-pJoftpVRbKVO37Or33J6EvN4-3g93_agvqri2E";
    //this.shopid = "5d41402abc4b2a76b9719d688917c592";
  }

  ionViewDidLoad() {
    //loading
    let loader = this.loading.create({
      content: 'Finding Menu..'
    });
    loader.present().then(() => {
      this.postman.Getmenu(this.token, this.shopid).subscribe(success => {
        this.information = success;
        this.information = this.information.response.data;
      }, error => {
        console.log(error);
        loader.dismiss();
      }, () => {
        loader.dismiss();
      });      
    });
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

}
