import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class StudentTestService {

  serviceURL = {
    testQuestions: '/v1/question/test/', // /v1/question/test/{testId} ///getQuestionsForTest/
    currentQuestionAnswer: '/v1/testResultAnswer/save ', // /v1/testResultAnswer/save  ///savetestResultAnswer
    submitTest: '/v1/testResult/save', // /v1/testResult/save ///saveStudentTestResult
    getTestForStudent: '/v1/test/student/'
  }

  currentQuestionNumber = 0;
  allTestQuestions;
  allTestAnswers = [];
  currentQuestionObj;
  

  submitTestObj = {
    test: {
      id: 0
    },
    student: {
      id: 0
    }
  }

  notVisited;
  notAnswered;
  answered = 0;
  markedForReview = 0;;
  answeredAndMarkedForReview = 0;
  totalQuestionsCount;
  serviceform;
  token;
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   })
  // };
  httpOptions;
  apiUrl: String;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    console.log(this.token);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '+ this.token
      })
    };
  }

  getTestQuestions(testId: Number) {
    return this.http.get<any>(this.apiUrl + this.serviceURL.testQuestions + testId, this.httpOptions);
  }

  getQuestion(currentQuestionNumber) {
    this.currentQuestionObj = this.allTestQuestions[currentQuestionNumber];
    return this.currentQuestionObj;
  }

  saveResponse(response) {
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
      responseOptionsList: []
    }
    currentAnswerObj.test.id = 1;
    currentAnswerObj.student.id = 1;
    currentAnswerObj.question.id = this.currentQuestionObj.questionId;
    if (this.currentQuestionObj.questionType == 1) {
      currentAnswerObj.responseOptionsList = response.optionsArray;
    } else {
      currentAnswerObj.responseOptionsList.push(response.selectedOption);
    }
    let url = this.apiUrl + this.serviceURL.currentQuestionAnswer;
    this.http.post<any>(url, currentAnswerObj, this.httpOptions).subscribe((res) => {
      console.log(res);
    })

    var duplicateAnswers = this.allTestAnswers.filter((answer) => answer.question.id === currentAnswerObj.question.id);
    if (duplicateAnswers.length>0){
      duplicateAnswers.forEach(item => {
        let index = this.allTestAnswers.findIndex(x => x.question.id === currentAnswerObj.question.id);
        this.allTestAnswers.splice(index,1);
      })     
    }
    this.allTestAnswers.push(currentAnswerObj);
  }
  

  submitTest(studentId, testId) {
    this.submitTestObj.student.id = studentId;
    this.submitTestObj.test.id = testId;
    this.http.post<any>(this.apiUrl + this.serviceURL.submitTest, this.submitTestObj, this.httpOptions).subscribe((res) => {
      console.log(res);
    })
  }

  getAnswer() {
    let questionObj = this.getQuestion(this.currentQuestionNumber);
    let questionId = questionObj['questionId'];
    let answerArr;
    this.allTestAnswers.forEach((answer) => {
      if(answer.question.id == questionId) {
        answerArr = answer.responseOptionsList;
      }
    })
    return answerArr;
  }

  getStudentTest(studId) {
    return this.http.get<any>(this.apiUrl + this.serviceURL.getTestForStudent + studId, this.httpOptions);
  }

}

