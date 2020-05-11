import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassRoomModule } from './feature/class-room/class-room.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentModule } from './feature/student/student.module';
import { MaterialModule } from './material.module';
import { LogInModule } from './core/login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    ClassRoomModule,
    StudentModule,
    LogInModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
