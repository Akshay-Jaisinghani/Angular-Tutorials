import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentTestService {

  serviceURL = {
    testQuestions: '/getQuestionsForTest/',
    currentQuestionAnswer: '/savetestResultAnswer'
  }

  currentQuestionNumber = 0;
  allTestQuestions;
  allTestAnswers: [];
  currentQuestionObj;
  currentAnswerObj = {
    test : {
      id : 0
    },
    student : {
      id: 0
    },
    question : {
      id: 0
    },
    responseOptionsList : []
  }

  notVisited;
  notAnswered;
  answered = 0;
  markedForReview = 0;;
  answeredAndMarkedForReview = 0;
  totalQuestionsCount;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  apiUrl: String;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getTestQuestions(testId: Number) {
    return this.http.get<any>(this.apiUrl + this.serviceURL.testQuestions + testId);
  }

  getQuestion(currentQuestionNumber) {
    this.currentQuestionObj = this.allTestQuestions[currentQuestionNumber];
    return this.currentQuestionObj;
  }

  saveResponse(currentAnswerObj, response) {
     this.currentAnswerObj.test.id = 1;
     this.currentAnswerObj.student.id = 1;
     this.currentAnswerObj.question.id = currentAnswerObj.questionId;
     if(currentAnswerObj.questionType == 1) {
      this.currentAnswerObj.responseOptionsList = response.optionsArray;
    } else {
      this.currentAnswerObj.responseOptionsList.push(currentAnswerObj.responseOptionsList);
    }
    this.http.post(this.apiUrl + this.serviceURL.currentQuestionAnswer, this.currentAnswerObj , this.httpOptions);
}

}

