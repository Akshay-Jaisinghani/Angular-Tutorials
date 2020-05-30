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

  notStartedTests;
  inProgressTests;
  completedTest;
  currentStudentDetails;

  constructor(private router: Router, private studentTestService: StudentTestService, private appService: AppService) { }

  ngOnInit(): void {
    //Date.parse('01/01/2011 10:20:45') > Date.parse('01/01/2011 5:10:10')
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
        }, (error) => {
          console.log("Error", error);
        }, () => {
          this.studentTestService.getStudentTest("IN PROGRESS").subscribe((data) => {
            this.inProgressTests = data;
            console.log(new Date(this.inProgressTests[0].testStartTime * 1000));
          }, (error) => {
            console.log("Error", error);
          }, () => {
            this.studentTestService.getStudentTest("COMPLETED").subscribe((data) => {
              this.completedTest = data;
            }, (error) => {
              console.log("Error", error);
            }, () => {
            });
          });
        });
      })
  }

  redirectToTest(testId,duration) {
    this.studentTestService.currentTestDuration = Number(duration);
    this.router.navigateByUrl("test/"+ testId);
  }
}
