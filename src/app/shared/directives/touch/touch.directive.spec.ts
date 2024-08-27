import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  ElementRef,
} from '@angular/core';

import { TouchDirective } from './touch.directive';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-test',
  template: `<button appTouch="both" [index]="idx">Test</button>`,
  imports: [TouchDirective],
})
class TestComponent {
  idx = 8;

  onTouch(event: unknown, key: string, idx: number) {
    return { event, key, idx };
  }
}

describe('TouchDirective', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: TouchDirective;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let input: DebugElement;

  const fiveSecs = 5 * 1000;
  const mock = {
    start: {
      timeStamp: Date.parse(new Date().toString()),
      clientX: 105,
      clientY: 465,
    },
    end: {
      timeStamp: Date.parse(new Date().toString()) + fiveSecs,
      clientX: 500,
      clientY: 465,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, TouchDirective],
      providers: [
        {
          provide: TouchDirective,
          useValue: {
            touchStart: mock.start,
            touchEnd: mock.end,
          },
        },
        {
          provide: ElementRef,
          useValue: {},
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    directive = new TouchDirective();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    input = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should populate .touchStart when TouchEvent started', () => {
    const mock = {
      timeStamp: Date.parse(new Date().toString()),
      clientX: 105,
      clientY: 465,
    };
    spyOn(directive, 'onTouchStart').and.callThrough();

    directive.onTouchStart({
      timeStamp: mock.timeStamp,
      changedTouches: [
        {
          clientX: mock.clientX,
          clientY: mock.clientY,
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    expect(directive.touchStart?.['clientX']).toEqual(mock.clientX);
    expect(directive.touchStart?.['clientY']).toEqual(mock.clientY);
    expect(directive.touchStart?.['timeStamp']).toEqual(mock.timeStamp);
  });

  it('should return event when .onTouchMove() has been called', () => {
    const mock = {
      timeStamp: Date.parse(new Date().toString()),
      clientX: 105,
      clientY: 465,
    };
    const mockEvent = {
      timeStamp: mock.timeStamp,
      changedTouches: [
        {
          clientX: mock.clientX,
          clientY: mock.clientY,
        },
      ],
    };
    spyOn(directive, 'onTouchMove').and.callThrough();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = directive.onTouchMove(mockEvent as any);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(result).toEqual(mockEvent as any);
  });
});
