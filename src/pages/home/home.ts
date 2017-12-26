import { Component } from '@angular/core';
import { NavController, App, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Platform } from 'ionic-angular/platform/platform';
import { StorageProvider } from '../../providers/storage/storage';
import { ListshopsPage } from '../listshops/listshops';

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
    private storage: StorageProvider
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
    let options = {
      enableHighAccuracy: true,
      timeout: 5000
    };
    
    this.platform.ready().then(() => {
      console.log("Platform Ready");
      this.geolocation.getCurrentPosition(options).then(resp => {
          if(resp.coords.accuracy < 75){
            this.storage.getToken().then(value => {
              //console.log(value);
              //console.log(resp.coords.latitude, resp.coords.longitude);
              let data = {
                "token":value,
                "lat":resp.coords.latitude,
                "lng":resp.coords.longitude
              };

              this.navCtrl.push(ListshopsPage, data);
            });
          }else{
            this.toggle = false;
            console.log("Toggle False 1");
          }
      }).catch(() => {
        this.toggle = false;
        console.log("Toggle False 2");
      });
    });
  }

}
