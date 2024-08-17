import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { Observable, of, takeLast } from 'rxjs';

import { LayoutPipe } from './layout.pipe';
import { context } from 'src/app/constants/layout.constants';

describe('LayoutPipe', () => {
  let pipe: LayoutPipe;
  let _breakpointObserver: BreakpointObserver;
  const mockBreakpointState: BreakpointState = {
    matches: true,
    breakpoints: {
      '(max-width: 599.98px)': false, // XSmall
      '(min-width: 600px) and (max-width: 959.98px)': true, // Small
      '(min-width: 960px) and (max-width: 1279.98px)': false, // Medium
      '(min-width: 1280px) and (max-width: 1919.98px)': false, // Large
      '(min-width: 1920px)': false, // XLarge
    },
  };

  // testing pipe with DI
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreakpointObserver],
    });

    _breakpointObserver = TestBed.get(BreakpointObserver);
    pipe = new LayoutPipe(_breakpointObserver);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should do something', () => {
    spyOn(pipe['_breakpointObserver$'], 'observe').and.callFake(
      (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _breakpoints = [
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
          Breakpoints.XLarge,
        ]
      ): Observable<BreakpointState> => of(mockBreakpointState)
    );

    pipe
      .transform(context)
      .pipe(takeLast(1))
      .subscribe((result) => {
        expect(result).toEqual('Small');
      });
  });
});
