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
  lat = null;
  lng = null;
  selectedFilter = null;
  successData = null;
  stores:Apidata[] = null;
  filterData:Apidata[] = null;

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
    /*
    this.token = this.navparam.get('token');
    this.lat = this.navparam.get('lat');
    this.lng = this.navparam.get('lng');
    */

    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MTQzMjA2NzMsImV4cCI6MzAyOTg1MDk0NiwiaXNzIjoiZ3Nkcm9pZC5jb20iLCJkYXRhIjp7InVzciI6IlRlc3QiLCJ0eXBlIjoiVSIsImVtYWlsIjoidXNlcm5hbWVAZ21haWwuY29tIn19.ZFMAcA0vTG18GJHm9jE-xWNw1KNI7im8GJ20a5KKpdbJD5zVVQDyXLgtbgJWtMo-oSFtKGg1BbPMokMoLeDNEFQmZQ9HEEQyl4-kks1_toPU4yc5ZgBeD2-qsMruiig0KSKC-pJoftpVRbKVO37Or33J6EvN4-3g93_agvqri2E";
    this.lat = 54.967574;
    this.lng = -2.078040;
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

          case "logout":
            this.alert.fireAlert("Session Expired", "Login Again");
            this.storage.resetAll();
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
      this.filterData = this.stores.filter(function(item){
          return item.name.toLowerCase().includes(search.toLowerCase());
      });
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

  showMenu(shopid){
    let data = {
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