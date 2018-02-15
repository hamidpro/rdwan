import { SharedProvider } from '../../providers/shared/shared';
import { ParametrePage } from '../parametre/parametre';
import { StatistiquePage } from '../statistique/statistique';
import { InventoryPage } from '../inventory/inventory';
import { ArticlesPage } from '../articles/articles';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { HelpPage } from '../help/help';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  admin:boolean;
  tab1Root: any = ArticlesPage;
  tab2Root: any = InventoryPage;
  tab3Root: any = StatistiquePage;
  tab4Root: any = ParametrePage;
  tab5Root: any = HelpPage;


  
  mySelectedIndex: number;

  constructor(private shared:SharedProvider,navParams: NavParams) {
    this.admin=this.shared.admin;
    
    if(this.admin){
      this.tab1Root= ArticlesPage;
      this.tab2Root= InventoryPage;
      this.tab3Root= StatistiquePage;
      this.tab4Root= ParametrePage;
      this.tab5Root= HelpPage;
    }else{
      this.tab1Root= InventoryPage;
      this.tab2Root= HelpPage;
    }
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    
  }

}
