import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LibroComponent } from './list/libro.component';
import { LibroDetailComponent } from './detail/libro-detail.component';
import { LibroUpdateComponent } from './update/libro-update.component';
import LibroResolve from './route/libro-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const libroRoute: Routes = [
  {
    path: '',
    component: LibroComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LibroDetailComponent,
    resolve: {
      libro: LibroResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LibroUpdateComponent,
    resolve: {
      libro: LibroResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LibroUpdateComponent,
    resolve: {
      libro: LibroResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default libroRoute;
