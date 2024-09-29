import {
  ApplicationConfig,
  importProvidersFrom,
  ImportProvidersSource,
} from '@angular/core';

import { appRoutes } from './app-routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withHashLocation,
  withRouterConfig,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DocumentService } from '@core/services/document/document.service';

const ngModuleBaseLibraries: ImportProvidersSource = [
  /* e.g
  someModule.forRoot({...})
  */
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      withHashLocation()
    ),
    importProvidersFrom(...ngModuleBaseLibraries),
    provideHttpClient(),
    provideAnimationsAsync(),
    DocumentService,
  ],
};
