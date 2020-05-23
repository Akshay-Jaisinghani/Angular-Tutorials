import { Component, OnInit } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  totalQuestions;
  notVisited;
  notAnswered;
  answered;
  markedForReview;
  answeredAndMarkedForReview;

  constructor(public studentTestService: StudentTestService) { }

  ngOnInit(): void {
    this.notVisited = this.studentTestService.notVisited;
    this.notAnswered = this.studentTestService.notAnswered;
    this.answered = this.studentTestService.answered;
    this.markedForReview = this.studentTestService.markedForReview;
    this.answeredAndMarkedForReview = this.studentTestService.answeredAndMarkedForReview;

  }

  goToQuestionNumber(questionNumber) {
    this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(questionNumber - 1);
    this.studentTestService.currentQuestionNumber = questionNumber - 1;
  }
}
