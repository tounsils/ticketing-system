import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category.routing.module';
import { CategoryComponent } from './category.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { httpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';

@NgModule({
  declarations:
    [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    httpService,
    HelperService
  ]
})
export class CategoryModule { }
