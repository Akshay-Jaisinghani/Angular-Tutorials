import { Component, OnInit } from '@angular/core';
import { PlatformService } from 'src/app/service/platform.service';
import { StudentTestService } from 'src/app/service/student-test.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  testResultId: number;
  testData = [
  {questionNumber: 1, yourResponse: 'B', correctAnswer: "C", marks: 0, status: "wrong"}]
  displayedColumns: string[] = ['questionNumber', 'yourResponse', 'correctAnswer', 'marks', 'status'];
  dataSource = this.testData;

  constructor(private platformService: PlatformService, public studentTestService: StudentTestService,private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.testResultId = Number(params.get('testResultId'));
    });
    this.studentTestService.getTestResult(this.testResultId).subscribe(
      data => {
        this.studentTestService.totalMarksForTest = data.totalMarks.toFixed(2);
      },
      error => {
        console.log(error);
      }
    )
  }

  navigateToHome() {
    this.router.navigateByUrl("student");
  }

}
