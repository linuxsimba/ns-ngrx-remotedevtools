import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private appService: AppService,
  ) {}

  count$: Observable<number>;

  increment(): void {
    this.appService.incrementCounter();
  }

  ngOnInit(): void {
    this.count$ = this.appService.getCount();
  }
}
