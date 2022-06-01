import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './modules/auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//   path:'', 
//   loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
// },
// {
//   path:'**', 
//   loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
// }
  //{path:'', redirectTo: 'Auth', pathMatch: 'full'},
  {path: 'auth', component:AuthComponent},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'dashboard', canActivate:[AuthGuard], loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path: '**', redirectTo: 'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
