import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'knowledge-base-angular-practical';

  constructor (public helper: HelperService, private router: Router) {}

  ngOnInit() {
    
  }
}
