import { Component, OnInit, ViewChild } from '@angular/core';
import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { StudentTestService } from 'src/app/service/student-test.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild(TestQuestionsComponent)
  private testQuestion: TestQuestionsComponent;
  hasInstructionsRead = false;
  constructor(private studentTestService: StudentTestService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.studentTestService.currentTestId = Number(params.get('id'));
    });
  }
  
  startTest() {
    this.hasInstructionsRead = true;
    this.studentTestService.setTestStatus(this.studentTestService.currentTestResultId);
  }

  questionClicked() {
    this.testQuestion.updateStatusCount(this.studentTestService.allTestAnswers);
    this.testQuestion.setNextQuestionAnswer();
  }
}