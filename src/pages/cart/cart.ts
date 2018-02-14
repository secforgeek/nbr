import { Component } from '@angular/core';
import { NavController, Events, LoadingController } from 'ionic-angular';
import { CommunicationProvider } from '../../providers/communication/communication';
import { PostmanProvider } from '../../providers/http/postman';
import { AlertsProvider } from '../../providers/alerts/alerts';
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {

  cartItem:any[] = [];
  totalAmount:number = 0;
  finalAmount:number = 0;
  charges:number = 0;
  delivery_amount:number = 0;
  service_charge:number = 0;
  cartFound:boolean = false;
  delivery:boolean = true;
  collection:boolean = false;
  todeliver:boolean = true;
  storeinfo:any = [];
  successData = null;
  constructor(
    public navCtrl: NavController, 
    public events:Events, 
    private communication: CommunicationProvider,
    private postman:PostmanProvider,
    private alert:AlertsProvider,
    private loading:LoadingController
  ) {
    console.log("Loaded Cart");
  }

  ionViewWillEnter(){
    this.cartItem = this.communication.getCart();
    this.delivery_amount = +this.communication.getDeliveryCharge(); 
    this.service_charge = +this.communication.getServiceCharge(); 
    this.storeinfo = this.communication.getCartStoreInfo();
    this.updateTotal();
    //DELETE THIS 
    console.log("Delivery Amount ", this.delivery_amount);
    console.log("Service Amount ", this.service_charge);
    console.log("Total Amount  ", this.delivery_amount + this.service_charge);
    console.log(typeof this.delivery_amount);
    console.log(typeof this.service_charge);
  }

  add(item_topic_id){
    for(let item of this.cartItem){
      if(item.item_topic_id === item_topic_id){
        item.quantity += 1;
      }
    }
    this.updateGlobalCart(this.cartItem);
  }

  remove(index, item_topic_id){
    for(let item of this.cartItem){
      if(item.item_topic_id === item_topic_id){
        if(item.quantity > 1){
          item.quantity -= 1;
        }else{
          this.cartItem.splice(index, 1);
        }
      }
    }
    this.updateGlobalCart(this.cartItem);
  }

  updateGlobalCart(cart){
    this.communication.setCart(cart, this.communication.getShopId());
    this.updateTotal();
    this.events.publish('cart:items', cart);
  }

  updateTotal(){
    if(this.cartItem.length > 0){
      this.cartFound = true;
    }else{
      this.cartFound = false;
    }
    let total:number = 0;
    for(let item of this.cartItem){
      total += item.quantity * item.price;
    }
    this.totalAmount = total;
    this.charges = this.delivery_amount + this.service_charge;
    this.finalAmount = this.charges + this.totalAmount;
  }

  dupdate(item){
    if(item){
      this.collection = false;
      this.todeliver = true;
      console.log("Delivery : "+this.todeliver.toString());
    }
  }

  cupdate(item){
    if(item){
      this.delivery = false;
      this.todeliver = false;
      console.log("Delivery : "+this.todeliver.toString());
    }
  }

  checkout(subtotal, charges, finalamount){
    let priceDetail:any = {
      "subtotal":subtotal,
      "charges":charges,
      "total":finalamount,
      "splitcharge":{
        "delivery":this.delivery_amount,
        "service":this.service_charge
      }
    };
    let loader = this.loading.create({
      content: 'Verifying Items'
    });

    loader.present().then(() => {
          this.postman.verifyCheckout(this.communication.getToken(), this.storeinfo.shopid, this.cartItem, priceDetail, this.todeliver).subscribe(success => {
            this.successData = success;
            console.log(success);
            switch(Object.keys(this.successData.response)[0]){
              case "error":
                loader.dismiss();
                this.alert.fireAlert("Error ("+this.successData.response.code+")", this.successData.response.error);
              break;

              case "profile_status":
                loader.dismiss();
                this.alert.fireAlert("Verification Failed", this.successData.response.profile_status);
              break;

              case "part_done":
                loader.dismiss();
                this.alert.fireAlert("Verification Failed", this.successData.response.part_done);
              break;

              case "done": //done
                loader.dismiss();
                this.alert.fireAlert("Order", this.successData.response.done);
              break;

              default:
                loader.dismiss();
                this.alert.fireAlert("Error", "Something went wrong!");
              break;
            }
        }, error => {
          console.log(JSON.stringify(error));
          loader.dismiss();
          console.log("Error Triggered");
        }, () => {
          console.log("Complete");
        });
    });
  }


}
