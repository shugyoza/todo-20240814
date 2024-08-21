import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JsonPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatDividerModule } from '@angular/material/divider';
import { IosHeaderComponent } from 'src/app/shared/components/ios-header/ios-header.component';
import { IosListsComponent } from 'src/app/shared/components/ios-lists/ios-lists.component';
import { IosList } from 'src/app/shared/components/ios-lists/ios-lists.interface';
import { lists } from 'src/assets/constants.mock';
import { SidenavDrawerComponent } from '../../shared/components/sidenav-drawer/sidenav-drawer.component';
import { SidenavDrawerService } from 'src/app/shared/components/sidenav-drawer/sidenav-drawer.service';

@Component({
  standalone: true,
  selector: 'app-contacts',
  templateUrl: 'contacts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    JsonPipe,
    IosHeaderComponent,
    IosListsComponent,
    SidenavDrawerComponent,
  ],
})
export class ContactsComponent {
  private _sidenavDrawerService = inject(SidenavDrawerService);

  public lists: IosList[] = lists;

  public openSidenav(event: any, position: 'start' | 'end') {
    switch (position) {
      case 'start':
        return this._sidenavDrawerService.toggle('start');
      default:
        return this._sidenavDrawerService.toggle('end');
    }
  }
}
