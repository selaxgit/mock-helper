import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom([BrowserAnimationsModule]), provideHttpClient(withInterceptors([ErrorInterceptor]))],
};
