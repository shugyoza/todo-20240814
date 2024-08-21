import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'contact',
    pathMatch: 'full',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contacts/contacts.component').then(
        (m) => m.ContactsComponent
      ),
  },
];
