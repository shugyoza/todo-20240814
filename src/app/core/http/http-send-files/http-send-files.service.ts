import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpSendFiles {
  private _http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public send(data: any): Observable<any> {
    const formData = new FormData();
    const url = '';

    /*
    You can get everything between the <html></html> tags by 
    using document.documentElement.innerHTML. 
    For getting 'body' element and it's innerHTML:
      var bodyHtml = document.getElementsByTagName('body')[0].innerHTML;
    */

    data.files.forEach((file: File) => {
      formData.append('files', file);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this._http.post<any>(url, formData);
  }
}
