import { createReducer, on, Action } from '@ngrx/store';
import { CounterState } from './interfaces';
import * as counterActions from './actions';

export const initialState = <CounterState>{
  count: 0
};

const _counterReducer = createReducer(initialState,
  on(counterActions.addCounter,
    (state) => ({
      ...state,
      count: state.count++
    })
  )
);
export function CounterReducer(state: CounterState, action: Action): CounterState {
  return _counterReducer(state, action);
}
