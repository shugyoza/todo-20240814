import {
  AfterViewInit,
  Component,
  inject,
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
  imports: [MatSidenavModule],
})
export class SidenavDrawerComponent implements AfterViewInit {
  @ViewChild('startDrawerRef') startDrawer!: MatDrawer;

  @ViewChild('endDrawerRef') endDrawer!: MatDrawer;

  private _sidenavDrawerService = inject(SidenavDrawerService);

  public mode = input<MatDrawerMode>('side');

  public positionStart = input<boolean>(false);

  public positionEnd = input<boolean>(false);

  public drawerWidthStart = input<string>(''); // e.g: '888px', '8rem', '8em', '80%'

  public drawerWidthEnd = input<string>('');

  public hasBackdrop = input<boolean>(false);

  public opened = input<Record<'start' | 'end', boolean>>({
    start: false,
    end: false,
  });

  ngAfterViewInit(): void {
    if (this.positionStart()) {
      this._sidenavDrawerService.startDrawer = this.startDrawer;
    }

    if (this.positionEnd()) {
      this._sidenavDrawerService.endDrawer = this.endDrawer;
    }
  }
}
