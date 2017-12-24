import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { AlertsProvider } from '../alerts/alerts';


@Injectable()
export class AuthProvider {

  url = 'http://192.168.0.6/api/auth';
  data = null;
  loader = null;
  constructor(
    public http: HttpClient, 
    private geolocation: Geolocation, 
    private nativeGeocoder: NativeGeocoder, 
    public alert: AlertsProvider) { }

  AuthLogin(username, password){
    let htph = new HttpHeaders().set('content-type','application/json');
    let custom = {"username":username, "password":password.toString()};
    return this.http.post(this.url, custom, {headers:htph});
  }

  location(){
    this.geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.alert.fireAlert("Geocoder", 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    }).catch(error => {
      console.log('Error Founds : ', error);
    });

    this.nativeGeocoder.reverseGeocode(54.967541, -2.078125).then((result: NativeGeocoderReverseResult) => {
      this.alert.fireAlert("Native Geocoder", JSON.stringify(result));
    })
  .catch((error: any) => console.log(error));
  }

  locationForward(address){
    this.nativeGeocoder.forwardGeocode(address)
  .then((coordinates: NativeGeocoderForwardResult) => {
    this.alert.fireAlert("Forward Native Geo", 'Lat : '+coordinates.latitude+' | lng : '+coordinates.longitude);
  })
  .catch((error: any) => console.log(error));
  }

}
