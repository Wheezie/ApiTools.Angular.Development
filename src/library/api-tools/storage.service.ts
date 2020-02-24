import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  Set(key: string, value: any) {
    if (!this.Enabled)
      return;

    if (typeof(value) !== 'string')
      window.localStorage.setItem(key, JSON.parse(value));
    else
      window.localStorage.setItem(key, value);
  }

  Get(key: string) {
    if (!this.Enabled)
      return null;

    return window.localStorage.getItem(key);
  }

  GetObject(key: string) {
    if (!this.Enabled)
      return null;

    return JSON.parse(window.localStorage.getItem(key));
  }

  Delete(key: string) {
    return this.Enabled && window.localStorage.removeItem(key);
  }

  get Enabled() {
    return window.localStorage != null && typeof(Storage) !== 'undefined';
  }
}
