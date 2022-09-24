import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";
import { regex } from 'src/app/constant/regex';
import { HelperService } from 'src/app/services/helper.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    private helper: HelperService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {

  }

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    this.buildSignUpForm()
  }

  buildSignUpForm() {
    this.signupForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(regex.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(regex.PASSWORD)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      const formValues: any = this.signupForm.value;
      const userData: any = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      };
      this.apiService.signup(userData).subscribe((res: any) => {
        this.helper.showSuccess(res.message);
        this.router.navigate(['/login']);
      }, err => {
        this.helper.showError(err.error.message ? err.error.message : 'Error');
      });
    }
  }

  signUpWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (response) => {
      if (response) {
        const reqObject = { ...response, socialPlatform: "Google" };
        this.apiService.signup(reqObject).subscribe((res: any) => {
          this.helper.showSuccess(res.message);
          this.router.navigate(['/login']);
        }, err => {
          this.helper.showError(err.error.message ? err.error.message : 'Error');
        });
      }
    });
  }


}
