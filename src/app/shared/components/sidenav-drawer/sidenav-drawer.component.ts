import {
  AfterViewInit,
  Component,
  inject,
  Input,
  input,
  ViewChild,
} from '@angular/core';
import {
  MatDrawer,
  MatDrawerMode,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { SidenavDrawerService } from './sidenav-drawer.service';

@Component({
  standalone: true,
  selector: 'app-sidenav-drawer',
  templateUrl: 'sidenav-drawer.component.html',
  styleUrl: 'sidenav-drawer.component.scss',
  imports: [MatSidenavModule],
})
export class SidenavDrawerComponent implements AfterViewInit {
  @ViewChild('startDrawerRef') startDrawer!: MatDrawer;

  @ViewChild('endDrawerRef') endDrawer!: MatDrawer;

  private _sidenavDrawerService = inject(SidenavDrawerService);

  public readonly mode = input<MatDrawerMode>('side');

  public readonly positionStart = input<boolean>(false);

  public readonly positionEnd = input<boolean>(false);

  public readonly fixedInViewportStart = input<boolean>(false);

  public readonly fixedInViewportEnd = input<boolean>(false);

  public readonly hasBackdrop = input<boolean>(false);

  @Input() drawerWidthStart = ''; // e.g: '888px', '8rem', '8em', '80%'

  @Input() drawerWidthEnd = '';

  @Input() openedStart = false;

  @Input() openedEnd = false;

  ngAfterViewInit(): void {
    if (this.positionStart()) {
      this._sidenavDrawerService.startDrawer = this.startDrawer;
    }

    if (this.positionEnd()) {
      this._sidenavDrawerService.endDrawer = this.endDrawer;
    }
  }
}
