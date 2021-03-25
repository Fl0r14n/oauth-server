import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {SERVER_HOST, SERVER_PATH} from '../config';

const mockStorage: Storage = {
  clear(): void {
  },
  getItem(key: string): string {
    return undefined as string;
  },
  key(index: number): string {
    return undefined as string;
  },
  removeItem(key: string): void {
  },
  setItem(key: string, value: string): void {
  },
  length: 0
};

const mockLocation = (serverHost: string, serverPath: string): Location => {
  const url = new URL(serverHost && serverPath ? `${serverHost}${serverPath}` : 'http://localhost');
  const {href, origin, protocol, host, hostname, port, pathname, search, hash} = url;
  return {
    href, origin, protocol, host, hostname, port, pathname, search, hash,
    reload(): void {
    },
    assign(u: string): void {
    },
    ancestorOrigins: null,
    replace(u: string): void {
    }
  };
};

@Injectable({
  providedIn: 'root'
})
export class BrowserRef {

  document: Document;
  sessionStorage: Storage;
  localStorage: Storage;
  window: Window;
  navigator: Navigator;
  location: Location;

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId,
              @Inject(DOCUMENT) documentRef,
              @Optional() @Inject(SERVER_HOST) serverHost?: string,
              @Optional() @Inject(SERVER_PATH) serverPath?: string) {
    const assign = (window: Window) => {
      this.document = window.document;
      this.sessionStorage = window.sessionStorage;
      this.localStorage = window.localStorage;
      this.window = window;
      this.navigator = window.navigator;
      this.location = window.location;
    };
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      assign(window);
    } else {
      const mockWindow = {
        document: documentRef,
        sessionStorage: mockStorage,
        localStorage: mockStorage,
        navigator: {
          language: 'en',
          geolocation: {},
          mediaDevices: {}
        },
        location: mockLocation(serverHost, serverPath),
      } as Window;
      assign(mockWindow);
    }
  }
}
