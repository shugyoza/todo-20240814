import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private document = inject(DOCUMENT);

  public update(update: {
    [key: string]: (string | number)[] | number | string;
  }): void {
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

  public parse(): { [key: string]: string } {
    const cookie = {
      array: this.document.cookie?.split(';'),
      object: {} as { [key: string]: string },
    };
    cookie.array?.forEach((keyValue: string) => {
      const [key, value] = keyValue.split('=').map((text) => text.trim());
      cookie.object[key] = value;
    });

    return cookie['object'];
  }
}
