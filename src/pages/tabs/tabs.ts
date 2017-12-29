import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular'
import { CartPage } from '../cart/cart';
import { SettingsPage } from '../settings/settings';
import { ShowmenuPage } from '../showmenu/showmenu';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ShowmenuPage; //HomePage; 
  tab2Root = CartPage;//
  tab3Root = SettingsPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
