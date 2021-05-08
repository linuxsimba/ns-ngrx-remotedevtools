// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.example.ngrx-remotedevtools-test',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  appPath: 'src'
} as NativeScriptConfig;
