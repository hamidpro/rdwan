import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlesNotInventoryPage } from './articles-not-inventory';

@NgModule({
  declarations: [
    ArticlesNotInventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlesNotInventoryPage),
  ],
})
export class ArticlesNotInventoryPageModule {}
