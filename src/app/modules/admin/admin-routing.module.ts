import { LayoutComponent } from './layout/layout.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { childRoutes } from './child-routes';

const routes: Routes = [{
  path: 'dashboard',
  component: LayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'active',
    },
    ...childRoutes
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
