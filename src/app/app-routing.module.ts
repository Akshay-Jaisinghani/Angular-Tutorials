import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ClassRoomComponent } from './feature/class-room/class-room.component';
import { StudentComponent } from './feature/student/student.component';
import { LogInComponent } from './core/login/login.component';


const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'class-room', component: ClassRoomComponent },
  { path: 'student', component: StudentComponent },
  // otherwise redirect to home
  // { path: '**', redirectTo: "login" },
  { path: 'login', component: LogInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
