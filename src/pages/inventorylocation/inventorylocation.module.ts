import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventorylocationPage } from './inventorylocation';

@NgModule({
  declarations: [
    InventorylocationPage,
  ],
  imports: [
    IonicPageModule.forChild(InventorylocationPage),
  ],
})
export class InventorylocationPageModule {}
