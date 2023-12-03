import { Route } from '@angular/router';

const layoutRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../../../pages/home-page/home-page.component'),
  },
  { 
    path: '**', 
    redirectTo: ''
  },
];

export default layoutRoutes;
