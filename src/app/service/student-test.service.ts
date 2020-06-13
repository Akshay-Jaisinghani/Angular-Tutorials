import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from './app.service';
import { PlatformService } from './platform.service';
import { BehaviorSubject } from 'rxjs';



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
  currentQuestionStartTime = 0;
  currentQuestionEndTime = 0;

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

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
    let duration = this.currentQuestionStartTime - this.currentQuestionEndTime;
    if (this.currentQuestionObj.questionType === 1) {
      currentAnswerObj.responseOptionsList = response.optionsArray;
    } else if (response !== '' && response.selectedOption !== '') {
      currentAnswerObj.responseOptionsList[0] = response.selectedOption;
    } else if (response !== '' && response.selectedOption === '') {
      currentAnswerObj.responseOptionsList[0] = response.selectedOption;
    }
    currentAnswerObj.status = status;
    currentAnswerObj.duration = duration / 1000;
    this.currentQuestionStartTime = 0;
    this.currentQuestionEndTime = 0;
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