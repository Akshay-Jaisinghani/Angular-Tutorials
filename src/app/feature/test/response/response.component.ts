import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  totalQuestions = Array.from(new Array(50), (x, i) => i + 1);
  constructor() { }

  ngOnInit(): void {
  }

  saveAndNext() {
    document.getElementsByClassName("question-number-class")[0].children[0].className = "answered-class";
  }

  saveAndMArkForReview() {
    document.getElementsByClassName("question-number-class")[0].children[1].className = "answered-and-marked-for-review-class";
  }

  markForReviewAndNext() {
    document.getElementsByClassName("question-number-class")[0].children[2].className = "marked-for-review-class";
  }

  clearResponse() {
    document.getElementsByClassName("question-number-class")[0].children[1].className = "question-number-button";
  }
}
