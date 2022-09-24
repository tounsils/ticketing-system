import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpRoutingModule } from './sign-up.routing.module';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { httpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    httpService,
    HelperService
  ]
})
export class SignUpModule { }
