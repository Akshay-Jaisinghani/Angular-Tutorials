import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentTestService {

  serviceURL = {
    testQuestions : '/api/getQuestionsForTest/'
  }

  httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
    })
  };

  apiUrl: String;
  
  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  getTestQuestions(testId: Number) {
    return this.http.get<any>(
      this.apiUrl + this.serviceURL.testQuestions + testId
    )

  }

}
