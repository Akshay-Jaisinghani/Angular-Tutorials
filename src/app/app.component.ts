import { Component, OnInit } from '@angular/core';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EddyTech';
  currentUser;
  constructor(
    public readonly appService: AppService) {
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
  }

}
