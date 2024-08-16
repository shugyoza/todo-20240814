import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { TodoApiService } from './todo-api.service';
import { environment } from 'src/environments/environment.development';

describe('TodoApiService', () => {
  let todoApiService: TodoApiService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });

    httpClient = TestBed.inject(HttpClient);
    todoApiService = TestBed.inject(TodoApiService);
  });

  it('should create', () => {
    expect(todoApiService).toBeTruthy();
  });

  it('should call http.post() when .create() is being called', () => {
    const body = {} as any;
    const { root, path } = environment.url.api;
    const url = root + path.mock;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    spyOn(httpClient, 'post');
    todoApiService.create(body, url, options);

    expect(httpClient.post).toHaveBeenCalledWith(url, body, options);
  });

  it('should call http.get() when .read() is being called', () => {
    const { root, path } = environment.url.api;
    const url = root + path.mock;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    spyOn(httpClient, 'get');
    todoApiService.read(url, options);

    expect(httpClient.get).toHaveBeenCalledWith(url, options);
  });

  it('should call http.put() when update.put() is being called', () => {
    const body = {} as any;
    const { root, path } = environment.url.api;
    const url = root + path.mock;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    spyOn(httpClient, 'put');
    todoApiService.update.put(body, url, options);

    expect(httpClient.put).toHaveBeenCalledWith(url, body, options);
  });

  it('should call http.put() when update.patch() is being called', () => {
    const body = {} as any;
    const { root, path } = environment.url.api;
    const url = root + path.mock;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    spyOn(httpClient, 'patch');
    todoApiService.update.patch(body, url, options);

    expect(httpClient.patch).toHaveBeenCalledWith(url, body, options);
  });

  it('should call http.delete() when .delete() is being called', () => {
    const { root, path } = environment.url.api;
    const id = 1;
    const url = root + path.mock;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    spyOn(httpClient, 'delete');
    todoApiService.delete(id, url, options);

    expect(httpClient.delete).toHaveBeenCalledWith(`${url}/${id}`, options);
  });
});
