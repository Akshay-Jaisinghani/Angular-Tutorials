import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from './app.service';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class StudentTestService {

  currentQuestionNumber = 0;
  allTestQuestions;
  allTestAnswers = [];
  currentQuestionObj;
  notVisited;
  notAnswered;
  answered = 0;
  markedForReview = 0;;
  answeredAndMarkedForReview = 0;
  totalQuestionsCount;
  serviceform;
  currentTestDuration;
  currentTestId;
  currentTestResultId;
  currentTestName;
  submitTestObj = {
    test: {
      id: 0
    },
    student: {
      id: 0
    },
    id: 0
  }
  testResultAnswerResponseArr;
  totalMarksForTest;
  currentTestStatus;



  constructor(private http: HttpClient, private appService: AppService, private platformService: PlatformService) { }

  getHttpOption() {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token
      })
    };
    return httpOptions;
  }

  getTestQuestions(testId: Number) {
    return this.platformService.httpGet(this.platformService.getTestQuestionsUrl() + testId, this.getHttpOption());
  }

  getCurrentQuestion(currentQuestionNumber) {
    this.currentQuestionObj = this.allTestQuestions[currentQuestionNumber];
    return this.currentQuestionObj;
  }

  saveResponse(response, status) {
    let currentAnswerObj = this.allTestAnswers[this.currentQuestionNumber];
    if (this.currentQuestionObj.questionType === 1) {
      currentAnswerObj.responseOptionsList = response.optionsArray;
    } else if (response !== '' && response.selectedOption !== '') {
      currentAnswerObj.responseOptionsList[0] = response.selectedOption;
    } else if (response !== '' && response.selectedOption === '') {
      currentAnswerObj.responseOptionsList[0] = null;
    }
    currentAnswerObj.status = status;
    return this.platformService.httpPost(this.platformService.getCurrentQuestionAnswerUrl(), currentAnswerObj, this.getHttpOption());
  }

  submitTest() {
    this.submitTestObj.student.id = this.appService.currentUserValue.id;
    this.submitTestObj.test.id = this.currentTestId;
    this.submitTestObj.id = this.currentTestResultId;
    return this.platformService.httpPost(this.platformService.getSubmitTestUrl(), this.submitTestObj, this.getHttpOption());
  }

  getCurrentQuestionResponse(answerObj) {
    let obj = answerObj.find(item => {
      return item.question.id == this.currentQuestionObj.questionId;
    })
    return obj;
  }

  getStudentTest(testStatus) {
    return this.platformService.httpGet(this.platformService.getTestForStudentUrl() + testStatus, this.getHttpOption());
  }

  getStudentDetails() {
    return this.platformService.httpGet(this.platformService.getStudentDetailsUrl(), this.getHttpOption());
  }

  setTestStatus(testResultId) {
    let obj = {
      testResultId: testResultId
    }
    this.platformService.httpPost(this.platformService.getSetTestStatusUrl(), obj, this.getHttpOption()).subscribe((res) => {
    })
  }

  getTestResult(testResultId) {
    return this.platformService.httpGet(this.platformService.getTestResultUrl() + testResultId, this.getHttpOption());
  }

  getTestResultAnswerResponse() {
    return this.platformService.httpGet(this.platformService.getTestResultAnswerResponseUrl() + this.currentTestId, this.getHttpOption());
  }

}