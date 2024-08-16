import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let document: Document;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    document = TestBed.inject(DOCUMENT);
    cookieService = TestBed.inject(CookieService);
  });

  it('should create', () => {
    expect(cookieService).toBeTruthy();
  });

  it('should update cookie when .update() is being called', () => {
    const mock = {
      string: 'someString',
    };
    cookieService.update(mock);

    expect(document.cookie).toContain('someString');
  });

  it('should update cookie when .update() is being called', () => {
    const mock = {
      array: ['one', 2],
    };
    cookieService.update(mock);

    expect(document.cookie).toContain('one,2');
  });

  it('should update cookie when .update() is being called', () => {
    const mock = {
      number: 3,
    };
    cookieService.update(mock);

    expect(document.cookie).toContain('3');
  });

  it('should parse cookie when .parse() is being called', () => {
    const mock = {
      otherKey: 'otherValue',
    };
    cookieService.update(mock);
    const cookieObject = cookieService.parse();

    expect(Object.keys(cookieObject)).toContain('otherKey');
    expect(Object.values(cookieObject)).toContain('otherValue');
  });
});
