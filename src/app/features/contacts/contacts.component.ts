import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JsonPipe } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { IosHeaderComponent } from 'src/app/shared/components/ios-header/ios-header.component';
import { IosListsComponent } from 'src/app/shared/components/ios-lists/ios-lists.component';
import { IosList } from 'src/app/shared/components/ios-lists/ios-lists.interface';
import { lists } from 'src/assets/constants.mock';

@Component({
  standalone: true,
  selector: 'app-contacts',
  templateUrl: 'contacts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatDividerModule,
    JsonPipe,
    IosHeaderComponent,
    IosListsComponent,
  ],
})
export class ContactsComponent {
  public lists: IosList[] = lists;
}
