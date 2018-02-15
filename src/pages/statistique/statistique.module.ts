import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatistiquePage } from './statistique';

@NgModule({
  declarations: [
    StatistiquePage,
  ],
  imports: [
    IonicPageModule.forChild(StatistiquePage),
  ],
})
export class StatistiquePageModule {}
