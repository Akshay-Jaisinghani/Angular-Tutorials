import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  totalQuestions = Array.from(new Array(50), (x,i) => i + 1);
  constructor() { }

  ngOnInit(): void {
  }

}
