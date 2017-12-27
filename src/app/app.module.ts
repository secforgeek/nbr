import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OrdersPage } from '../pages/orders/orders';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { PostmanProvider } from '../providers/http/postman';
import { AlertsProvider } from '../providers/alerts/alerts';
import { StorageProvider } from '../providers/storage/storage';
import { Toast } from '@ionic-native/toast';
import { ListshopsPage } from '../pages/listshops/listshops';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LocationProvider } from '../providers/location/location';
import { ShowmenuPage } from '../pages/showmenu/showmenu';

@NgModule({
  declarations: [
    MyApp,
    OrdersPage,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    ListshopsPage,
    ShowmenuPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrdersPage,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    ListshopsPage,
    ShowmenuPage
  ],
  providers: [
    Toast,
    StatusBar,
    SplashScreen,
    StorageProvider,
    PostmanProvider,
    Geolocation,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertsProvider,
    LocationProvider
  ]
})
export class AppModule {}
