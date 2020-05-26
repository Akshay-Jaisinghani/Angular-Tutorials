import { Component, OnInit, ViewChild } from '@angular/core';
import { TestQuestionsComponent } from './test-questions/test-questions.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild(TestQuestionsComponent)
  private testQuestion: TestQuestionsComponent;

  constructor() { }

  ngOnInit(): void {
  }

  questionClicked() {
  console.log(this.testQuestion.form.value);
  this.testQuestion.isAnswerSet();
  
  }

 

}
