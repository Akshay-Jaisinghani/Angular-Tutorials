import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isSignedIn = this.getIsSignedIn();
  constructor() { }
  login(email: string, password: string): Observable<boolean> {
    // if email is valid (matches regex) and password length > 0
    const user = {
      email: email,
      password: password,
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return of(true);
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
  logout(): void {
    /*
      HERE YOU NEED TO MAKE A CALL TO YOUR API TO INVALIDATE THE USER'S AUTHENTICATION TOKEN.
    */
    localStorage.removeItem('currentUser');
  }
}
