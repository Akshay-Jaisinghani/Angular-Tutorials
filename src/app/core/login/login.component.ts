import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import * as CryptoJS from 'crypto-js';

const phoneNumber = /^\d{10}$/;
@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly appService: AppService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      contactNumber: ['', Validators.compose([Validators.required, Validators.pattern(phoneNumber)])],
      password: ['', Validators.compose([Validators.required])],
      remember: [false],
    });
    if (this.appService.currentUserValue && this.appService.currentUserValue.remember) {
      this.loginForm.controls.contactNumber.setValue(this.appService.currentUserValue.contactNumber);
      /** decrypt password using AES encryption - "Advanced Encryption Standard"
        * @param password: encrypted password
        * @param key: encryption key
      */
      //decrypt password saved in local storage and then set value of password form field
      this.loginForm.controls.password.setValue(CryptoJS.AES.decrypt(this.appService.currentUserValue.password.trim(),this.appService.currentUserValue.contactNumber));
      this.loginForm.controls.remember.setValue(this.appService.currentUserValue.remember);
    }
  }
  password(): void {
    this.router.navigateByUrl('forgot');
  }

  signUp(): void {
    this.router.navigateByUrl('registration');
  }

  login(): void {
    this.appService.login(this.loginForm.controls.contactNumber.value, this.loginForm.controls.password.value).subscribe(
        data => {
          console.log(data);
          if (data.token) {
            const user = {
              token: data.token,
              contactNumber: this.loginForm.controls.contactNumber.value,
              password: this.loginForm.controls.password.value,
              remember: false
            };
            /** encrypt password using AES encryption - "Advanced Encryption Standard"
             * @param password: password to encrypt
             * @param key: encryption key
            */
            //store encrypted password in local storage
            user.password = CryptoJS.AES.encrypt(this.loginForm.controls.password.value.trim(),this.loginForm.controls.contactNumber.value).toString();
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        },
        error => {
          console.log(error)
          this.errorMessage = "You are logged in to another device or another window. To login here, please try again";
          let body = {
            "userName": this.loginForm.controls.contactNumber.value,
            "password": this.loginForm.controls.password.value
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
                 currentUser.token = '';
               }
            })
        },
        () => {
          this.appService.isSignedIn = true;
          this.router.navigateByUrl("student");
        }
      )}
}
