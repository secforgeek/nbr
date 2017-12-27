import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PostmanProvider } from '../../providers/http/postman';
import { AlertsProvider } from '../../providers/alerts/alerts';

@Component({
  selector: 'page-listshops',
  templateUrl: 'listshops.html',
})

export class ListshopsPage {

  apiresult = false;
  token = null;
  lat = null;
  lng = null;
  successData = null;
  stores:Apidata[] = null;
  filterData:Apidata[] = null;

  constructor(
    public navCtrl:NavController,
    public navparam:NavParams,
    public postman:PostmanProvider,
    public loading:LoadingController,
    public alert:AlertsProvider,
    public alertCtrl: AlertController
  ) {

    //getting value
    this.token = this.navparam.get('token');
    this.lat = this.navparam.get('lat');
    this.lng = this.navparam.get('lng');
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
        switch(Object.keys(this.successData.response)[0]){
          case "error":
            this.alert.fireAlert("Error", this.successData.response.error);
          break;

          case "success":
            this.stores = this.successData.response.data;
            console.log(this.stores);
            this.apiresult = true;
          break;

          default:
            this.alert.fireAlert("Error", "Unknown Error");
          break;

        }
      }, error => {
          loader.dismiss();
          console.log(error);
          this.alert.fireAlert("Error", "Please check your internet");
      }, () => {
        loader.dismiss();
        console.log("Completed Tasks");
      });
    });

  }

  filterSearch(ev:any){
    let search = ev.target.value;
    if(search && search.trim() !== ''){
      this.filterData = this.stores.filter(function(item){
          return item.name.toLowerCase().includes(search.toLowerCase());
      });
    }else{
      this.filterData = null;
    }
  }

  filterBtn(){
    let al = this.alertCtrl.create();
    al.setTitle('Shop Filters');
    al.addInput({
      type: 'radio',
      label:'All',
      value: 'All',
      checked:true
    });
    let menus = new Array();
    for(let entry of this.stores){
      let split = entry.cuisine.split(", ");
      for(let sp of split){
          al.addInput({
            type: 'radio',
            label: sp,
            value: sp
          });
      }
    }
    al.addButton({
      text:'Ok',
      handler: (data: any) => {
        console.log("Selected : "+data);
      }
    });

    al.addButton('Cancel');
    al.present();
    console.log(menus);
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