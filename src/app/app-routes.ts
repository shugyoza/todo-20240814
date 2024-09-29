import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 're',
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
  {
    path: 're',
    loadComponent: () =>
      import('./features/re/re.component').then((m) => m.ReComponent),
  },
  {
    path: 'select-dropdown',
    loadComponent: () =>
      import(
        './shared/components/select-dropdown/select-dropdown.component'
      ).then((m) => m.SelectDropdownComponent),
  },
];
