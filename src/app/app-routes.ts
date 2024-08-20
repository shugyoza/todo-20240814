import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contacts/contacts.component').then(
        (m) => m.ContactsComponent
      ),
  },
];
