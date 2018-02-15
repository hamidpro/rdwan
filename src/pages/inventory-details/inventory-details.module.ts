import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryDetailsPage, PopoverPage } from './inventory-details';

@NgModule({
  declarations: [
    InventoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryDetailsPage),
  ],
  entryComponents: [
    PopoverPage
  ]
})

export class InventoryDetailsPageModule {}
