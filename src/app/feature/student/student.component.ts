import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  studentTestObj = [
    {
      "id": 1,
      "name": "NEET",
      "startDateTime": "2020-05-29T21:00:00.000+0000",
      "endDateTime": "2020-05-29T21:00:00.000+0000",
      "duration": "3",
      "showRandomQuestions": true,
      "showResultAfterTest": false,
      "classroomName": "NEET CBSE"
    },
    {
      "id": 2,
      "name": "NEET",
      "startDateTime": "2020-05-29T21:00:00.000+0000",
      "endDateTime": "2020-05-29T21:00:00.000+0000",
      "duration": "3",
      "showRandomQuestions": true,
      "showResultAfterTest": false,
      "classroomName": "NEET CBSE"
    },
    {
      "id": 3,
      "name": "NEET",
      "startDateTime": "2020-05-29T21:00:00.000+0000",
      "endDateTime": "2020-05-29T21:00:00.000+0000",
      "duration": "3",
      "showRandomQuestions": false,
      "showResultAfterTest": false,
      "classroomName": "NEET CBSE"
    }, {
      "id": 4,
      "name": "NEET",
      "startDateTime": "2020-05-29T21:00:00.000+0000",
      "endDateTime": "2020-05-29T21:00:00.000+0000",
      "duration": "3",
      "showRandomQuestions": false,
      "showResultAfterTest": false,
      "classroomName": "NEET CBSE"
    },
    {
      "id": 5,
      "name": "NEET",
      "startDateTime": "2020-05-29T21:00:00.000+0000",
      "endDateTime": "2020-05-29T21:00:00.000+0000",
      "duration": "3",
      "showRandomQuestions": false,
      "showResultAfterTest": false,
      "classroomName": "NEET CBSE"
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    //Date.parse('01/01/2011 10:20:45') > Date.parse('01/01/2011 5:10:10')
  }
  redirectToTest() {
    this.router.navigateByUrl("test");
  }
}
