import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SidenavDrawerComponent } from '../sidenav-drawer/sidenav-drawer.component';

export interface ButtonEvent {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any;
}

export interface Item {
  expanded: boolean;
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ios-button',
  templateUrl: 'ios-button.component.html',
  styleUrl: 'ios-button.component.scss',
  imports: [SidenavDrawerComponent],
})
export class IosButtonComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly list = input<any[]>([]);

  public readonly id = input<string>('');

  public readonly disabled = input<boolean>(false);

  public readonly buttonClick = output<ButtonEvent>();

  public readonly buttonTouch = output<ButtonEvent>();

  public readonly buttonDrag = output<ButtonEvent>();

  public buttonEvents(event: unknown) {
    console.log(event);
  }
}
