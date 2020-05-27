import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  constructor(public studentTestService: StudentTestService) { }
  @Output() questionClicked = new EventEmitter<any>();
  formState;

  ngOnInit(): void {
  }

  goToQuestionNumber(questionNumber) {
    this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(questionNumber - 1);
    this.studentTestService.currentQuestionNumber = questionNumber - 1;
    if (this.studentTestService.notVisited > 0) {
      this.studentTestService.notVisited = this.studentTestService.notVisited - 1;
    }
    this.questionClicked.emit();
  }


}
