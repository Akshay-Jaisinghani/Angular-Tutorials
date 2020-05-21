import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassRoomComponent } from './feature/class-room/class-room.component';
import { StudentComponent } from './feature/student/student.component';
import { LogInComponent } from './core/login/login.component';
import { TestComponent } from './feature/test/test.component';
import { ResponseComponent } from './feature/test/response/response.component';
import { TestQuestionsComponent } from './feature/test/test-questions/test-questions.component';


const routes: Routes = [
  // Redirect to login
 // { path: '**', redirectTo: "login" },
  { path: 'class-room', component: ClassRoomComponent },
  { path: 'student', component: StudentComponent },
  { path: 'login', component: LogInComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
