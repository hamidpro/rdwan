import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryStatistiquePage } from './inventory-statistique';

@NgModule({
  declarations: [
    InventoryStatistiquePage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryStatistiquePage),
  ],
})
export class InventoryStatistiquePageModule {}
