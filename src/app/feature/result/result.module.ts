import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ResultModule { }
