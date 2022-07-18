import { ViewDocumentsDialogComponent } from './dashboard/view-process/view-documents-dialog/view-documents-dialog.component';
import { ArchivedDialogComponent } from './dashboard/archived-process/archived-dialog/archived-dialog.component';
import { GenerateUrlComponent } from './dashboard/generate-url/generate-url.component';
import { AddProcessComponent } from './dashboard/add-process/add-process.component';
import { RoleGuard } from './../../guards/role.guard';
import { ViewProcessComponent } from './dashboard/view-process/view-process.component';
import { ArchivedProcessComponent } from './dashboard/archived-process/archived-process.component';
import { ActiveProcessComponent } from './dashboard/active-process/active-process.component';
export const childRoutes = [
    {
        path: 'active',
        component: ActiveProcessComponent,
        canActivate:[RoleGuard],
        //loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {icon: 'drafts', text: 'PROCESOS ACTIVOS', expectedRole: 1},
    },
    {
        path: 'archived',
        component: ArchivedProcessComponent,
        canActivate:[RoleGuard],
        data: {icon: 'archive', text: 'PROCESOS ARCHIVADOS', expectedRole: 1}
    },
    {
        path: 'addProcess',
        component: AddProcessComponent,
        data: {icon: 'table_chart', text: 'Add Process', expectedRole: 4}
    },
    {
        path: 'generateUrl',
        component: GenerateUrlComponent,
        data: {icon: 'table_chart', text: 'Add Process', expectedRole: 4}
    },
    {
        path: 'verProceso',
        component: ArchivedDialogComponent,
        data: {icon: 'assignment_ind', text: 'VER PROCESOS', expectedRole: 4}
    },
    {
        path: 'view',
        component: ViewProcessComponent,
        canActivate:[RoleGuard],
        data: {icon: 'assignment_ind', text: 'VER PROCESOS', expectedRole: 2},
        children: [
            {
                path: 'vproceso',
                component: ViewDocumentsDialogComponent,
                canActivate:[RoleGuard],
                data: {expectedRole: 2}
            }
        ]
    },
    {
        path: 'sproceso',
        component: ViewDocumentsDialogComponent,
        data: {icon: 'assignment_ind', text: 'VER PROCESOS', expectedRole: 4},
    },
    {
        path: 'archivedSU',
        component: ArchivedProcessComponent,
        canActivate:[RoleGuard],
        data: {icon: 'archive', text: 'VER PROCESOS', expectedRole: 3}
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