import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
const phoneNumber = /^\d{10}$/;
@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;

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
      this.loginForm.controls.password.setValue(CryptoJS.AES.decrypt(this.appService.currentUserValue.password.trim(), btoa(this.appService.currentUserValue.email).trim()).toString(CryptoJS.enc.Utf8));
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
            };
            /** encrypt password using AES encryption - "Advanced Encryption Standard"
             * @param password: password to encrypt
             * @param key: encryption key
            */
            //store encrypted password in local storage
         //   user.password = CryptoJS.AES.encrypt(password.trim(), btoa(user.email).trim()).toString();
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        },
        error => {
          console.log(error)
        },
        () => {
          this.appService.isSignedIn = true;
          this.router.navigateByUrl("student");
        }
      )}
}
