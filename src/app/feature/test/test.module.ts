import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { ResponseComponent } from './response/response.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { StudentDetailsComponent } from './student-details/student-details.component';



@NgModule({
  declarations: [TestComponent, ResponseComponent, TestQuestionsComponent, StudentDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TestModule { }
