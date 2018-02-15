import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleFormePage } from './article-forme';

@NgModule({
  declarations: [
    ArticleFormePage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleFormePage),
  ],
})
export class ArticleFormePageModule {}
