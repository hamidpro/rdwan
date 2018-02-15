import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpDetaillePage } from './help-detaille';

@NgModule({
  declarations: [
    HelpDetaillePage,
  ],
  imports: [
    IonicPageModule.forChild(HelpDetaillePage),
  ],
})
export class HelpDetaillePageModule {}
