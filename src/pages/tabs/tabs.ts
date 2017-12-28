import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular'
import { OrdersPage } from '../orders/orders';
import { SettingsPage } from '../settings/settings';
//import { ListshopsPage } from '../listshops/listshops';
//import { ShowmenuPage } from '../showmenu/showmenu';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage; //ShowmenuPage;
  tab2Root = OrdersPage;//ListshopsPage;//
  tab3Root = SettingsPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
