import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeBarPage } from './code-bar';

@NgModule({
  declarations: [
    CodeBarPage,
  ],
  imports: [
    IonicPageModule.forChild(CodeBarPage),
  ],
})
export class CodeBarPageModule {}
