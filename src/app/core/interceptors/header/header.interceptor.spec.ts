import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { CookieService } from '@core/services/cookie/cookie.service';

import { headerInterceptor } from './header.interceptor';
import { takeLast } from 'rxjs';

describe('headerInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let cookieService: CookieService;

  const interceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
  ) => TestBed.runInInjectionContext(() => headerInterceptor(request, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CookieService,
          useValue: {
            parse: () => ({
              accessToken: 'mock-token',
            }),
          },
        },
        provideHttpClient(withInterceptors([interceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(headerInterceptor).toBeTruthy();
  });

  it('should add required auth properties to the request header', () => {
    httpClient.get('/mock-url').pipe(takeLast(1)).subscribe();

    const test = httpTestingController.expectOne('/mock-url');

    expect(test.request.headers.get('accessToken')).toEqual('mock-token');
  });
});
