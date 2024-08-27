import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appTouch]',
})
export class TouchDirective {
  /* 
  Swipe: an event when: 
  * the distance between starting point and end point is more than 150px, AND
  * the time difference from start to end time is more than (200)? ms.
  */

  // provides argument what 'swipe' direction to detect: just x? just y? or both x and y.
  @Input() appTouch: 'horizontal' | 'vertical' | 'both' = 'both';

  @Input() index = -1;

  @Output() appTouchEvent = new EventEmitter<Record<string, number>>();

  public touchStart: Record<string, number> | null = null;

  public touchMove: unknown;

  public touchEnd: Record<string, number> | null = null;

  public touchList: unknown;

  private diffs = {
    clientX: 0,
    clientY: 0,
    timeStamp: 0,
  };

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStart = {
      clientX: event.changedTouches[0].clientX,
      clientY: event.changedTouches[0].clientY,
      timeStamp: event.timeStamp,
    };
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): TouchEvent | undefined {
    return event;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (!this.touchStart) return;

    this.touchEnd = {
      clientX: event.changedTouches[0].clientX,
      clientY: event.changedTouches[0].clientY,
      timeStamp: event.timeStamp,
    };

    this.diffs = {
      clientX: this.touchEnd['clientX'] - this.touchStart['clientX'],
      clientY: this.touchEnd['clientY'] - this.touchStart['clientY'],
      timeStamp: this.touchEnd['timeStamp'] - this.touchStart['timeStamp'],
    };

    this.appTouchEvent.emit({ ...this.diffs, index: this.index });
    this.reset();
  }

  @HostListener('touchcancel', ['$event'])
  onTouchCancel(event: TouchEvent): TouchEvent | undefined {
    return event;
  }

  private reset(): void {
    this.touchStart = null;
    this.touchEnd = null;
    this.touchMove = null;
    this.touchList = null;
  }
}

/*
    We cannot dichotomize direction. If x diff is significantly less than y diff, and we only
    want to detect horizontal movement, we cannot say it's a horizontal swipe, v.v.
    
    const direction: Record<string, string> = {
      x:
        this.diffs.clientX < 0
          ? 'left'
          : this.diffs.clientX > 0
            ? 'right'
            : 'stay',
      y:
        this.diffs.clientY < 0
          ? 'up'
          : this.diffs.clientY > 0
            ? 'down'
            : 'stay',
    };

    const fast = this.diffs.timeStamp < 200 ? true : false;
    const slow = this.diffs.timeStamp > 300 ? true : false;

    let action = '';

    if (fast && direction['x'] === 'stay' && direction['y'] === 'stay') {
      action = 'click';
    } else if (
      !fast &&
      !slow &&
      (direction['x'] !== 'stay' || direction['y'] !== 'stay')
    ) {
      action = 'swipe';
    } else {
      action = 'drag';
    }

    let output = {};
    switch (this.appTouch()) {
      case 'horizontal':
        output = {
          action: action + ' ' + direction['x'],
          direction: {
            x: direction['x'],
          },
          distance: {
            x: this.diffs.clientX,
          },
        };
        break;
      case 'vertical':
        output = {
          action: action + ' ' + direction['y'],
          direction: {
            y: direction['y'],
          },
          distance: {
            y: this.diffs.clientY,
          },
        };
        break;
      default:
        output = {
          action: action + ' ' + direction['x'],
          direction,
          distance: {
            x: this.diffs.clientX,
            y: this.diffs.clientY,
          },
        };
        break;
    }
    */
