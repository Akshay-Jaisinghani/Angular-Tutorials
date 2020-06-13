import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';
import { AppService } from 'src/app/service/app.service';
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
  imgReloadCount = 0;
  isImgReloadErrorMsg = false;

  constructor(public studentTestService: StudentTestService, private formBuilder: FormBuilder, private appService: AppService, private activatedRoute: ActivatedRoute) {
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
    this.currentQuestionStartTime = 0;
    this.currentQuestionEndTime = 0;
    let $this = this;
    this.studentTestService.allTestAnswers = [];
    let studentId = this.appService.currentUserValue.id;
    this.studentTestService.getTestQuestions(this.studentTestService.currentTestId).subscribe((data) => {
      this.studentTestService.allTestQuestions = data;
      this.studentTestService.allTestQuestions.forEach(function (item) {
        let currentAnswerObj = {
          test: {
            id: $this.studentTestService.currentTestId
          },
          student: {
            id: studentId
          },
          question: {
            id: item.questionId
          },
          responseOptionsList: [],
          status: 0
        }
        $this.studentTestService.allTestAnswers.push(currentAnswerObj);
      })
    }, (error) => {
      console.log("Error", error);
    }, () => {
      this.studentTestService.currentQuestionObj = this.studentTestService.getCurrentQuestion(this.studentTestService.currentQuestionNumber);
      this.studentTestService.totalQuestionsCount = Array.from(new Array(this.studentTestService.allTestQuestions.length), (x, i) => i + 1);
      if (this.studentTestService.currentTestStatus == "IN PROGRESS") {
        this.getTestResultAnswerResponse();
      } else {
        this.updateStatusCount($this.studentTestService.allTestAnswers);
      }
      this.isLoading = false;
      this.isImgReloadErrorMsg = false;
      this.studentTestService.changeMessage("currentTime");
      console.log(this.studentTestService.currentQuestionStartTime);
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
    this.studentTestService.changeMessage("currentTime");
    console.log(this.studentTestService.currentQuestionEndTime);
    this.studentTestService.saveResponse(this.form.value, status).subscribe(
      data => { },
      error => { },
      () => {
        this.clearFormArray();
        this.gotoNextQuestion();
        this.studentTestService.changeMessage("currentTime");
        console.log(this.studentTestService.currentQuestionStartTime);
      })
  }

  saveAndMArkForReview() {
    let status = 3;
    document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "answered-and-marked-for-review-class";
    this.studentTestService.changeMessage("currentTime");
    console.log(this.studentTestService.currentQuestionEndTime);
    this.studentTestService.saveResponse(this.form.value, status).subscribe(
      data => { },
      error => { },
      () => {
        this.clearFormArray();
        this.gotoNextQuestion();
        this.studentTestService.changeMessage("currentTime");
        console.log(this.studentTestService.currentQuestionStartTime);
      })
  }

  markForReviewAndNext() {
    let currentAnswerObj = this.studentTestService.allTestAnswers[this.studentTestService.currentQuestionNumber];
    currentAnswerObj.status = 2;
    this.studentTestService.saveResponse(this.form.value, currentAnswerObj.status).subscribe(
        data => { },
        error => { },
        () => {
          document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "marked-for-review-class";
          this.gotoNextQuestion();
        })
  }

  clearResponse() {
    if (this.form.value.selectedOption != '') {
      let currentAnswerObj = this.studentTestService.allTestAnswers[this.studentTestService.currentQuestionNumber];
      currentAnswerObj.status = 1;
      this.clearFormArray();
      this.studentTestService.saveResponse(this.form.value, currentAnswerObj.status).subscribe(
        data => { },
        error => { },
        () => {
          document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "not-answered-class";
        })
    }
  }

  gotoNextQuestion() {
    if (this.studentTestService.currentQuestionNumber < (this.studentTestService.allTestQuestions.length - 1)) {
      this.studentTestService.currentQuestionNumber = this.studentTestService.currentQuestionNumber + 1;
      this.studentTestService.currentQuestionObj = this.studentTestService.getCurrentQuestion(this.studentTestService.currentQuestionNumber);
      this.updateStatusCount(this.studentTestService.allTestAnswers);
      this.setNextQuestionAnswer();
    }
  }

  back() {
    if ((this.form.value.selectedOption === '' || !this.form.value.selectedOption) && this.studentTestService.allTestAnswers[this.studentTestService.currentQuestionNumber].status === 0) {
      document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "not-answered-class";
      let currentAnswerObj = this.studentTestService.allTestAnswers[this.studentTestService.currentQuestionNumber];
      currentAnswerObj.status = 1;
      this.studentTestService.saveResponse(this.form.value, currentAnswerObj.status).subscribe(
        data => { },
        error => { },
        () => {
          this.studentTestService.currentQuestionNumber = this.studentTestService.currentQuestionNumber - 1;
          this.studentTestService.currentQuestionObj = this.studentTestService.getCurrentQuestion(this.studentTestService.currentQuestionNumber);
          this.updateStatusCount(this.studentTestService.allTestAnswers);
          this.setNextQuestionAnswer();
        })
    } else {
      this.studentTestService.currentQuestionNumber = this.studentTestService.currentQuestionNumber - 1;
      this.studentTestService.currentQuestionObj = this.studentTestService.getCurrentQuestion(this.studentTestService.currentQuestionNumber);
      this.setNextQuestionAnswer();
    }

  }

  next() {
    if ((this.form.value.selectedOption === '' || !this.form.value.selectedOption) && this.studentTestService.allTestAnswers[this.studentTestService.currentQuestionNumber].status === 0) {
      document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "not-answered-class";
      let currentAnswerObj = this.studentTestService.allTestAnswers[this.studentTestService.currentQuestionNumber];
      currentAnswerObj.status = 1;
      this.studentTestService.saveResponse(this.form.value, currentAnswerObj.status).subscribe(
        data => { },
        error => { },
        () => {
          this.gotoNextQuestion();
        })
    } else {
      this.gotoNextQuestion();
    }
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

  setNextQuestionAnswer() {
    let answerArr = this.studentTestService.getCurrentQuestionResponse(this.studentTestService.allTestAnswers);
    answerArr = answerArr ? answerArr.responseOptionsList : answerArr;
    this.setValue(answerArr);
  }

  setValue(answerArr) {
    if (this.studentTestService.currentQuestionObj['questionType'] == 1) {
      this.form.controls['optionsArray'].setValue(answerArr);
    }
    else {
      let answer = answerArr ? answerArr[0] : answerArr;
      this.form.controls['selectedOption'].setValue(answer);
    }
  }

  getTestResultAnswerResponse() {
    let $this = this;
    this.studentTestService.getTestResultAnswerResponse().subscribe((data => {
      this.studentTestService.testResultAnswerResponseArr = data;
    }), (error) => {

    }, () => {
      this.studentTestService.testResultAnswerResponseArr.forEach(function (item) {
        document.getElementsByClassName("question-number-class")[0].children[item.questionNumber - 1].className = $this.answerStatusEnum[item.status];
        $this.studentTestService.allTestAnswers[item.questionNumber - 1].status = item.status;
        $this.studentTestService.allTestAnswers[item.questionNumber - 1].responseOptionsList = item.responseList ? item.responseList : [];
      })
      this.setNextQuestionAnswer();
      this.updateStatusCount(this.studentTestService.allTestAnswers);
      this.isLoading = false;
      this.isImgReloadErrorMsg = false;
    });
  }

  updateStatusCount(obj) {
    let setAnswerStatusCount = _.groupBy(_.map(obj, 'status'));
    this.studentTestService.notVisited = setAnswerStatusCount[0] ? setAnswerStatusCount[0].length : 0;
    this.studentTestService.notAnswered = setAnswerStatusCount[1] ? setAnswerStatusCount[1].length : 0;
    this.studentTestService.markedForReview = setAnswerStatusCount[2] ? setAnswerStatusCount[2].length : 0;
    this.studentTestService.answeredAndMarkedForReview = setAnswerStatusCount[3] ? setAnswerStatusCount[3].length : 0;
    this.studentTestService.answered = setAnswerStatusCount[4] ? setAnswerStatusCount[4].length : 0;
  }

  reloadImage(event, imgSrc) {
    this.imgReloadCount = this.imgReloadCount + 1;
    if (this.imgReloadCount <= 3) {
      event.target.src = '';
      event.target.src = imgSrc;
    } else {
      this.isImgReloadErrorMsg = true;
    }
  }

  reloadPage() {
    this.isLoading = true;
    this.getTestQuestions();
  }
}