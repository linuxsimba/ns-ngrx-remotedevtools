import { isAndroid } from '@nativescript/core';

export const environment = {
  production: false,
  backendUrlHost: isAndroid? '10.0.2.2' : 'localhost'
};
