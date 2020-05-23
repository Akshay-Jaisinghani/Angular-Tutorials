import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassRoomComponent } from './feature/class-room/class-room.component';
import { StudentComponent } from './feature/student/student.component';
import { LogInComponent } from './core/login/login.component';
import { TestComponent } from './feature/test/test.component';


const routes: Routes = [
  { path: 'class-room', component: ClassRoomComponent },
  { path: 'student', component: StudentComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LogInComponent },
  { path: '', pathMatch: "full", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
