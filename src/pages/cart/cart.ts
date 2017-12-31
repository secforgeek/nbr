import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {

  cartItem:any[] = [];
  totalAmount:number = 0;
  delivery_amount:number = 0;
  service_charge:number = 0;
  charges:number = 0;
  finalAmount:number = 0;
  cartFound:boolean = false;
  delivery:boolean = true;
  collection:boolean = false;
  todeliver:boolean = true;

  constructor(public navCtrl: NavController, public events:Events, private storage: StorageProvider) {
    console.log("Loaded Cart");
  }

  ionViewWillEnter(){
    this.cartItem = this.storage.getCart();
    this.updateTotal();
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
    this.storage.setCart(cart, this.storage.getShopId());
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
    this.finalAmount = total + this.delivery_amount + this.service_charge;
    this.charges = this.delivery_amount + this.service_charge;
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


}
