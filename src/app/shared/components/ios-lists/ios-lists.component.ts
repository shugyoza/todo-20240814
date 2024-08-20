import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { IosList } from './ios-lists.interface';

@Component({
  standalone: true,
  selector: 'app-ios-lists',
  templateUrl: 'ios-lists.component.html',
  styleUrl: 'ios-lists.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatDividerModule, JsonPipe, CdkDrag],
})
export class IosListsComponent {
  @Input() lists: IosList[] = [];
  readonly panelOpenState = signal(false);
  public dragged: Record<string, number> = {};
  public dragDistance = 100;

  public toggleExpand(card: IosList): void {
    console.log('hit');
    if (!card.expandable) return;

    card.expanded = !card.expanded;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onDrag(event: any, index: number) {
    console.log(event, index);

    /* TODO: revisit for swipe event. Current problem: cannot limit the swiped element display
      const distance = Math.abs(event.distance.x);
      if (distance > this.dragDistance) return;

      if (!this.dragged[index]) this.dragged[index] = 0;
      console.log({ line: 63, event, dragged: this.dragged });

      this.dragged[index] += event.delta.x;
      // console.log(event.event.target.offsetWidth);

      if (this.dragged[index] < 0) {
        this.dragged[index] = -1;
        // console.log({ line: 52, event, dragged: this.dragged });

        return;
      }

      if (this.dragged[index] > 0) {
        this.dragged[index] = 1;
        // console.log({ line: 58, event, dragged: this.dragged });

        return;
      }
      */
  }
}
