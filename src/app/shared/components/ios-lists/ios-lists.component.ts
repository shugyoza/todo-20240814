import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
  signal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { JsonPipe, NgStyle } from '@angular/common';

import { IosList } from './ios-lists.interface';
import { SidenavDrawerComponent } from '../sidenav-drawer/sidenav-drawer.component';
import { IosButtonComponent } from '../ios-button/ios-button.component';
import { TouchDirective } from '@shared/directives/touch/touch.directive';

@Component({
  standalone: true,
  selector: 'app-ios-lists',
  templateUrl: 'ios-lists.component.html',
  styleUrl: 'ios-lists.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SidenavDrawerComponent,
    IosButtonComponent,
    NgStyle,
    JsonPipe,
    TouchDirective,
  ],
})
export class IosListsComponent implements OnChanges {
  @Input() lists: any[] = [];

  @Input() edit = false;

  public readonly sidenavOpenState = output<any>();

  public readonly panelOpenState = signal(false);

  public showStart: Record<string, number> = {};

  public showEnd: Record<string, number> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'edit' in changes &&
      changes['edit'].previousValue === false &&
      changes['edit'].currentValue === true
    ) {
      this.reset();
    }
  }

  public toggleExpand(card: IosList): void {
    if (!card.expandable) return;

    card.expanded = !card.expanded;
  }

  public onClick(event: MouseEvent): void {
    console.log(event);
    const clear =
      !Object.keys(this.showStart).length &&
      !Object.keys(this.showEnd).length &&
      !this.edit;

    if (clear) {
      this.sidenavOpenState.emit({ ...event });

      return;
    }

    this.reset();
  }

  public onTouch(event: Record<string, number>, key: string, index: number) {
    if (index === 0) return;

    const isClick = event['timeStamp'] <= 200;
    const isHorizontal =
      Math.abs(event['clientY']) < Math.abs(event['clientX']);

    if (isClick || !isHorizontal) return;

    const value = Math.abs(event['clientX']);

    const dragLeft = event['clientX'] < 0;
    if (dragLeft) {
      // reset showStart instead of deleting key to delete any hiddenStart span on other rows
      this.showStart = {};
      // other rows got reset, only this row show the hidden option
      this.showEnd = { [key]: value };

      return;
    }

    const dragRight = event['clientX'] > 0;
    if (dragRight) {
      // reset showEnd instead of deleting key to delete any hiddenEnd span on other rows
      this.showEnd = {};
      // other rows got reset, only this row show the hidden option
      this.showStart = { [key]: value };

      return;
    }

    console.log(event, this.showEnd);
  }

  private reset(): void {
    this.showStart = {};
    this.showEnd = {};
  }
}
