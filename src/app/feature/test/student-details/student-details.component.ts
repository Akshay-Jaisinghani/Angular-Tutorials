import { Component, OnInit } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  currentUser;
  constructor(public studentTestService: StudentTestService, private appService:AppService) {
    this.testDuration = this.studentTestService.currentTestDuration * 60 * 60;
    this.currentUser = this.appService.currentUserValue;
  }
  testDuration;
  ngOnInit(): void {
  }

  submit() {
    this.studentTestService.submitTest(this.appService.currentUserValue.id, this.studentTestService.currentTestId);
  }

}
