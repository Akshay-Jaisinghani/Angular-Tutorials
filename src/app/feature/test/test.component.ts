import { Component, OnInit, ViewChild } from '@angular/core';
import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { StudentTestService } from 'src/app/service/student-test.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild(TestQuestionsComponent)
  private testQuestion: TestQuestionsComponent;
  hasInstructionsRead = false;
  currentTest;

  constructor(private studentTestService: StudentTestService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.studentTestService.currentTestId = Number(params.get('id'));
    });
    if (!this.studentTestService.currentTestResultId) {
      this.currentQuestionStartTime = 0;
      this.currentQuestionEndTime = 0;
      this.hasInstructionsRead = true;
      this.studentTestService.getStudentTest("IN PROGRESS").subscribe((data) => {
        let indexOfCurrentTest = _.indexOf(_.map(data,"testId"), this.studentTestService.currentTestId);
        this.currentTest = data[indexOfCurrentTest];
      }, (error) => {
        console.log("Error", error);
      }, () => {
        this.studentTestService.currentTestDuration = Number(this.currentTest.duration);
        this.studentTestService.currentTestResultId = this.currentTest.testResultId;
        this.studentTestService.currentTestStatus = this.currentTest.testStatus;
        this.studentTestService.currentTestName = this.currentTest.testName;
      })
    }
  }
  
  startTest() {
    this.hasInstructionsRead = true;
    this.currentQuestionStartTime = 0;
    this.currentQuestionEndTime = 0;
    this.studentTestService.setTestStatus(this.studentTestService.currentTestResultId);
  }

  questionClicked() {
    this.testQuestion.updateStatusCount(this.studentTestService.allTestAnswers);
    this.testQuestion.setNextQuestionAnswer();
  }
}