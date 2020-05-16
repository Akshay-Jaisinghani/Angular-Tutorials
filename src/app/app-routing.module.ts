import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ClassRoomComponent } from './feature/class-room/class-room.component';
import { StudentComponent } from './feature/student/student.component';
import { LogInComponent } from './core/login/login.component';
import { TestComponent } from './feature/test/test.component';
import { ResponseComponent } from './feature/test/response/response.component';


const routes: Routes = [
  { path: '', component: LogInComponent},
  { path: 'class-room', component: ClassRoomComponent },
  { path: 'student', component: StudentComponent },
  // otherwise redirect to home
 // { path: '**', redirectTo: "login" },
  { path: 'login', component: LogInComponent },
  { path: 'test', component: TestComponent },
  { path: 'test/response', component: ResponseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
