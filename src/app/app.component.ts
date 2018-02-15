import { SharedProvider } from '../providers/shared/shared';
import { NetworkPage          } from '../pages/network/network';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen         } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';

import { AccountPage     } from '../pages/account/account';
import { ArticlesPage    } from '../pages/articles/articles';
import { HelpPage        } from '../pages/help/help';
import { InventoryPage   } from '../pages/inventory/inventory';
import { LoginPage       } from '../pages/login/login';
import { ParametrePage   } from '../pages/parametre/parametre';
import { StatistiquePage } from '../pages/statistique/statistique';
import { TabsPage        } from '../pages/tabs-page/tabs-page';
import { ModalController } from 'ionic-angular';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})


export class ConferenceApp
{
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  public admin:boolean;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[]=[] ;
  loggedInPages: PageInterface[] = [
    { title: 'Compte', name: 'AccountPage', component: AccountPage, icon: 'contact' },
    { title: 'Déconnexion', name: 'LoginPage', component: TabsPage, icon: 'log-out', logsOut: true }

  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Connection', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Réseau', name: 'NetworkPage', component: NetworkPage, icon: 'git-network' }
  ];
  rootPage: any;


  AppPageordAdmin(){
    this.appPages= [
      { title: 'Articles',       name: 'TabsPage', component: TabsPage, tabComponent: ArticlesPage,    index: 0, icon: 'clipboard' },
      { title: 'Inventaire',     name: 'TabsPage', component: InventoryPage, tabComponent: InventoryPage,   index: 1, icon: 'browsers' },
      { title: 'Statistiques',   name: 'TabsPage', component: TabsPage, tabComponent: StatistiquePage, index: 2, icon: 'pie' },
      { title: 'Paramètres',     name: 'TabsPage', component: TabsPage, tabComponent: ParametrePage,   index: 3, icon: 'settings' },
      { title: 'Aide',           name: 'TabsPage', component: TabsPage, tabComponent: HelpPage,        index: 4, icon: 'help-buoy' }
    ];
  }
  AppPageordUser(){
    this.appPages= [
      { title: 'Inventaire',    name: 'TabsPage', component: TabsPage, tabComponent: InventoryPage,   index: 0, icon: 'browsers' },
      { title: 'Aide',           name: 'TabsPage', component: TabsPage, tabComponent: HelpPage,        index: 1, icon: 'help-buoy' }
    ];
  }

  constructor(
    public events: Events,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    public shared:SharedProvider
  ) {

    this.platformReady()
    // load the conference data


    this.rootPage = LoginPage;
    this.presentProfileModal();




    this.enableMenu(true);


    this.listenToLoginEvents();
  }

  openPage2(page: PageInterface) {
    let params = {};


    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      console.log("index="+page.index);
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
      // Set the root of the nav with params if it's a tab index
      console.log("page.index=="+page.index);
    }else if(page.title == "Réseau") {
      console.log("yes yes yes");
      this.nav.push(NetworkPage);
    }
    else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      //change
      this.events.publish('user:logout');
      this.nav.setRoot(LoginPage);
    }




  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(NetworkPage, {});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });

    profileModal.present();
  }


  openPage(page: PageInterface) {
    console.log(page);
    switch(page.title){
      case "Articles":       this.nav.setRoot(ArticlesPage); break;
      case "Inventaire":      this.nav.push(InventoryPage); break;
      case "Statistiques":   this.nav.push(StatistiquePage); break;
      case "Paramètres":       this.nav.push(ParametrePage); break;
      case "Aide":           this.nav.push(HelpPage); break;
      case "Compte":        this.nav.push(AccountPage); break;
      case "Réseau":         this.nav.push(NetworkPage); break;
      case "Déconnexion":
        if (page.logsOut === true) {
          // Give the menu time to close before changing to logged out
          //change
          this.events.publish('user:logout');
          this.nav.setRoot(LoginPage);
        } break;
      case "Connection": this.nav.setRoot(LoginPage); break;

      default: break;
    }
  }


  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      if(this.admin=this.shared.admin)
        this.AppPageordAdmin();

      else
        this.AppPageordUser();
      console.log("--------> app admin="+this.admin)
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);

    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
