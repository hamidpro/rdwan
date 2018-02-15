import { InventorylocationPage } from '../pages/inventorylocation/inventorylocation';
import { ArticlesNotInventoryPage } from '../pages/articles-not-inventory/articles-not-inventory';
import { createDataBaseProvider} from '../providers/sqllite/CreateDataBase';
import { InventoryStatisticsService } from '../providers/InventoryStatistics.service';
import { StatisticsService } from '../providers/Statistics.service';
import { ArticleInventoryService } from '../providers/ArticleInventory.service';
import { ConnectionService } from '../providers/Connection.service';
import { ArticleService } from '../providers/Article.service';
import { NetworkPage } from '../pages/network/network';
import { ParametreService } from '../providers/Parametres.service';
import { CategoryPage } from '../pages/category/category';
import { InventoryFormePage } from '../pages/inventory-forme/inventory-forme';
import { InventoryDetailsPage, PopoverPage } from '../pages/inventory-details/inventory-details';
import { ArticleFormePage } from '../pages/article-forme/article-forme';
import { RetrievePasswordPage } from '../pages/retrieve-password/retrieve-password';
import { CodeBarPage } from '../pages/code-bar/code-bar';
import { HelpPage } from '../pages/help/help';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AboutPage }     from '../pages/about/about';
import { AccountPage }   from '../pages/account/account';
import { ArticlesPage, PopoverPageArticle } from '../pages/articles/articles';
import { ContactPage }   from '../pages/contact/contact';
import { LoginPage }     from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import {InventoryStatistiquePage}  from '../pages/inventory-statistique/inventory-statistique';
import { AdminService } from '../providers/Admin.service';
import { InventoryService } from '../providers/Inventory.service';
import { UserService } from '../providers/User.service';
import { ConferenceApp } from './app.component';
import { InventoryPage, PopoverPageInventory } from '../pages/inventory/inventory';

import { PopoverPageStatistic, StatistiquePage } from '../pages/statistique/statistique';
import { ParametrePage, PopoverPageParametre } from '../pages/parametre/parametre';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SharedProvider } from '../providers/shared/shared';


import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
//---------------------------------------------------------------------
import { LocalArticleProvider} from '../providers/sqllite/LocalArticle';

import { LocalArticleInventoryProvider} from '../providers/sqllite/LocalArticleInventory';
import { LocalInventoryProvider} from '../providers/sqllite/LocalInventory';
import { LocalMagasinProvider} from '../providers/sqllite/LocalMagasin';
import { LocalParametreProvider} from '../providers/sqllite/LocalParametre';
import { LocalUserProvider} from '../providers/sqllite/LocalUser';
import { LocalStatisticsProvider} from '../providers/sqllite/LocalStatistics';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SqlLiteDatabaseProvider } from '../providers/sql-lite-database/sql-lite-database';

import { Geolocation } from '@ionic-native/geolocation';
import { LocalisationProvider } from '../providers/localisation/localisation';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    SignupPage,
    TabsPage,
    ContactPage,
    StatistiquePage,
    ArticlesPage,
    InventoryPage,
    ParametrePage,
    HelpPage,
    CodeBarPage,
    RetrievePasswordPage,
    ArticleFormePage,
    InventoryDetailsPage,
    InventoryFormePage,
    CategoryPage,
    NetworkPage,
    InventoryStatistiquePage,
    ArticlesNotInventoryPage,
    InventorylocationPage,
    PopoverPage,
    PopoverPageArticle,
    PopoverPageInventory,
    PopoverPageParametre,
    PopoverPageStatistic


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: ContactPage, name: 'ContactPage', segment: 'contact' },
        { component: ArticlesPage, name: 'articles', segment: 'articles' } ,
        { component: InventoryPage, name: 'inventory', segment: 'inventory' } ,
        { component: StatistiquePage, name: 'statistique', segment: 'statistique' } ,
        { component: ParametrePage, name: 'parametre', segment: 'parametre' }  ,
        { component: HelpPage, name: 'help', segment: 'help' }    ,
        { component: CodeBarPage, name: 'codeBar', segment: 'codeBar' }    ,
        { component: RetrievePasswordPage, name: 'retrievePassword', segment: 'retrievePassword' }    ,
        { component: ArticleFormePage, name: 'articleFormePage', segment: 'articleFormePage' },
        { component: InventoryDetailsPage, name: 'inventoryDetailsPage', segment: 'inventoryDetailsPage' }  ,
        { component: InventoryFormePage, name: 'inventoryFormePage', segment: 'inventoryFormePage' },
        { component: CategoryPage, name: 'categoryPage', segment: 'categoryPage' },

        { component: NetworkPage, name: 'networkPage', segment: 'networkPage' },
        { component: InventoryStatistiquePage, name: 'inventoryStatistiquePage', segment: 'inventoryStatistiquePage' },
        { component: ArticlesNotInventoryPage, name: 'articlesNotInventoryPage', segment: 'articlesNotInventoryPage' },
        { component: InventorylocationPage, name: 'inventorylocationPage', segment: 'inventorylocationPage' },





      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    SignupPage,
    TabsPage,
    ContactPage,
    StatistiquePage,
    InventoryPage,
    ArticlesPage,
    ParametrePage,
    HelpPage,
    CodeBarPage,
    RetrievePasswordPage,
    ArticleFormePage,
    InventoryDetailsPage,
    InventoryFormePage,
    CategoryPage,
    NetworkPage,
    InventoryStatistiquePage,
    ArticlesNotInventoryPage,
    InventorylocationPage,
    PopoverPage,
    PopoverPageArticle,
    PopoverPageInventory,
    PopoverPageParametre,
    PopoverPageStatistic

  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    Toast,
    InAppBrowser,
    SplashScreen,
    AdminService,
    UserService,
    InventoryService,
    BarcodeScanner,
    ParametreService,
    SharedProvider,
    LocalArticleProvider,
    LocalArticleInventoryProvider,
    LocalInventoryProvider,
    LocalMagasinProvider,
    LocalParametreProvider,
    LocalUserProvider,
    LocalStatisticsProvider,
    ArticleService,
    HttpClient,
    ConnectionService,
    ArticleInventoryService,
    StatisticsService,
    InventoryStatisticsService,
    createDataBaseProvider,
    SqlLiteDatabaseProvider,
    InventorylocationPage,
    ArticlesNotInventoryPage,
    Geolocation,
    LocalisationProvider
  ]
})
export class AppModule { }
