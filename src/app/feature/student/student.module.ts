import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
