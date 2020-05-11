import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassRoomComponent } from './class-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [ClassRoomComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClassRoomModule { }
