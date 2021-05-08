import { createSelector } from '@ngrx/store';
import { CounterState, State } from './interfaces';

const getCounterState = (state: State) => state.counter;
export const getCount = createSelector(
  getCounterState,
  (state: CounterState) => state.count
);
