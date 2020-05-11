import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
      password: ['', Validators.compose([Validators.required])],
      remember: [true],
    });
  }
  password(): void {
    this.router.navigateByUrl('forgot');
  }

  signUp(): void {
    this.router.navigateByUrl('registration');
  }

  login(): void {
    this.appService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe((matched) => {
        if (matched) {
          this.appService.isSignedIn = true;
          this.router.navigateByUrl("student");
        } else {
        }
      });
  }
  

}
