import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerComponent } from './servers/server/server.component';
import { UsersComponent } from './users/users.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuardService } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolverService } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent 
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id/:name',
        component: UserComponent 
      },
    ]
  },
  {
    path: 'servers',
    canActivateChild: [AuthGuardService],
    // canActivate: [AuthGuardService],
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: ServerResolverService }
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuardService]
      },
    ]
  },
//   {
//     path: 'page-not-found',
//     component: PageNotFoundComponent
//   },
{
    path: 'page-not-found',
    component: ErrorPageComponent,
    data: {
        message: 'Page Not Found!'
    }
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule ({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}