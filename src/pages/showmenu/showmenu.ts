import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PostmanProvider } from '../../providers/http/postman';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-showmenu',
  templateUrl: 'showmenu.html',
})
export class ShowmenuPage {
  shopid = null;
  token = null;
  information = null;
  cart:any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loading:LoadingController,
    public postman:PostmanProvider,
    public alert:AlertsProvider,
    public storage:StorageProvider
  ) {
    //this.shopid = navParams.get('shopid');
    //this.token = navParams.get('token');
    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MTQ1NjEyODUsImV4cCI6MzAzMDMzMjE3MCwiaXNzIjoiZ3Nkcm9pZC5jb20iLCJkYXRhIjp7InVzciI6IlRlc3QiLCJ0eXBlIjoiVSIsImVtYWlsIjoidXNlcm5hbWVAZ21haWwuY29tIn19.vEBcsHcBk3vCIhIACYeWNScT20JjpNvIi2O_6FguW5m11PrgSqmo1AIGwz2S7w1n_ZOsrqah-pdW8XlJA65sWIi5THR8ymP-d7bK9lMdbtDskVOXvUJTpuIqblxSKhX-uQngiOtQRv-eQDTNYlDec1YzzFfsGvbtYgR4FfkrY3M";
    this.shopid = "5d41402abc4b2a76b9719d688917c592";
  }

  ionViewDidLoad() {
    //loading
    let loader = this.loading.create({
      content: 'Finding Menu..'
    });
    loader.present().then(() => {
      this.postman.Getmenu(this.token, this.shopid).subscribe(success => {
        this.information = success;
        switch(Object.keys(this.information.response)[0]){
          case "error":
            this.alert.fireAlert("Something Went Wrong!", this.information.response.error);
            console.log(success);
          break;

          case "success":
            this.information = this.information.response.data;
            console.log(success);
          break;

          case "logout":
            this.alert.fireAlert("Session Expired", "Login Again");
            this.storage.resetAll();
          break;

          default:
            this.alert.fireAlert("Something Went Wrong!", this.information.response.error);
          break;

        }
      }, error => {
        console.log(error);
        loader.dismiss();
        this.alert.fireAlert("Something Went Wrong!", error.response.error);
      }, () => {
        loader.dismiss();
      });      
    });
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }

  AddItem(category, input){

    let include = true;
    for(let basket of this.cart){
      if(basket.item_topic_id === input.item_topic_id){
        basket.quantity += 1;
        include = false;
      }
    }
    if(include){
      let d = {
        'quantity':1,
        'category_id':input.category_id,
        'item_topic_id':input.item_topic_id,
        'category':category,
        'item':input.item_topic,
        'price':input.price
      } 
      this.cart.push(d);
      console.log("Item Added : " + d.item);
    }
    console.log(this.cart);

  }

}
