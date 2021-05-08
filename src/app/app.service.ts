import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as counterActions from './states/actions';
import * as counterSelectors from './states/selectors';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private store: Store
  ) {}

  incrementCounter(): void {
    this.store.dispatch(counterActions.addCounter());
  }

  getCount(): Observable<number>{
    return this.store.select(counterSelectors.getCount);
  }
}
