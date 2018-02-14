import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

@Injectable()
export class LocationProvider {

  constructor(
    public platform: Platform, 
    private nativeGeocoder: NativeGeocoder) {

      console.log("Location Class");
      
  }

  locationForward(address):Promise<any>{
    return this.nativeGeocoder.forwardGeocode(address).then((coordinates: NativeGeocoderForwardResult) => {
        //TODO forward Success
        let val = {"status":"success","lat":coordinates.latitude, "lng":coordinates.longitude};
        return val;
    }).catch((error: any) => {
        return {"status":"error", "message":error};
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
