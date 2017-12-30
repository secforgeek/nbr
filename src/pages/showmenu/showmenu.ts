import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
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
  message = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loading:LoadingController,
    public postman:PostmanProvider,
    public alert:AlertsProvider,
    public storage:StorageProvider,
    public events:Events
  ) {
    console.log("Loaded ShowMenu");
    //this.shopid = navParams.get('shopid');
    //this.token = navParams.get('token');
    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MTQ1OTgwMzEsImV4cCI6MzAzMDQwNTY2MiwiaXNzIjoiZ3Nkcm9pZC5jb20iLCJkYXRhIjp7InVzciI6IlRlc3QiLCJ0eXBlIjoiVSIsImVtYWlsIjoidXNlcm5hbWVAZ21haWwuY29tIn19.TIQmmPYqs-M-yC5LsIXWsiwm1-Z3y3L2hsddAGuUwny3nq-P5xvWeT2cpLbJ6fy9rnpLulbST-fOSkaH9t1Iifv7NH724FykmBTWCRlLUgI2CU0IBBIhAtxkvOb0ELqyWFjgdAT2zQxvQxGleOz8Kr0SqWIaI6YmyvgcTusLsKQ";
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
            console.log("ERROR");
          break;

          case "success":
            this.information = this.information.response.data;
            console.log("SUCCESS");
            console.log(success);
          break;

          case "action":
            this.alert.fireAlert("Session Expired", "Login Again");
            //this.storage.resetAll();
            console.log("Logout");
          break;

          default:
            this.alert.fireAlert("Something Went Wrong!", this.information.response.error);
            console.log("Default");
            console.log(Object.keys(this.information.response)[0]);
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
        this.events.publish('cart:items', this.cart);
        this.alert.fireToast("Added - "+basket.item+ " ( "+basket.quantity+" )");
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
      this.storage.setCart(this.cart);
      this.events.publish('cart:items', this.cart);
      this.alert.fireToast("Added - "+d.item);
    }
    
  }

}
