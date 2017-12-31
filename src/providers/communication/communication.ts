import { Injectable } from '@angular/core';

@Injectable()
export class CommunicationProvider {
    cart:any[] = [];
    delivery_charge:number = 0;
    shopid:string = null;
    storeinfo:any[] = [];
    service_charge:number = 0;

    constructor(){
        console.log("Communication Load");
    }

    //SETTER
    setCart(cart, shopid){
        console.log("set cart");
        this.cart = cart;
        this.shopid = shopid;
    }

    setDeliveryCharge(price){
        this.delivery_charge = price;
    }

    setServiceCharge(price){
        this.service_charge = price;
    }

    setCartStoreInfo(data){
        this.storeinfo = data;
    }


    //GETTER

    getCart(){
        console.log("get cart");
        return this.cart;
    }

    getShopId(){
        return this.shopid;
    }

    getCartStoreInfo(){
        return this.storeinfo;
    }

    getDeliveryCharge(){
        return this.delivery_charge;
    }

    getServiceCharge(){
        return this.service_charge;
    }

}