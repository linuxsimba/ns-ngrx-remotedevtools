import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CounterState, CounterReducer } from './states';

import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './states/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NativeScriptDevNgrxRemoteDevtoolModule } from 'nativescript-ngx-lib';

interface NgState {
  counter: CounterState
}

const remoteDevtoolIP = '192.168.1.104';

const reducers: ActionReducerMap<NgState> = {
  counter: CounterReducer
};
@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    NativeScriptModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(([ CounterEffects ])),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    NativeScriptDevNgrxRemoteDevtoolModule.forRoot({
      hostname: remoteDevtoolIP,
      port: 8000
    })
  ],
  declarations: [ AppComponent ],
  providers: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
