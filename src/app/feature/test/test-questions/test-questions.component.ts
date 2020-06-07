import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";

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
  answerStatusEnum = {
    0: "question-number-button",
    1: "not-answered-class",
    2: "marked-for-review-class",
    3: "answered-and-marked-for-review-class",
    4: "answered-class"
  }

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
      if (this.studentTestService.currentTestStatus == "IN PROGRESS") {
        this.getTestResultAnswerResponse();
      } else {
        this.studentTestService.notVisited = this.studentTestService.allTestQuestions.length;
        this.isLoading = false;
      }     
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
    document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "answered-class";
    if (this.studentTestService.getAnswer().length==0) {
      this.studentTestService.notVisited = this.studentTestService.notVisited - 1;
      this.studentTestService.answered = this.studentTestService.answered + 1;
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
    if (this.studentTestService.getAnswer().length==0) {
      this.studentTestService.notVisited = this.studentTestService.notVisited - 1;
      this.studentTestService.answered = this.studentTestService.answered + 1;
    }
    this.studentTestService.currentQuestionNumber = this.studentTestService.currentQuestionNumber + 1;
    this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(this.studentTestService.currentQuestionNumber);

    // if (this.studentTestService.notVisited > 0) {
    //     this.studentTestService.notVisited = this.studentTestService.notVisited - 1;
    // }    
    // if (this.studentTestService.notAnswered > 0) {
    //   this.studentTestService.notAnswered = this.studentTestService.notAnswered - 1;
    // }
    // if (this.studentTestService.answered < this.studentTestService.allTestQuestions.length) {
    //   this.studentTestService.answered = this.studentTestService.answered + 1;
    // }
    // if (this.studentTestService.notAnswered > 0) {
    //   this.studentTestService.notAnswered = this.studentTestService.allTestQuestions.length - this.studentTestService.allTestAnswers.length;
    // }
    // if (this.studentTestService.answered <= this.studentTestService.allTestQuestions.length) {
    //   this.studentTestService.answered = this.studentTestService.allTestAnswers.length;
    // }
  }

  back() {
    this.studentTestService.currentQuestionNumber = this.studentTestService.currentQuestionNumber - 1;
    //let answerArr = this.studentTestService.getAnswer();
    //this.patchValue(answerArr);
    this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(this.studentTestService.currentQuestionNumber);
    this.isAnswerSet();
  }

  next() {
    this.clearFormArray();
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
      //this.changeTestResponseClass
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
      let responseArr = this.studentTestService.getCurrentTestResponse().responseList;
      if (responseArr[0] != null) {
        this.setValue(responseArr);
      }
    }
  }

  getTestResultAnswerResponse() {
    let $this =this;
    this.studentTestService.getTestResultAnswerResponse().subscribe((data => {
      this.studentTestService.testResultAnswerResponseArr = data;
    }), (error) => {

    }, () => {
      this.setDBAnswer();
      this.studentTestService.testResultAnswerResponseArr.forEach(function(item){
        document.getElementsByClassName("question-number-class")[0].children[item.questionNumber - 1].className = $this.answerStatusEnum[item.status];
      })
      let setAnswerStatusCount = _.groupBy(_.map(this.studentTestService.testResultAnswerResponseArr, 'status'));      
      this.studentTestService.notVisited = setAnswerStatusCount[0] ? setAnswerStatusCount[0].length : 0;
      this.studentTestService.notAnswered = setAnswerStatusCount[1] ? setAnswerStatusCount[1].length : 0;
      this.studentTestService.markedForReview = setAnswerStatusCount[2] ? setAnswerStatusCount[2].length : 0;
      this.studentTestService.answeredAndMarkedForReview = setAnswerStatusCount[3] ? setAnswerStatusCount[3].length : 0;
      this.studentTestService.answered = setAnswerStatusCount[4] ? setAnswerStatusCount[4].length : 0;
      this.isLoading = false;
    });
  }

}
