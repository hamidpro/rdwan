import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryFormePage } from './inventory-forme';

@NgModule({
  declarations: [
    InventoryFormePage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryFormePage),
  ],
})
export class InventoryFormePageModule {}
