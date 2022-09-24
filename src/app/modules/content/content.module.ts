import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content.routing.module';
import { ContentComponent } from './content.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ApiService } from 'src/app/services/api.service';
import { httpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';

@NgModule({
  declarations:
    [ContentComponent],
  imports:
    [
      CommonModule,
      ContentRoutingModule,
      HttpClientModule,
      ModalModule.forRoot(),
      ReactiveFormsModule,
      FormsModule,
      Ng2SearchPipeModule
    ],
  providers:
    [
      ApiService,
      httpService,
      HelperService
    ]
})
export class ContentModule { }
