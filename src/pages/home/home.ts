import { Component } from '@angular/core';
import { NavController, App, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular/platform/platform';
import { StorageProvider } from '../../providers/storage/storage';
import { ListshopsPage } from '../listshops/listshops';
import { LocationProvider } from '../../providers/location/location';
import { AlertsProvider } from '../../providers/alerts/alerts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  toggle = true;
  address = null;
  loader = null;

  constructor(
    public navCtrl: NavController, 
    public app: App, 
    public loading: LoadingController,
    public platform: Platform,
    public geolocation:Geolocation,
    private storage: StorageProvider,
    public location: LocationProvider,
    public alert: AlertsProvider
  ) { }

  move(){
   let loader = this.loading.create({
    content: 'Please wait..'
  });
  loader.present().then(() => {
    console.log('Loader started');
  });

    setTimeout(function(){
      loader.dismiss().then(() => {
        console.log("Loader Stopped");
      });
    }, 2000);
  }

  findrestro(){
    console.log("Locked");
    if(this.toggle){
      let options = {
        enableHighAccuracy: true,
        timeout: 10000
      };
      
      this.platform.ready().then(() => {
        console.log("Platform Ready");
        this.geolocation.getCurrentPosition(options).then(resp => {
            if(resp.coords.accuracy < 75){
              this.storage.getToken().then(value => {
                console.log(value);
                console.log(resp.coords.latitude, resp.coords.longitude, resp.coords.accuracy);
                let data = {
                  "token":value,
                  "lat":resp.coords.latitude,
                  "lng":resp.coords.longitude
                };
  
                this.navCtrl.push(ListshopsPage, data);
                console.log
              });
            }else{
              this.toggle = false;
              this.alert.fireToast("Location not found. Please enter your address manually")
            }
        }).catch(() => {
          this.toggle = false;
          this.alert.fireToast("Location not found. Please enter your address manually")
        });
      });

    }else{
      console.log(this.address);
      this.location.locationForward(this.address).then(success => {
          if(success['status'] === "success"){
            this.storage.getToken().then(value => {
              let data = {
                "token":value,
                "lat":success['lat'],
                "lng":success['lng']
              };
              console.log(data);
              this.navCtrl.push(ListshopsPage, data);
            });
          }else{
            this.alert.fireToast("Unable to locate your location");
            this.toggle = true;
          }
      });
    }
  }

}
