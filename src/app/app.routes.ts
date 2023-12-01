import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../src/app/core/shared/ui/layout/layout.component'),
    loadChildren: () =>
      import('../../src/app/core/shared/ui/layout/layout.routes'),
  },
];
