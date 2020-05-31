import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassRoomModule } from './feature/class-room/class-room.module';
import { CountdownModule } from 'ngx-countdown';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentModule } from './feature/student/student.module';
import { MaterialModule } from './material.module';
import { LogInModule } from './core/login/login.module';
import { TestModule } from './feature/test/test.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/auth.guard';
import { ResultModule } from './feature/result/result.module';

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
    LogInModule,
    TestModule,
    HttpClientModule,
    CountdownModule,
    ResultModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
