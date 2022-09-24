import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../../services/helper.service';
import { ApiService } from '../../services/api.service';
import { httpService } from 'src/app/services/http.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HelperService,
    httpService,
    ApiService
  ]
})
export class LoginModule { }
