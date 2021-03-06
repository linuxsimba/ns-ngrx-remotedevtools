/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import 'nativescript-websockets'; // Need to be loaded before socketcluster

if (!(<any>global).WebSocket) {
  throw Error('The WebSocket is not available, be sure to import `nativescript-websockets` first');
}

import * as socketCluster from 'socketcluster-client';
import { stringify } from 'jsan';

export class RemoteDev {

    private static instance: RemoteDev = undefined;

    private static listeners: {[key: string]: any[]} = {};

    private defaultOptions = {
      hostname: 'localhost',
      port: 8000,
      secure: false,
      autoReconnect: true,
      autoReconnectOptions: {
        randomness: 60000
      }
    };

    private unsubscribeFunc = (listeners, listener): void => {
      const index = listeners[this.id].indexOf(listener);
      listeners[this.id].slice(index, 1);
    }

    private options = undefined;

    private id: string;

    private socket = undefined;

    private channel = undefined;

    private constructor(options = {}) {
      this.configure(options);
    }

    public static getInstance(options = {}): RemoteDev {
      if (!RemoteDev.instance) {
        const instance = new RemoteDev(options);
        instance.id = instance.generateId();

        RemoteDev.instance = instance;
      }

      return RemoteDev.instance;
    }

    public connect() {
      if (this.isSocketConnected()) {
        return;
      }

      this.socket = socketCluster.create({
        hostname: this.options.hostname,
        port: this.options.port,
        secure: !!this.options.secure
      });

      this.socket.connect();

      this.socket.on('error', error => {
        console.error('NGRX-DEVTOOLS: ', error.message);
      });

      this.watchSocket();
    }

    public subscribe(listener): void {
      if (!listener) { return; }

      const listeners = RemoteDev.listeners;
      if (!listeners[this.id]) { listeners[this.id] = []; }

      listeners[this.id].push(listener);

      return this.unsubscribeFunc(listeners, listener);
    }

    public unsubscribe() {
      delete RemoteDev.listeners[this.id];
    }

    public init(state, action = {}) {
      this.sendToSocket(action, state, 'INIT');
    }

    public send(action, payload) {
      if (!action) {
        return this.sendToSocket(undefined, payload, 'STATE');
      }
      return this.sendToSocket(action, payload, 'ACTION');
    }

    public error(payload: any) {
      this.sendToSocket(undefined, payload, 'ERROR');
    }

    private configure(options) {
      this.options = {
        ...this.defaultOptions,
        ...options
      };
    }

    private isSocketConnected(): boolean {
      return this.socket && (this.socket.getState() !== this.socket.CLOSED);
    }

    private generateId() {
      return Math.random().toString(36).substr(2);
    }

    private sendToSocket(action, state, type) {
      this.connect();

      if (!action) {
        return;
      }

      setTimeout(() => {
        const message = {
          type: type || 'ACTION',
          action: type === 'ACTION' ? stringify(this.transformAction(action)) : action,
          payload: state ? stringify(state) : '',
          id: this.socket.id,
          instanceId: this.id
        };
        if (!this.isSocketConnected()) {
          return;
        }

        this.socket.emit(this.socket.id ? 'log' : 'log-noid', message);
      }, 0);
    }

    private transformAction(action) {
      if (action.action) { return action; }

      const liftedAction = { timestamp: Date.now(), action };
      if (!action || typeof action === 'string') {
        liftedAction.action = { type: action };
      }

      if (!action.type) {
        liftedAction.action = { type: 'update' };
      }

      liftedAction.action.payload = liftedAction.action.payload || '';

      return liftedAction;
    }

    private watchSocket() {
      if (this.channel) { return; }

      this.socket.emit('login', 'master', (error, channelName) => {
        if (error) {
          console.error(error.message);
          return;
        }

        this.channel = this.socket.subscribe(channelName);
        this.channel.watch(this.propagateMessage);
        this.socket.on(channelName, this.propagateMessage);
        // send START/STOP
        this.propagateMessage({ type: this.options.realtime ? 'START' : 'STOP'});
      });
    }

    private propagateMessage(message) {
      if (!message.payload) {
        message.payload = message.action;
      }

      const listeners = RemoteDev.listeners;
      Object.keys(listeners).map(id => {
        if (message.instanceId && message.instanceId !== id) {
          return;
        }

        listeners[id].map(fn => fn(message));
      });
    }
}
