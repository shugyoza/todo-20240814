import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { IosHeaderComponent } from 'src/app/shared/components/ios-header/ios-header.component';
import { IosListsComponent } from 'src/app/shared/components/ios-lists/ios-lists.component';
import { IosList } from 'src/app/shared/components/ios-lists/ios-lists.interface';

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
  public lists: IosList[] = [
    {
      name: 'Lists',
      expandable: false,
      expanded: true,
      children: [
        {
          name: 'All Contacts',
          count: 599,
          icon: {
            start: 'groups',
          },
        },
      ],
    },
    {
      name: 'steve.hanj@gmail.com',
      expandable: true,
      expanded: true,
      children: [
        {
          name: 'All steve.hanj@gmail',
          count: 37,
          icon: {
            start: 'groups',
          },
        },
      ],
    },
    {
      name: 'iPhone',
      expandable: true,
      expanded: true,
      children: [
        {
          name: 'All iPhone',
          count: 564,
          icon: {
            start: 'groups',
          },
        },
        {
          name: 'Client',
          count: 1,
          icon: {
            start: 'group',
          },
        },
        {
          name: 'Keroppi Fans',
          count: 2,
          icon: {
            start: 'group',
          },
        },
      ],
    },
  ];

  public onEdit(): void {}

  public onAdd(): void {}
}
