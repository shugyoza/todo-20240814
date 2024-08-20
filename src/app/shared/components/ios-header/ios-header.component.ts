import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ios-header',
  templateUrl: 'ios-header.component.html',
  styleUrl: 'ios-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class IosHeaderComponent {}
