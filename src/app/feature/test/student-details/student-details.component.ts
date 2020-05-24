import { Component, OnInit } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  constructor(public studentTestService: StudentTestService) { }

  ngOnInit(): void {
  }

  submit() {
    let studentId = 1;
    let testId = 1;
    this.studentTestService.submitTest(studentId, testId);
  }

}
