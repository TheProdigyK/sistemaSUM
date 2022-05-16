import { RoleGuard } from './../../guards/role.guard';
import { ViewProcessComponent } from './dashboard/view-process/view-process.component';
import { ArchivedProcessComponent } from './dashboard/archived-process/archived-process/archived-process.component';
import { ActiveProcessComponent } from './dashboard/active-process/active-process.component';
export const childRoutes = [
    {
        path: 'active',
        component: ActiveProcessComponent,
        canActivate:[RoleGuard],
        //loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {icon: 'dashboard', text: 'Active Process', expectedRole: 1}
    },
    {
        path: 'archived',
        component: ArchivedProcessComponent,
        canActivate:[RoleGuard],
        data: {icon: 'table_chart', text: 'Archived Process', expectedRole: 1}
    },
    {
        path: 'view',
        component: ViewProcessComponent,
        canActivate:[RoleGuard],
        data: {icon: 'table_chart', text: 'view Process', expectedRole: 2}
    }
    // {
    //     path: 'charts',
    //     data: {icon: 'bar_chart', text: 'Charts'}
    // },
    // {
    //     path: 'slider',
    //     data: {icon: 'slideshow', text: 'Slider'}
    // },
    // {
    //     path: 'list',
    //     data: {icon: 'list', text: 'Lists'}
    // },
    // {
    //     path: 'mat-components',
    //     data: {icon: 'code', text: 'Material Components'}
    // },
    // {
    //     path: 'forms',
    //     data: {icon: 'assignment', text: 'Forms'}
    // },
    // {
    //     path: 'animations',
    //     data: {icon: 'perm_media', text: 'Animations'}
    // },
    // {
    //     path: 'typography',
    //     data: {icon: 'font_download', text: 'Typography'}
    // },
    // {
    //     path: 'google-maps',
    //     data: {icon: 'place', text: 'Google Map'}
    // },
    // {
    //     path: 'mat-grid',
    //     data: {icon: 'grid_on', text: 'Flex Grid'}
    // },
]