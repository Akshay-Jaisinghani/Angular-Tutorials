import { Component, OnInit } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  currentUser;
  constructor(public studentTestService: StudentTestService, private appService: AppService,private router: Router) {
    this.testDuration = this.studentTestService.currentTestDuration * 60 * 60;
    this.currentUser = this.appService.currentUserValue;
  }
  testDuration;
  ngOnInit(): void {
  }

  submit() {
    this.studentTestService.submitTest(this.appService.currentUserValue.id, this.studentTestService.currentTestId).subscribe(
      (res) => {
        console.log(res);
      },
      error => {
        console.log(error);
      },
      () => {
        this.router.navigateByUrl("result/" + this.studentTestService.currentTestResultId);
      })
  }

}
