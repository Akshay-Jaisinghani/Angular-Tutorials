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
    // Check if current question number status is not visited
    if (this.studentTestService.allTestAnswers[this.studentTestService.currentQuestionNumber].status === 0) {
      // send status as 1 - not answered class
      this.studentTestService.allTestAnswers[this.studentTestService.currentQuestionNumber].status = 1;
      this.studentTestService.saveResponse('', 1).subscribe(
      data => { },
      error => { },
      () => {
        document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "not-answered-class";
        this.studentTestService.currentQuestionObj = this.studentTestService.getCurrentQuestion(questionNumber - 1);
        this.studentTestService.currentQuestionNumber = questionNumber - 1;
        this.questionClicked.emit();
      });
    } else {
      this.studentTestService.currentQuestionObj = this.studentTestService.getCurrentQuestion(questionNumber - 1);
      this.studentTestService.currentQuestionNumber = questionNumber - 1;
      this.questionClicked.emit();
    }
  }


}
