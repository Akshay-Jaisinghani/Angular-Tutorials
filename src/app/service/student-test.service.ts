import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class StudentTestService {
  serviceURL = {
    currentQuestionAnswer: 'v1/testResultAnswer/save ', // /v1/testResultAnswer/save  ///savetestResultAnswer
    submitTest: 'v1/testResult/save', // /v1/testResult/save ///saveStudentTestResult
    getTestResultAnswerResponse:'v1/testResultAnswer/response/testId/'
  }
  token;
  httpOptions;
  apiUrl: String;

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
  submitTestObj = {
    test: {
      id: 0
    },
    student: {
      id: 0
    },
    id:0
  }
  testResultAnswerResponseArr;
  totalMarksForTest;
  currentTestStatus;



  constructor(private http: HttpClient, private appService: AppService,private platformService: PlatformService){
    this.apiUrl = environment.apiUrl;
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  getTestQuestions(testId: Number) {
    return this.platformService.httpGet(this.platformService.getTestQuestionsUrl() + testId, this.httpOptions);
  }

  getQuestion(currentQuestionNumber) {
    this.currentQuestionObj = this.allTestQuestions[currentQuestionNumber];
    return this.currentQuestionObj;
  }

  saveResponse(response, status) {
    let currentAnswerObj = {
      test: {
        id: 0
      },
      student: {
        id: 0
      },
      question: {
        id: 0
      },
      responseOptionsList: [],
      status: Number
    }
    currentAnswerObj.test.id = this.currentTestId;
    currentAnswerObj.student.id = this.appService.currentUserValue.id;
    currentAnswerObj.question.id = this.currentQuestionObj.questionId;
    currentAnswerObj.status = status;
    if (this.currentQuestionObj.questionType == 1) {
      currentAnswerObj.responseOptionsList = response.optionsArray;
    } else {
      if(response.selectedOption != ''){
        currentAnswerObj.responseOptionsList.push(response.selectedOption);

      }
    }
    let url = this.apiUrl + this.serviceURL.currentQuestionAnswer;
    this.http.post<any>(url, currentAnswerObj, this.httpOptions).subscribe((res) => {
    })

    var duplicateAnswers = this.allTestAnswers.filter((answer) => answer.question.id === currentAnswerObj.question.id);
    if (duplicateAnswers.length > 0) {
      duplicateAnswers.forEach(item => {
        let index = this.allTestAnswers.findIndex(x => x.question.id === currentAnswerObj.question.id);
        this.allTestAnswers.splice(index, 1);
      })
    }
    if(response.selectedOption != ''){
    this.allTestAnswers.push(currentAnswerObj);
    }
  }


  submitTest(studentId, testId) {
    this.submitTestObj.student.id = this.appService.currentUserValue.id;
    this.submitTestObj.test.id = this.currentTestId;
    this.submitTestObj.id = this.currentTestResultId;
    return this.platformService.httpPost(this.apiUrl + this.serviceURL.submitTest, this.submitTestObj, this.httpOptions);
  }

  getAnswer() {
    let questionObj = this.getQuestion(this.currentQuestionNumber);
    let questionId = questionObj['questionId'];
    let answerArr;
    this.allTestAnswers.forEach((answer) => {
      if (answer.question.id == questionId) {
        answerArr = answer.responseOptionsList;
      }
    })
    return answerArr;
  }

  getStudentTest(testStatus) {
    return this.platformService.httpGet(this.platformService.getTestForStudentUrl() + testStatus, this.httpOptions);
  }

  getStudentDetails() {
    return this.platformService.httpGet(this.platformService.getStudentDetailsUrl(), this.httpOptions);
  }

  setTestStatus(testResultId) {
    let obj = {
      testResultId: testResultId
    }
    this.platformService.httpPost(this.platformService.getSetTestStatusUrl(), obj, this.httpOptions).subscribe((res) => {
    })
  }

  getTestResult(testResultId) {
    return this.platformService.httpGet(this.platformService.getTestResultUrl() + testResultId, this.httpOptions);
  }

  getTestResultAnswerResponse() {
    return this.http.get<any>(this.apiUrl + this.serviceURL.getTestResultAnswerResponse + this.currentTestId, this.httpOptions);
  }

  getCurrentTestResponse() {
    return this.testResultAnswerResponseArr.find(item => {return item.questionId==this.currentQuestionObj.questionId})
  }

}