import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken('local-storage');

export const localStorageFactory = (platformId: Object): Storage | Object => {
  if (isPlatformBrowser(platformId)) {
    return window.localStorage;
  }

  return {};
};

@Injectable({ providedIn: 'root' })
export class LocalStorage implements Storage {
  public length: number;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) {}

  public clear(): void {
    this.localStorage.clear();
  }

  public getItem(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  public key(index: number): string | null {
    return this.localStorage.key(index);
  }

  public removeItem(key: string): void {
    this.localStorage.removeItem(key);
  }

  public setItem(key: string, value: string): void {
    this.localStorage.setItem(key, value);
  }
}
