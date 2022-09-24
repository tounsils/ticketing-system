import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { regex } from '../../constant/regex';
import { HelperService } from '../../services/helper.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    private helper: HelperService,
    private router: Router
  ) { }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern(regex.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(regex.PASSWORD)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      const formValue: any = this.loginForm.value;
      const data: any = {
        email: formValue.email,
        password: formValue.password
      };
      this.apiService.login(data).subscribe(async (res: any) => {
        this.helper.setLocalstorageValue('token', res.token);
        this.helper.setLocalstorageValue('userData', res);
        this.helper.showSuccess(res.message);
        this.router.navigate(['/category']);
      }, err => {
        this.helper.showError(err.error.message ? err.error.message : 'Error');
      });
    }
  }



}
