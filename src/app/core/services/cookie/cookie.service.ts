import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private document = inject(DOCUMENT);

  public update<T>(update: Record<string, T>): void {
    const cookie = { ...this.parse(), ...update };

    for (const key in cookie) {
      let value = cookie[key] ?? '';

      if (Array.isArray(value)) {
        value = value.join(',');
      } else if (typeof value === 'number') {
        value = value.toString();
      } else if (typeof value === 'string') {
        value = value.trim();
      }

      this.document.cookie = `${key}=${value};`;
    }
  }

  public parse(): Record<string, string> {
    const cookie = {
      array: this.document.cookie?.split(';'),
      object: {} as Record<string, string>,
    };
    cookie.array?.forEach((keyValue: string) => {
      const [key, value] = keyValue.split('=').map((text) => text.trim());
      cookie.object[key] = value;
    });

    return cookie['object'];
  }
}
