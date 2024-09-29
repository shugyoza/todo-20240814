import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private _httpClient = inject(HttpClient);
  private _url = environment.url.api;

  public create(
    body: unknown,
    url = this._url.root + this._url.path.mock,
    options = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ): Observable<unknown> {
    return this._httpClient.post<unknown>(url, body, options);
  }

  public read<T>(
    url = this._url.root + this._url.path.mock,
    options = {
      headers: {
        // 'x-api-key': 'blah',
        'Content-Type': 'application/json',
      },
    }
  ): Observable<T> {
    console.log({ url });
    return this._httpClient.get<T>(url, options);
  }

  public update = {
    put: (
      body: unknown,
      url = this._url.root + this._url.path.mock,
      options = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ): Observable<unknown> => {
      return this._httpClient.put<unknown>(url, body, options);
    },
    patch: (
      body: unknown,
      url = this._url.root + this._url.path.mock,
      options = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ): Observable<unknown> => {
      return this._httpClient.patch<unknown>(url, body, options);
    },
  };

  public delete(
    id: number,
    url = this._url.root + this._url.path.mock,
    options = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ): Observable<unknown> {
    url = url + `/${id}`;

    return this._httpClient.delete<unknown>(url, options);
  }
}
