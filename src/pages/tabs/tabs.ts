import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular'
import { OrdersPage } from '../orders/orders';
import { SettingsPage } from '../settings/settings';
//import { HomePage } from '../home/home';
import { ListshopsPage } from '../listshops/listshops';
import { ShowmenuPage } from '../showmenu/showmenu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ShowmenuPage;
  tab2Root = ListshopsPage;//OrdersPage;
  tab3Root = SettingsPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
