import { createAction } from '@ngrx/store';

export const addCounter = createAction(
  '[Counter] addCounter - add to count state'
);

export const addCounterSuccess = createAction(
  '[Counter] addCounterSuccess - counter updated'
);
