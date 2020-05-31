import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassRoomComponent } from './feature/class-room/class-room.component';
import { StudentComponent } from './feature/student/student.component';
import { LogInComponent } from './core/login/login.component';
import { TestComponent } from './feature/test/test.component';
import { AuthGuard } from './core/auth.guard';
import { ResultComponent } from './feature/result/result.component';


const routes: Routes = [
  { path: 'class-room', component: ClassRoomComponent, canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'test/:id', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent },
  { path: '', pathMatch: "full", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
