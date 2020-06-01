import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.scss']
})
export class TestQuestionsComponent implements OnInit {

  selectedOption;
  form: FormGroup;
  questionNo;
  isLoading = true;
  isDisabled: boolean = true;


  constructor(public studentTestService: StudentTestService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      optionsArray: this.formBuilder.array([]),
      selectedOption: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.getTestQuestions();
  }

  getTestQuestions() {
    this.studentTestService.getTestQuestions(this.studentTestService.currentTestId).subscribe((data) => {
      this.studentTestService.allTestQuestions = data;
    }, (error) => {
      console.log("Error", error);
    }, () => {
      this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(this.studentTestService.currentQuestionNumber);
      this.studentTestService.totalQuestionsCount = Array.from(new Array(this.studentTestService.allTestQuestions.length), (x, i) => i + 1);
      this.studentTestService.notVisited = this.studentTestService.allTestQuestions.length - 1;
      this.studentTestService.notAnswered = this.studentTestService.allTestQuestions.length;
      this.getTestResultAnswerResponse();

      this.isLoading = false;
    });
  }

  onCheckboxChange(e) {
    const optionsArray: FormArray = this.form.get('optionsArray') as FormArray;
    if (e.target.checked) {
      optionsArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      optionsArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          optionsArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  saveAndNext() {
    let status = 4;
    if (this.form.value.selectedOption == '') {
      document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "not-answered-class";
    } else {
      document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "answered-class";
    }
    this.studentTestService.saveResponse(this.form.value, status);
    this.changeTestResponseClass();
    this.clearFormArray();
    this.isAnswerSet();
  }

  saveAndMArkForReview() {
    let status = 3;
    document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "answered-and-marked-for-review-class";
    this.studentTestService.saveResponse(this.form.value, status);
    this.changeTestResponseClass();
    this.clearFormArray();
    this.isAnswerSet();
  }

  markForReviewAndNext() {
    let status = 2;
    document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "marked-for-review-class";
    this.changeTestResponseClass();
    this.studentTestService.markedForReview = this.studentTestService.markedForReview + 1;
    this.isAnswerSet();
  }

  clearResponse() {
    if (this.form.value.selectedOption != '') {
      document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "question-number-button";
      this.clearFormArray();
    }
  }

  changeTestResponseClass() {
    this.studentTestService.currentQuestionNumber = this.studentTestService.currentQuestionNumber + 1;
    this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(this.studentTestService.currentQuestionNumber);
    if (this.studentTestService.notVisited > 0) {
        this.studentTestService.notVisited = this.studentTestService.notVisited - 1;
    }    
    // if (this.studentTestService.notAnswered > 0) {
    //   this.studentTestService.notAnswered = this.studentTestService.notAnswered - 1;
    // }
    // if (this.studentTestService.answered < this.studentTestService.allTestQuestions.length) {
    //   this.studentTestService.answered = this.studentTestService.answered + 1;
    // }
    if (this.studentTestService.notAnswered > 0) {
      this.studentTestService.notAnswered = this.studentTestService.allTestQuestions.length - this.studentTestService.allTestAnswers.length;
    }
    if (this.studentTestService.answered <= this.studentTestService.allTestQuestions.length) {
      this.studentTestService.answered = this.studentTestService.allTestAnswers.length;
    }
  }

  back() {
    this.studentTestService.currentQuestionNumber = this.studentTestService.currentQuestionNumber - 1;
    //let answerArr = this.studentTestService.getAnswer();
    //this.patchValue(answerArr);
    this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(this.studentTestService.currentQuestionNumber);
    this.isAnswerSet();
  }

  next() {
    if (this.form.value.selectedOption == '') {
      document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "not-answered-class";
    }
    this.studentTestService.currentQuestionNumber = this.studentTestService.currentQuestionNumber + 1;
    this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(this.studentTestService.currentQuestionNumber);
    this.isAnswerSet();
  }

  clearFormArray() {
    let formArray = this.form.get('optionsArray') as FormArray;
    formArray.clear();
    let formControl = this.form.get('selectedOption') as FormControl;
    formControl.setValue('');
  }

  patchValue(answerArr) {
    if (this.studentTestService.currentQuestionObj['questionType'] == 1) {
      this.form.controls['optionsArray'].patchValue(answerArr);
    }
    else {
      let answer = answerArr[0];
      this.form.controls['selectedOption'].patchValue(answer);
    }
  }

  isAnswerSet() {
    if (this.studentTestService.getAnswer() != undefined) {
      this.setValue(this.studentTestService.getAnswer())
    } else if (this.studentTestService.currentTestStatus == "IN PROGRESS") {
      this.setDBAnswer();
    }
  }

  setValue(answerArr) {
    if (this.studentTestService.currentQuestionObj['questionType'] == 1) {
      this.form.controls['optionsArray'].setValue(answerArr);
    }
    else {
      let answer = answerArr[0];
      this.form.controls['selectedOption'].setValue(answer);
    }
  }

  setDBAnswer() {
    {
      let responseArr = this.getDbAnswer();
      if (responseArr[0] != null) {
        this.setValue(responseArr);
      }
    }
  }

  getTestResultAnswerResponse() {
    this.studentTestService.getTestResultAnswerResponse().subscribe((data => {
      this.studentTestService.testResultAnswerResponseArr = data;
    }), (error) => {

    }, () => {
      if (this.studentTestService.currentTestStatus == "IN PROGRESS") {
        this.setDBAnswer();
      }
    });
  }

  getDbAnswer() {
    return this.studentTestService.getCurrentTestResponse().responseList;
  }

}
