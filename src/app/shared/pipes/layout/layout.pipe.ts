import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';

@Pipe({
  standalone: true,
  name: 'layout',
})
export class LayoutPipe implements PipeTransform {
  // DI on pipe should be done via constructor so that it can be injected on TestBed and tested
  constructor(private _breakpointObserver$: BreakpointObserver) {}

  transform(value: Record<string, string>) {
    return this._breakpointObserver$
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map((result: BreakpointState) => {
          const viewWidthRange = Object.entries(result.breakpoints).filter(
            (breakpoint) => breakpoint[1] === true
          )[0][0];

          return value[viewWidthRange];
        })
      );
  }
}
