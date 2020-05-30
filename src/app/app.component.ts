import { Component, OnInit } from '@angular/core';
import { AppService } from './service/app.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EddyTech';
  currentUser;
  constructor(
    public appService: AppService, public router: Router,private location:Location) {
    this.currentUser = this.appService.currentUserValue;
  }

  ngOnInit(): void {
  }

  checkRouterUrl() {
    return this.location.path().startsWith("/test");
  }
  logout() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let body = {
      "userName": currentUser.contactNumber,
      "password": currentUser.password
    }
    this.appService.logout(body).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        if (error.text = "User Logged Out Successfully") {
          this.appService.isSignedIn = false;
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if (currentUser && currentUser.remember === true) {
            currentUser.token = '';
            this.appService.currentUserSubject.next(currentUser);
          } else {
            localStorage.removeItem('currentUser');
            this.appService.currentUserSubject.next(null);
          }
          this.router.navigateByUrl('login');
        }
      },
      () => {
        this.appService.isSignedIn = false;
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.remember === true) {
          currentUser.token = '';
          this.appService.currentUserSubject.next(currentUser);
        } else {
          localStorage.removeItem('currentUser');
          this.appService.currentUserSubject.next(null);
        }
        this.router.navigateByUrl('login');
      }
    )
  }
}
