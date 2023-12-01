import { Route } from '@angular/router';

const layoutRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../../../pages/home-page/home-page.component'),
  },
  {
    path: '**',
    loadComponent: () => import('../../../pages/home-page/home-page.component'),
  }
];

export default layoutRoutes;
