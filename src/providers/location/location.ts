import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationProvider {

  constructor(
    public platform: Platform,
    private geolocation: Geolocation, 
    private nativeGeocoder: NativeGeocoder) {

      console.log("Location Class");
      
  }

  locationForward(address){
      this.nativeGeocoder.forwardGeocode(address).then((coordinates: NativeGeocoderForwardResult) => {
        //TODO forward Success
    })
    .catch((error: any) => {
        //TODO forward error
    });
  }

  locationReverse(lat, lng){
    this.nativeGeocoder.reverseGeocode(lat, lng).then((result: NativeGeocoderReverseResult) => {
        //TODO Reverse Success
    })
    .catch((error: any) => {
        //TODO Reverse Error
    });
  }

  test(){
    console.log("Locked");
    let options = {
      enableHighAccuracy: true,
      timeout: 5000
    };
    
    this.platform.ready().then(() => {
      console.log("Platform Ready");
      this.geolocation.getCurrentPosition(options).then(resp => {

          if(resp.coords.accuracy < 75){
            //return {'res': 'success', 'lat':resp.coords.latitude, 'lng':resp.coords.longitude};
            console.log("Success" + resp.coords.latitude);
          }else{
            console.log("> 75");
          }
      }).catch(() => {
        console.log("Error");
        return 'false';
      });
    });
  }

  mainlocation = function(){
    let platform:Platform;
    return new Promise(function(resolve, error){
      console.log("Locked");
      let options = {
        enableHighAccuracy: true,
        timeout: 5000
      };
      
      platform.ready().then(() => {
        console.log("Platform Ready");
        this.geolocation.getCurrentPosition(options).then(resp => {
  
            if(resp.coords.accuracy < 75){
              //return {'res': 'success', 'lat':resp.coords.latitude, 'lng':resp.coords.longitude};
              console.log("Success" + resp.coords.latitude);
              resolve('Map success');
            }else{
              console.log("> 75");
              error('failed');
            }
        }).catch(() => {
          console.log("Error");
          return 'false';
        });
      });
    });
  };

}
