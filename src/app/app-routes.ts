import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'contact',
    pathMatch: 'full',
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./features/contacts/contacts.component').then(
        (m) => m.ContactsComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./shared/components/text-field/text-field.component').then(
        (m) => m.TextFieldComponent
      ),
  },
];
