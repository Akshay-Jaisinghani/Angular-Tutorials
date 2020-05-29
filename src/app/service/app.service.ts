import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlatformService } from './platform.service';

export interface User {
  contactNumber: number,
  roleNumber: number,
  password: string,
  remember: boolean,
  token: string,
  gender: string,
  id: number,
  joinDate: string,
  name: string,
  parentsContact: string,
  rollNumber: string,
  whatsAppContact: string
}

@Injectable({
  providedIn: 'root'
})

export class AppService {
  public currentUserSubject: BehaviorSubject<User>
  isSignedIn = this.getIsSignedIn();

  constructor(private http: HttpClient, private platformService: PlatformService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //   this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(contactNumber: string, password: string) {
    let body = {
      "userName": contactNumber,
      "password": password
    }
    return this.platformService.httpPost(this.platformService.getLoginUrl(), body, this.platformService.getHttpOptionsForLoginLogout());
  }

  getIsSignedIn() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token !== '') {
      return true;
    } else {
      return false;
    }
  }
  // removes the current user from local storage when user logout
  logout() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let body = {
      "userName": currentUser.contactNumber,
      "password": currentUser.password
    }
    return this.platformService.httpPost(this.platformService.getLogoutUrl(), body, this.platformService.getHttpOptionsForLoginLogout());
  }
}
