import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StudentTestService } from 'src/app/service/student-test.service';
import { AppService } from 'src/app/service/app.service';
import { CountdownComponent } from 'ngx-countdown';

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
  @ViewChild('cd', { static: false }) public countdown: CountdownComponent;

  fireEvent(event,obj){
    if (event.action === "done") {
      obj.enableStartTestButton = true;
    }
  }

  constructor(private router: Router, private studentTestService: StudentTestService, private appService: AppService) { }

  ngOnInit(): void {
    let currentdateTime = Date.now();
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
            this.notStartedTests[i].enableStartTestButton = (this.notStartedTests[i].testStartTime <= currentdateTime && currentdateTime <= this.notStartedTests[i].testEndTime);
            this.notStartedTests[i].countDown = this.notStartedTests[i].enableStartTestButton ? undefined : (this.notStartedTests[i].testStartTime - currentdateTime)/1000;
            this.notStartedTests[i].testStartTime = ((new Date(this.notStartedTests[i].testStartTime)).toString()).slice(0,24);
            this.notStartedTests[i].testEndTime = ((new Date(this.notStartedTests[i].testEndTime)).toString()).slice(0,24);
          }
        }, (error) => {
          console.log("Error", error);
        }, () => {
          this.studentTestService.getStudentTest("IN PROGRESS").subscribe((data) => {
            this.inProgressTests = data;
            for (var i = 0; i < this.inProgressTests.length; i++) {
              this.inProgressTests[i].startTest = currentdateTime == this.inProgressTests[i].testStartTime && currentdateTime < this.inProgressTests[i].testEndTime;
              this.inProgressTests[i].testStartTime = ((new Date(this.inProgressTests[i].testStartTime)).toString()).slice(0,24);
              this.inProgressTests[i].testEndTime = ((new Date(this.inProgressTests[i].testEndTime)).toString()).slice(0,24);
            }
          }, (error) => {
            console.log("Error", error);
          }, () => {
            this.studentTestService.getStudentTest("COMPLETED").subscribe((data) => {
              this.completedTest = data;
              for (var i = 0; i < this.completedTest.length; i++) {
                this.completedTest[i].startTest = currentdateTime == this.completedTest[i].testStartTime && currentdateTime < this.completedTest[i].testEndTime;
                this.completedTest[i].testStartTime = ((new Date(this.completedTest[i].testStartTime)).toString()).slice(0,24);
                this.completedTest[i].testEndTime = ((new Date(this.completedTest[i].testEndTime)).toString()).slice(0,24);
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

  showResult(testResultId) {
    this.router.navigateByUrl("result/" + testResultId);
  }
}
