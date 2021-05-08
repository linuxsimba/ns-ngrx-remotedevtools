import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as counterActions from './actions';
import { map } from 'rxjs/operators';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions
  ) {}

  addToCounter$ = createEffect(
    () => this.actions$.pipe(
      ofType(counterActions.addCounter),
      map(() => counterActions.addCounterSuccess())
    )
  )
}
