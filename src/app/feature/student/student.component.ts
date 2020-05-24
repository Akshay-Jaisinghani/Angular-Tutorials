import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  // studentTestObj = [
  //   {
  //     "id": 1,
  //     "name": "NEET",
  //     "startDateTime": "09-05-2020 21:00",
  //     "endDateTime": "10-05-2020 21:00",
  //     "duration": "3",
  //     "showRandomQuestions": 0,
  //     "showResultAfterTest": 0
  //   },
  //   {
  //     "id": 2,
  //     "name": "NEET-1",
  //     "startDateTime": "09-05-2020 21:00",
  //     "endDateTime": "10-05-2020 21:00",
  //     "duration": "3",
  //     "showRandomQuestions": 0,
  //     "showResultAfterTest": 0
  //   },
  //   {
  //     "id": 3,
  //     "name": "NEET-2",
  //     "startDateTime": "09-05-2020 21:00",
  //     "endDateTime": "10-05-2020 21:00",
  //     "duration": "3",
  //     "showRandomQuestions": 0,
  //     "showResultAfterTest": 0
  //   }
  // ]

  studentTestObj =  [
    {
        "id": 1,
        "name": "NEET",
        "startDateTime": "2020-05-29T21:00:00.000+0000",
        "endDateTime": "2020-05-29T21:00:00.000+0000",
        "duration": "3",
        "showRandomQuestions": false,
        "showResultAfterTest": false,
        "classroomName": "NEET CBSE"
    }
]


  // [
  //   {
  //     title:"NTSE Test 2 - Blood Relation, Odd One Out",
  //     testStartAt: "14Apr,2020, 9:50PM",
  //     testEndsAt: "14Apr,2020, 10:50PM",
  //     classRoom: "NTSE & Competitive Exam"
  //   },
  //   {
  //     title:"NTSE Test 2 - Blood Relation, Odd One Out",
  //     testStartAt: "14Apr,2020, 9:50PM",
  //     testEndsAt: "14Apr,2020, 10:50PM",
  //     classRoom: "NTSE & Competitive Exam"
  //   },
  //   {
  //     title:"NTSE Test 2 - Blood Relation, Odd One Out",
  //     testStartAt: "14Apr,2020, 9:50PM",
  //     testEndsAt: "14Apr,2020, 10:50PM",
  //     classRoom: "NTSE & Competitive Exam"
  //   },
  //   {
  //     title:"NTSE Test 2 - Blood Relation, Odd One Out",
  //     testStartAt: "14Apr,2020, 9:50PM",
  //     testEndsAt: "14Apr,2020, 10:50PM",
  //     classRoom: "NTSE & Competitive Exam"
  //   }
  // ]

  constructor() { }

  ngOnInit(): void {
  }

}
