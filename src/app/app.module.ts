import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CounterState, CounterReducer } from './states';

import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './states/effects';

interface NgState {
  counter: CounterState
}
const reducers: ActionReducerMap<NgState> = {
  counter: CounterReducer
};
@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    NativeScriptModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(([ CounterEffects ]))
  ],
  declarations: [ AppComponent ],
  providers: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
