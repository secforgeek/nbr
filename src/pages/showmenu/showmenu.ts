import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { PostmanProvider } from '../../providers/http/postman';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import { CommunicationProvider } from '../../providers/communication/communication';

@Component({
  selector: 'page-showmenu',
  templateUrl: 'showmenu.html',
})
export class ShowmenuPage {
  name:string = null; cuisine:string = null; distance:number = null; min_order:number = null; delivery_fee:number = null;
  shopid = null; token = null;
  information = null;
  cart:any[] = [];
  message = null;
  foundData = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loading:LoadingController,
    public postman:PostmanProvider,
    public alert:AlertsProvider,
    public communication:CommunicationProvider,
    public events:Events,
    public nav:App
  ) {
    console.log("Loaded ShowMenu");
    this.shopid = navParams.get('shopid');
    this.token = navParams.get('token'); 
    this.name = navParams.get('name');
    this.cuisine = navParams.get('cuisine');
    this.distance = navParams.get('distance');
    this.min_order = navParams.get('min_order');
    this.delivery_fee = navParams.get('delivery_fee');
    console.log(typeof this.delivery_fee);
    console.log(this.delivery_fee);
    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MTQ2NzE2ODUsImV4cCI6MzAzMDU1Mjk3MCwiaXNzIjoiZ3Nkcm9pZC5jb20iLCJkYXRhIjp7InVzciI6IlRlc3QiLCJ0eXBlIjoiVSIsImVtYWlsIjoidXNlcm5hbWVAZ21haWwuY29tIn19.HePE7hlK4H2JjEzh_juCNk6q-FaxR7Bi4FtbDQXFcDr7eKxlq3qmn-0BvIJDDTv1fxu0IWdEfVGhjUZx2LjkN4j5oQVJYUHBrx3zs4Q5LTeb3ZRmOoZ_0fpnclSC6iA7liW0yWqcuV-dyjbWqHk6m4NKJHFc3SMWiPeOw1sjD2U";
    this.shopid = "5d41402abc4b2a76b9719d688917c592";
    this.delivery_fee = 2;
    this.communication.setCartStoreInfo(this.storeInfo());
    this.communication.setToken(this.token);
    this.communication.setServiceCharge(10);
    if(this.communication.getShopId() === this.shopid){
      this.cart = this.communication.getCart();
    }
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
            console.log("ERROR");
          break;

          case "success":
            this.information = this.information.response.data;
            this.foundData = true;
            console.log("SUCCESS");
          break;

          case "action":
            this.alert.fireAlert("Session Expired", "Login Again");
           // this.storage.resetAll();
            //this.nav.getRootNav().push(LoginPage);
            console.log(success);
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
        this.alert.fireAlert("Something Went Wrong!", "Try again later");
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
      }; 
      this.cart.push(d);
      console.log("Item Added : " + d.item);
      this.communication.setCart(this.cart, this.shopid);
      this.communication.setDeliveryCharge(this.delivery_fee);
      this.events.publish('cart:items', this.cart);
      this.alert.fireToast("Added - "+d.item);
    }
    
  }

  storeInfo(){
    let da = {
      "shopid":this.shopid,
      "name":this.name,
      "cuisine":this.cuisine,
      "distance":this.distance,
      "min_order":this.min_order,
      "del_fee":this.delivery_fee
    };
    return da;
  }

  update(checked){
    console.log(checked);
  }

  back(){
    console.log("Back");
    this.navCtrl.pop();
  }

}
