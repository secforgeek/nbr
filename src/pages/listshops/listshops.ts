import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PostmanProvider } from '../../providers/http/postman';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { ShowmenuPage } from '../../pages/showmenu/showmenu';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-listshops',
  templateUrl: 'listshops.html',
})

export class ListshopsPage {

  apiresult = false;
  token = null;
  lat:number = null;
  lng:number = null;
  selectedFilter = null;
  successData = null;
  stores:Apidata[] = null;
  filterData:Apidata[] = null;
  no_shops_nearby = false;
  constructor(
    public navCtrl:NavController,
    public navparam:NavParams,
    public postman:PostmanProvider,
    public loading:LoadingController,
    public alert:AlertsProvider,
    public alertCtrl: AlertController,
    public storage: StorageProvider
  ) {

    //getting value
    //this.token = this.navparam.get('token');
    //this.lat = this.navparam.get('lat');
    //this.lng = this.navparam.get('lng');

    //this.lat = 54.942794;
    //this.lng = -1.871812;
    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MTQ2NzE2ODUsImV4cCI6MzAzMDU1Mjk3MCwiaXNzIjoiZ3Nkcm9pZC5jb20iLCJkYXRhIjp7InVzciI6IlRlc3QiLCJ0eXBlIjoiVSIsImVtYWlsIjoidXNlcm5hbWVAZ21haWwuY29tIn19.HePE7hlK4H2JjEzh_juCNk6q-FaxR7Bi4FtbDQXFcDr7eKxlq3qmn-0BvIJDDTv1fxu0IWdEfVGhjUZx2LjkN4j5oQVJYUHBrx3zs4Q5LTeb3ZRmOoZ_0fpnclSC6iA7liW0yWqcuV-dyjbWqHk6m4NKJHFc3SMWiPeOw1sjD2U";
  }

  ionViewDidLoad(){
    console.log("%c onViewDidLoad", 'background: #222; color: #bada55');
    this.apiresult = false;
    //loading
    let loader = this.loading.create({
      content: 'Finding nearest shops..'
    });
    loader.present().then(() => {
      this.postman.ListStore(this.token, this.lat, this.lng, "Takeaway").subscribe(success => {
        this.successData = success;
        console.log(success);
        switch(Object.keys(this.successData.response)[0]){
          case "error":
            this.alert.fireAlert("Error", this.successData.response.error);
          break;

          case "success":
            this.stores = this.successData.response.data;
            console.log(this.stores);
            this.apiresult = true;
          break;

          case "action":
            this.alert.fireAlert("Session Expired", "Login Again");
            console.log(success);
          break;

          case "shop":
            this.no_shops_nearby = true;
          break;

          default:
            this.alert.fireAlert("Error", "Unknown Error");
          break;

        }
      }, error => {
          loader.dismiss();
          console.log(error);
          this.alert.fireAlertandPop("Error", "Please check your internet", this.navCtrl);
      }, () => {
        loader.dismiss();
        console.log("Completed Tasks");
      });
    });

  }

  filterSearch(ev:any){
    let search = ev.target.value;
    if(search && search.trim() !== ''){
      if(this.stores !== null){
        this.filterData = this.stores.filter(function(item){
          return item.name.toLowerCase().includes(search.toLowerCase());
        });
      }
    }else{
      this.filterData = null;
    }
  }

  filterByFilterOption(fil_val:string){
    if(fil_val == "All"){
      this.filterData = null;
    }else{
      this.filterData = this.stores.filter(function(item){
        return item.cuisine.toLowerCase().includes(fil_val.toLowerCase());
      });
    }
  }

  filterBtn(){
    if(this.stores !== null){
      let al = this.alertCtrl.create();
      al.setTitle('Shop Filters');
      if(this.selectedFilter == null || this.selectedFilter == "All"){
          al.addInput({
            type: 'radio',
            label:'All',
            value: 'All',
            checked:true
          });
      }else{
        al.addInput({
          type: 'radio',
          label:'All',
          value: 'All'
        });
      }
      let menus = new Array();
      for(let entry of this.stores){
        let split = entry.cuisine.split(", ");
        for(let sp of split){
            if(sp == this.selectedFilter){
              al.addInput({
                type: 'radio',
                label: sp,
                value: sp,
                checked: true
              });
            }else{
              al.addInput({
                type: 'radio',
                label: sp,
                value: sp
              });
            }
        }
      }
      al.addButton({
        text:'Ok',
        handler: (data: any) => {
          this.selectedFilter = data;
          this.filterByFilterOption(data);
          console.log("Selected : "+data);
        }
      });

      al.addButton('Cancel');
      al.present();
      console.log(menus);
    }
  }

  ngOnInit(){
    console.log("ngOnInit");
  }

  ionViewWillEnter(){
    console.log("%c onViewWillEnter", 'background: #222; color: #bada55');
  }

  ionViewDidEnter(){
    console.log("%c onViewDidEnter", 'background: #222; color: #bada55');
  }

  ionViewCanLeave(){
    console.log("%c onViewCanLeave", 'background: #222; color: #bada55');
  }

  ionViewWillLeave(){
    console.log("%c onViewWillLeave", 'background: #222; color: #bada55');
  }

  ionViewWillUnload(){
    console.log("%c onViewWillUnLoad", 'background: #222; color: #bada55');
  }

  showMenu(name:string, cuisine:string, distance:number, minimum_order:number, delivery_fee:number, shopid:string){
    let data = {
      "name":name,
      "cuisine":cuisine,
      "distance":distance,
      "min_order":minimum_order,
      "delivery_fee":delivery_fee,
      "shopid":shopid,
      "token":this.token
    };
    this.navCtrl.push(ShowmenuPage, data);
  }


  back(){
    console.log("Back");
    this.navCtrl.pop();
  }

}

interface Apidata{
  shopid: string,
  name:string,
  logo:string,
  cuisine:string,
  delivery_fee:number,
  distance:number,
  minimum_order:number
}