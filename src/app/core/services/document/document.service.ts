import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private readonly _document = inject(DOCUMENT);

  private readonly _window = this._document?.defaultView;

  get language(): string {
    return this._window?.navigator?.language ?? 'default';
  }
}
