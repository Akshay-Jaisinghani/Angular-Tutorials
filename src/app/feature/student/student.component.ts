import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentTestService } from 'src/app/service/student-test.service';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  notStartedTests = [];
  inProgressTests = [];
  completedTest = [];
  currentStudentDetails;


  constructor(private router: Router, private studentTestService: StudentTestService, private appService: AppService) { }

  ngOnInit(): void {
    let currentdateTime = Math.round(Date.now() / 1000);
    this.studentTestService.getStudentDetails().subscribe((data) => {
      this.currentStudentDetails = data;    
      let user = this.appService.currentUserValue; 
      user = { ...user, ...this.currentStudentDetails };
      this.appService.currentUserSubject.next(user);
    },
      error => {
        console.log(error);
      },
      () => {
        this.studentTestService.getStudentTest("NOT STARTED").subscribe((data) => {
          this.notStartedTests = data;
          for (var i = 0; i < this.notStartedTests.length; i++) {
            this.notStartedTests[i].startTest = currentdateTime == this.notStartedTests[i].testStartTime && currentdateTime < this.notStartedTests[i].testEndTime;
            this.notStartedTests[i].testStartTime = (new Date(this.notStartedTests[i].testStartTime)).toUTCString();
            this.notStartedTests[i].testEndTime = (new Date(this.notStartedTests[i].testEndTime)).toUTCString();
          }
        }, (error) => {
          console.log("Error", error);
        }, () => {
          this.studentTestService.getStudentTest("IN PROGRESS").subscribe((data) => {
            this.inProgressTests = data;
            for (var i = 0; i < this.inProgressTests.length; i++) {
              this.inProgressTests[i].startTest = currentdateTime == this.inProgressTests[i].testStartTime && currentdateTime < this.inProgressTests[i].testEndTime;
              this.inProgressTests[i].testStartTime = (new Date(this.inProgressTests[i].testStartTime)).toUTCString();
              this.inProgressTests[i].testEndTime = (new Date(this.inProgressTests[i].testEndTime)).toUTCString();
            }
          }, (error) => {
            console.log("Error", error);
          }, () => {
            this.studentTestService.getStudentTest("COMPLETED").subscribe((data) => {
              this.completedTest = data;
              for (var i = 0; i < this.completedTest.length; i++) {
                this.completedTest[i].startTest = currentdateTime == this.completedTest[i].testStartTime && currentdateTime < this.completedTest[i].testEndTime;
                this.completedTest[i].testStartTime = (new Date(this.completedTest[i].testStartTime)).toUTCString();
                this.completedTest[i].testEndTime = (new Date(this.completedTest[i].testEndTime)).toUTCString();
              }
            }, (error) => {
              console.log("Error", error);
            }, () => {
            });
          });
        });
      })
  }

  redirectToTest(testId,duration,testResultId,testStatus) {
    this.studentTestService.currentTestDuration = Number(duration);
    this.studentTestService.currentTestResultId = testResultId;
    this.studentTestService.currentTestStatus = testStatus;
    this.router.navigateByUrl("test/"+ testId);
  }
}
